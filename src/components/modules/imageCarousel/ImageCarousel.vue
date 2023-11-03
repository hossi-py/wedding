<template>
  <div class="carousel-overlay" @click="handleOutsideClick">
    <div
      class="carousel-wrapper"
      ref="carousel"
      :class="{ 'fade-in': visible }"
    >
      <div
        class="image-wrapper"
        v-for="(src, idx) in images"
        :key="`image-${idx}`"
      >
        <img :src="src" />
      </div>
      <button class="prev" @click="move(-1)" :disabled="isAnimating">
        prev
      </button>
      <button class="next" @click="move(1)" :disabled="isAnimating">
        next
      </button>
    </div>
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

export default defineComponent({
  props: {
    selectedIndex: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      scrollPosition: 0,
      touchStartX: 0,
      touchCurrentX: 0,
      isAnimating: false,
      scrollStart: 0,
    });
    const carousel = ref<HTMLElement | null>(null);

    onMounted(() => {
      moveToSelectedImage();
      setEventListener();
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    // 화면 크기가 변경되었을 때 이미지 크기 조절
    const handleResize = () => {
      if (carousel.value) {
        const imageWidth = carousel.value.offsetWidth;
        carousel.value.scrollLeft =
          Math.round(carousel.value.scrollLeft / imageWidth) * imageWidth;
      }
    };

    // 처음 화면에 들어왔을 때 클릭한 이미지를 화면에 보여준다.
    const moveToSelectedImage = () => {
      if (carousel.value) {
        const imageWidth = carousel.value.offsetWidth; // carousel-wrapper의 width
        state.scrollPosition = imageWidth * props.selectedIndex; // 선택된 이미지 까지 이동할 거리
        carousel.value.scrollLeft = state.scrollPosition;
      }
    };

    // 터치 이벤트리스너 등록
    const setEventListener = () => {
      const carouselElement = carousel.value;
      if (carouselElement) {
        carouselElement.addEventListener('touchstart', onTouchStart);
        carouselElement.addEventListener('touchmove', onTouchMove);
        carouselElement.addEventListener('touchend', onTouchEnd);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (state.isAnimating) return;
      state.touchStartX = event.touches[0].clientX;
      state.scrollStart = carousel.value ? carousel.value.scrollLeft : 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (state.isAnimating) return;
      state.touchCurrentX = event.touches[0].clientX;
      const dx = state.touchStartX - state.touchCurrentX;
      if (carousel.value) {
        carousel.value.scrollLeft = state.scrollStart + dx;
      }
    };

    const onTouchEnd = () => {
      if (state.isAnimating) return;
      const dx = state.touchStartX - state.touchCurrentX;

      if (Math.abs(dx) > 30) {
        const direction = dx > 0 ? 1 : -1;
        move(direction);
      } else {
        if (carousel.value) {
          carousel.value.scrollTo({
            left: state.scrollStart,
            behavior: 'smooth',
          });
        }
      }
    };

    // carousel-wrapper 영역 바깥 클릭하면 화면 닫기
    const handleOutsideClick = (event: Event) => {
      event.stopPropagation();

      if (carousel.value && !carousel.value.contains(event.target as Node)) {
        emit('outside-click');
      }
    };

    const delayAnimating = () => {
      setTimeout(() => {
        state.isAnimating = false;
      }, 300);
    };

    // overflow-x 가 있다는 전제
    const move = (direction: number) => {
      if (state.isAnimating) return;

      if (carousel.value && props.images.length > 0) {
        state.isAnimating = true; // 애니메이션 상태 시작
        const imageWidth = carousel.value.offsetWidth;
        const numImages = props.images.length;
        let newScrollPosition =
          carousel.value.scrollLeft + imageWidth * direction;

        // 첫 번째 이미지에서 'prev' 버튼을 누르면 마지막 이미지로 바로 이동
        if (direction === -1 && carousel.value.scrollLeft === 0) {
          newScrollPosition = imageWidth * (numImages - 1);
          carousel.value.scrollLeft = newScrollPosition; // 스크롤 위치 갱신
          delayAnimating();
        }
        // 마지막 이미지에서 'next' 버튼을 누르면 첫 번째 이미지로 바로 이동
        else if (
          direction === 1 &&
          carousel.value.scrollLeft >= imageWidth * (numImages - 1)
        ) {
          newScrollPosition = 0;
          carousel.value.scrollLeft = newScrollPosition; // 스크롤 위치 갱신
          delayAnimating();
        }
        // 나머지 경우에는 애니메이션 사용
        else {
          customScrollBehavior(carousel.value, newScrollPosition, 850);
        }
      }
    };

    // [scroll-behavior: smooth] 가 duration을 줄 수 없어서 커스텀 함수 만듦
    const customScrollBehavior = (
      element: HTMLElement,
      endPosition: number,
      duration: number,
    ) => {
      // 애니메이션 시작 시간
      let startTime: number | null = null;

      // 초기 스크롤 위치
      const startScrollLeft = element.scrollLeft;
      // 스크롤해야 할 총 거리
      const distanceToScroll = endPosition - startScrollLeft;

      // Easing 함수: 현재 시간, 시작 값, 변화량, 지속시간을 기반으로 다음 스크롤 위치를 계산
      const easeInOutQuad = (
        currentTime: number,
        startValue: number,
        changeInValue: number,
        duration: number,
      ) => {
        // 애니메이션 경과 시간을 두 부분으로 나눈다. (가속 구간 / 감속 구간)
        currentTime /= duration / 2;

        // 가속 구간
        if (currentTime < 1)
          /*
          changeInValue / 2 => 총 변화량의 절반. 애니메이션이 중간 지점까지만 가속하여 이동하기 때문
          currentTime * currentTime => 시간에 따라 가속량을 제어
        */
          return (changeInValue / 2) * currentTime * currentTime + startValue;

        // 감속 구간
        currentTime--;
        return (
          (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) +
          startValue
        );
      };

      const animation = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const newScrollPosition = easeInOutQuad(
          timeElapsed,
          startScrollLeft,
          distanceToScroll,
          duration,
        );
        element.scrollLeft = newScrollPosition;

        // duration 임계에 도달할 때까지 애니메이션 지속
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          element.scrollLeft = endPosition; // 애니메이션의 종료 지점 설정
          delayAnimating();
        }
      };

      requestAnimationFrame(animation);
    };

    return {
      ...toRefs(state),
      carousel,
      handleOutsideClick,
      move,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-in {
  animation: fadeIn 1s forwards;
  -webkit-animation: fadeIn 1s forwards;
}

.carousel-overlay {
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

  .carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow-x: auto;

    .image-wrapper {
      img {
        // %로 하면 하나의 이미지로만 표현되지 않고 전체 이미지가 한 영역에 보이게 됨
        max-width: 100vw; // 줄일 수록 주변 이미지가 보임
        max-height: 100vh;
        object-fit: cover;
      }
    }

    button {
      position: fixed;
    }

    .prev {
      left: 0;
    }

    .next {
      right: 0;
    }
  }
}
</style>
