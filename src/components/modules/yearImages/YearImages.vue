<template>
  <div class="year-images-container" @scroll="handleScroll">
    <span class="title">{{ year }}년, 우리</span>
    <button v-if="!showingCarousel" @click="closePopup">X</button>
    <div
      class="images-container"
      v-for="(item, index) in imageOptions"
      :key="`image-${index}`"
    >
      <div class="images-wrapper">
        <div
          class="image-item"
          v-for="(imgName, imgIndex) in item.images"
          :key="`item-${imgName}`"
          @click="showCarousel(imgIndex)"
        >
          <div class="image">
            <img v-lazy="`/wedding/gallery/${year}/${imgName}`" alt="Image" />
          </div>
        </div>
      </div>
    </div>

    <!-- 캐러셀 -->
    <image-carousel
      :images="carouselImages"
      :visible="showingCarousel"
      :index="selectedIndex"
      @update:visible="closeCarousel"
    ></image-carousel>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import ImageCarousel from '../imageCarousel/ImageCarousel.vue';

type ImageOptionsType = {
  value: string;
  images: string[];
};

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
      imageOptions: [] as ImageOptionsType[],
      lastLoadedIndex: 0,
      imagesToLoad: 30, // 로드할 이미지 개수
      // TODO 실제로 바꿔야 함
      maxImagesPerYear: {
        2014: 13,
        2015: 16,
        2016: 16,
        2017: 16,
        2018: 16,
        2019: 16,
        2020: 16,
        2021: 16,
        2022: 16,
        2023: 16,
      } as Record<number, number>,
      showingCarousel: false,
      selectedIndex: 0,
    });

    const loadMoreImages = () => {
      const maxImages = state.maxImagesPerYear[props.year] || 0;

      // state.imagesToLoad = state.maxImagesPerYear[props.year];
      // 모든 이미지 로드하면 함수 종료
      if (state.lastLoadedIndex >= maxImages) {
        return;
      }

      const newImages = [];
      for (let i = 0; i < state.imagesToLoad; i++) {
        const imageIndex = state.lastLoadedIndex + i;
        if (imageIndex >= maxImages) {
          break; // 이미지 최대 개수 초가화면 반복문 종료
        }
        // TODO jpg가 아니라 png라면?
        newImages.push(`${props.year}-${imageIndex}.jpg`);
      }

      state.imageOptions.push({
        value: props.year.toString(),
        images: newImages,
      });

      // 다음 루프때는 이전꺼를 검사하면 안되기 때문
      state.lastLoadedIndex += newImages.length;
    };

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 500) {
        loadMoreImages();
      }
    };

    const closePopup = () => {
      emit('close');
      document.body.classList.remove('no-scroll');

      // 뒤로가기 버튼 클릭 시 히스토리 스택에서 상태 제거
      window.history.back();
    };

    const carouselImages = computed(() => {
      // reduce 함수를 사용하여 imageOptions 배열의 각 항목에 있는 images 배열을 새로운 배열로 변환.
      // => imageOptions의 value 값이 필요 없기 떄문
      return state.imageOptions.reduce<string[]>((accumulator, option) => {
        // 각 이미지 항목의 경로를 구성합니다.
        const imagesWithFullPath = option.images.map(
          (img) => `/wedding/gallery/${props.year}/${img}`,
        );

        // accumulator 배열에 현재 option의 imagesWithFullPath 배열을 병합합니다.
        return accumulator.concat(imagesWithFullPath);
      }, []);
    });

    const showCarousel = (index: number) => {
      state.showingCarousel = true;
      state.selectedIndex = index;
    };

    const closeCarousel = () => {
      state.showingCarousel = false;
    };

    const handlePopstate = (event: PopStateEvent) => {
      // state가 존재하고 modalOpen이 true면 모달 닫기
      if (event.state && event.state.modalOpen) {
        closePopup();
      }
    };

    // 컴포넌트가 마운트 될 때 스크롤 잠금
    onMounted(() => {
      document.body.classList.add('no-scroll');
      // 인피니티 스크롤 적용
      loadMoreImages();

      // popstate 이벤트 리스너 추가
      window.addEventListener('popstate', handlePopstate);
    });

    // 컴포넌트가 언마운트될 떄 스크롤 잠금 해제
    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');

      // 컴포넌트 제거 될 때 이벤트 리스너 삭제
      window.removeEventListener('popstate', handlePopstate);
    });

    return {
      ...toRefs(state),
      carouselImages,
      handleScroll,
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

  .images-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 50px 20px 20px 20px;
    box-sizing: border-box; // 전체 너비가 줄어도 padding 유지

    .images-wrapper {
      // 이미지 홀수개 => 공간 2개 차지
      .image-item:nth-last-child(odd):last-child {
        grid-column: span 2;
      }

      grid-template-columns: repeat(2, 1fr);
      display: grid;
      gap: 10px;

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
