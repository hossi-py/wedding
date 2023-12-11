<template>
  <div class="grid-gallery-container">
    <div class="header">우리의 특별한 순간</div>
    <div id="gallery-area">
      <section>
        <div class="image-container">
          <div class="image-wrapper">
            <figure
              v-for="(imageSrc, imageIdx) in images"
              :key="`image-${imageIdx}`"
              @click="showCarousel(imageIdx)"
            >
              <div class="image-box">
                <img
                  class="image-frame"
                  v-lazy="imageSrc"
                  alt="Image description"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
    </div>

    <swiper
      v-if="showingCarousel"
      navigation
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
      <swiper-slide v-for="(imageSrc, index) in images" :key="`image-${index}`">
        <div class="swiper-zoom-container">
          <img v-lazy="imageSrc" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';

import { Swiper as SwiperClass } from 'swiper/types';
import { Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const state = reactive({
      images: [] as string[],
      showingCarousel: false,
      currentIndex: 0,
    });

    const swiperInstance = ref<SwiperClass>();

    const generateImagePaths = () => {
      const baseImagePath = `/wedding/gallery`;

      for (let i = 0; i < 10; i++) {
        state.images.push(`${baseImagePath}/2014/2014-${i}.jpg`);
      }
    };

    onMounted(() => {
      generateImagePaths();
    });

    const showCarousel = (index: number) => {
      state.showingCarousel = true;
      state.currentIndex = index;

      document.body.classList.add('no-scroll');
    };

    const closeCarousel = () => {
      state.showingCarousel = false;

      document.body.classList.remove('no-scroll');
    };

    const onSwiper = (swiper: SwiperClass) => {
      swiperInstance.value = swiper;
    };

    return {
      ...toRefs(state),
      swiperInstance,
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
.grid-gallery-container {
  margin-top: 80px;

  #gallery-area {
    .image-container {
      .image-wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        figure {
          margin: 0;
          padding: 3% 3%;

          .image-box {
            width: 100%;
            height: 100%;
            overflow: hidden;

            .image-frame {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          }
        }

        figure:nth-last-child(odd):last-child {
          // grid-column: span 3;
          // padding: 1%;
        }
      }
    }
  }

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

  ::v-deep .swiper-button-prev::after,
  ::v-deep .swiper-button-next::after {
    color: rgb(255, 255, 255);
  }

  ::v-deep .swiper-button-prev,
  ::v-deep .swiper-button-next {
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
