<template>
  <div class="year-images-container" @scroll="handleScroll">
    <!-- <span class="title">{{ year }}년, 우리</span> -->
    <button class="close-button" v-if="!showingCarousel" @click="closePopup">
      X
    </button>
    <div class="image-container">
      <div class="image-wrapper">
        <div
          v-for="(imageSrc, imageIdx) in imageOptions"
          :key="`image-${imageIdx}`"
          class="image-item"
          @click="showCarousel(imageIdx)"
        >
          <div class="image">
            <img :src="imageSrc" />
          </div>
        </div>
      </div>
    </div>

    <swiper
      v-if="showingCarousel"
      navigation
      zoom
      :initialSlide="currentIndex"
      :modules="modules"
      :speed="speed"
      @swiper="onSwiper"
    >
      <button
        class="close-button"
        v-if="showingCarousel"
        @click="closeCarousel"
      >
        X
      </button>
      <swiper-slide
        v-for="(imageSrc, index) in imageOptions"
        :key="`image-${index}`"
      >
        <div class="swiper-zoom-container">
          <img :src="imageSrc" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue';

import { Swiper as SwiperClass } from 'swiper/types';
import { Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

export default defineComponent({
  props: {
    year: {
      type: Number,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props, { emit }) {
    const state = reactive({
      imageOptions: [] as string[],
      showingCarousel: false,
      currentIndex: 0,
    });

    const swiperInstance = ref<SwiperClass>();

    const generateImagePathsForYear = (year: number, count: number) => {
      const baseImagePath = `/wedding/gallery`;

      const settingImages = [];
      for (let i = 0; i < count; i++) {
        // TODO jpg가 아니라면?
        settingImages.push(`${baseImagePath}/${year}/${year}-${i}.jpg`);
      }
      return settingImages;
    };

    const closePopup = () => {
      emit('close');
      document.body.classList.remove('no-scroll');
    };

    const showCarousel = (index: number) => {
      state.showingCarousel = true;
      state.currentIndex = index;
    };

    const closeCarousel = () => {
      state.showingCarousel = false;
    };

    const addClickAnimation = (element: any) => {
      element.classList.add('animate-click');
      element.addEventListener(
        'animationend',
        () => {
          element.classList.remove('animate-click');
        },
        { once: true },
      );
    };

    const onSwiper = (swiper: SwiperClass) => {
      swiperInstance.value = swiper;

      // 네비게이션 버튼에 클릭 이벤트 리스너 추가
      const nextButton = swiper.navigation.nextEl;
      const prevButton = swiper.navigation.prevEl;

      nextButton.addEventListener('click', () => addClickAnimation(nextButton));
      prevButton.addEventListener('click', () => addClickAnimation(prevButton));
    };

    // 컴포넌트가 마운트 될 때 스크롤 잠금 (뒷 이미지가 깨지기 때문)
    onMounted(() => {
      document.body.classList.add('no-scroll');

      // TODO 해당하는 연도 이미지 불러오기
      const years = [
        { year: 2014, count: 13 },
        { year: 2015, count: 0 },
        { year: 2016, count: 0 },
        { year: 2017, count: 0 },
        { year: 2018, count: 0 },
        { year: 2019, count: 0 },
        { year: 2020, count: 0 },
        { year: 2021, count: 0 },
        { year: 2022, count: 0 },
        { year: 2023, count: 0 },
        { year: 2024, count: 0 },
      ];

      const targetYear = years.find((y) => y.year === props.year);

      if (targetYear) {
        state.imageOptions = generateImagePathsForYear(
          targetYear.year,
          targetYear.count,
        );
      }
    });

    // 컴포넌트가 언마운트될 떄 스크롤 잠금 해제
    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');
    });

    return {
      ...toRefs(state),
      closePopup,
      showCarousel,
      closeCarousel,
      onSwiper,
      modules: [Navigation, Zoom],
      speed: 1200,
    };
  },
});
</script>

<style lang="scss" scoped>
.year-images-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  overflow: auto;

  // 스크롤바 숨기기 위한 스타일
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .title {
    display: flex;
    justify-content: center;
    position: absolute;
    color: #fff;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  .image-container {
    padding: 50px;
    .image-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .image-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1; /* 이미지 아이템이 가능한 공간을 채우도록 함 */
      overflow: hidden;

      &:nth-last-child(odd):last-child {
        grid-column: span 2;
      }

      .image {
        display: flex; /* Flexbox를 사용하여 이미지를 가운데 정렬 */
        justify-content: center;
        align-items: center;
        max-width: 100%; /* 컨테이너 너비에 맞춤 */
        max-height: 100%; /* 컨테이너 높이에 맞춤 */

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain; /* 이미지가 컨테이너에 맞춰지도록 함 */
        }
      }
    }
  }

  // .image-container {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   z-index: 100;
  //   padding: 50px 20px 20px 20px;
  //   box-sizing: border-box; // 전체 너비가 줄어도 padding 유지

  //   .image-wrapper {
  //     grid-template-columns: repeat(2, 1fr);
  //     display: grid;
  //     gap: 10px;

  //     // 이미지 홀수개 => 공간 2개 차지
  //     .image-item:nth-last-child(odd):last-child {
  //       grid-column: span 2;
  //     }

  //     .image-item {
  //       .image {
  //         width: auto;
  //         height: 270px;
  //         overflow: hidden;

  //         img {
  //           width: 100%;
  //           height: 100%;
  //           border-radius: 6px;
  //           object-fit: cover;
  //         }
  //       }
  //     }
  //   }
  // }

  .swiper {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;

    .swiper-slide {
      position: relative;
      display: flex;
      align-items: center;

      img {
        max-width: 100vw;
        max-height: 100vh;
        object-fit: cover;
      }
    }
  }

  button {
    cursor: pointer;
    z-index: 100;
    position: fixed;
    background-color: transparent;
    font-size: 25px;
    color: #fff;
    top: 10px;
    right: 25px;
    border: none;
  }
}
</style>

<style scoped>
/* 애니메이션 클래스 */
::v-deep .animate-click {
  animation: clickAnimation 0.3s ease;
  -webkit-animation: clickAnimation 0.3s ease;
}

::v-deep .swiper-button-prev::after,
::v-deep .swiper-button-next::after {
  color: rgb(255, 255, 255);
}

::v-deep .swiper-button-prev,
::v-deep .swiper-button-next {
  -webkit-tap-highlight-color: transparent;
}
</style>
