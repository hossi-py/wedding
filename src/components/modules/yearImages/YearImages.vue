<template>
  <div class="year-images-container" @scroll="handleScroll">
    <span class="title">{{ year }}년, 우리</span>
    <button v-if="!showingCarousel" @click="closePopup">X</button>
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

    <!-- 캐러셀 -->
    <image-carousel
      v-if="showingCarousel"
      :visible="showingCarousel"
      :selectedIndex="currentIndex"
      :images="imageOptions"
      @outside-click="closeCarousel"
    >
    </image-carousel>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import ImageCarousel from '../imageCarousel/ImageCarousel.vue';

export default defineComponent({
  props: {
    year: {
      type: Number,
      required: true,
    },
  },
  components: { ImageCarousel },
  setup(props, { emit }) {
    const state = reactive({
      imageOptions: [] as string[],
      showingCarousel: false,
      currentIndex: 0,
    });

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
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 50px 20px 20px 20px;
    box-sizing: border-box; // 전체 너비가 줄어도 padding 유지

    .image-wrapper {
      grid-template-columns: repeat(2, 1fr);
      display: grid;
      gap: 10px;

      // 이미지 홀수개 => 공간 2개 차지
      .image-item:nth-last-child(odd):last-child {
        grid-column: span 2;
      }

      .image-item {
        .image {
          width: auto;
          height: 270px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
            object-fit: cover;
          }
        }
      }
    }
  }

  button {
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