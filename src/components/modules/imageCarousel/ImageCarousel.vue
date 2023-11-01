<template>
  <div
    v-if="visible"
    class="carousel-overlay"
    :class="{ 'fade-carousel': !isLoaded }"
    @click="hide"
  >
    <div class="carousel-container" @click.stop>
      <button
        class="prev"
        :class="{ firstImage: activeImageIndex === 0 }"
        @click="prevImage"
      ></button>

      <img
        v-lazy="images[activeImageIndex]"
        alt="Carousel Image"
        :key="activeImageIndex"
        :class="{ 'fade-image': !isImageLoaded }"
      />

      <button
        class="next"
        :class="{ lastImage: activeImageIndex === images.length - 1 }"
        @click="nextImage"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      activeImageIndex: props.index,
      isLoaded: false,
      isImageLoaded: false,
    });

    // props의 index가 항상 0으로 오기 때문에 watch로 감지
    watch(
      () => props.index,
      (updatedIndex) => {
        state.activeImageIndex = updatedIndex;
      },
    );

    // 클릭 시 페이드 효과
    watch(
      () => props.visible,
      (newVal) => {
        if (newVal) {
          state.isLoaded = false;
          setTimeout(() => {
            state.isLoaded = true;
          }, 700);
        } else {
          state.isLoaded = false;
        }
      },
    );

    const fadeEffect = () => {
      if (state.isImageLoaded) {
        state.isImageLoaded = false;
        setTimeout(() => {
          state.isImageLoaded = true;
        }, 1000);
      } else {
        state.isImageLoaded = false;
      }
    };

    const hide = () => {
      emit('update:visible', false);
    };

    const prevImage = () => {
      if (state.activeImageIndex > 0) {
        state.activeImageIndex--;
        fadeEffect();
      }
    };

    const nextImage = () => {
      if (state.activeImageIndex < props.images.length - 1) {
        state.activeImageIndex++;
        fadeEffect();
      }
    };

    return {
      ...toRefs(state),
      hide,
      prevImage,
      nextImage,
    };
  },
});
</script>

<style lang="scss" scoped>
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

  .carousel-container {
    position: relative;
    display: inline-flex;
    align-items: center;

    button {
      z-index: 10;
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 40px;
      height: 80px;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 1.5rem;
      color: white;
    }

    .prev {
      left: 2%; // Adjusted as per your requirement
      &:before {
        content: '<';
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }

    .next {
      right: 2%; // Adjusted as per your requirement
      &:before {
        content: '>';
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }

    .firstImage,
    .lastImage {
      display: none;
    }

    img {
      z-index: 1;
      max-width: 100vw;
      max-height: 100vh;
    }
  }
}
</style>
