<template>
  <div class="main-contents-container">
    <div class="main-contents">
      <div
        class="image"
        :style="{ height: skeletonHeight + 'px', background: '#fffdf9' }"
      >
        <img
          v-show="imageLoaded"
          :src="'/wedding/gallery/main-image.jpg'"
          alt="Image"
          @load="handleImageLoad"
        />
      </div>
      <div class="wedding-info">
        <div class="married-couple">
          <div class="groom">황태환</div>
          <div class="vertical-line"></div>
          <div class="bride">김유라</div>
        </div>
        <div class="wedding-info-detail">
          <p class="wedding-time">2024.02.03 Sat 6:00PM</p>
          <p class="wedding-place">연세대학교 동문회관 예식장</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  setup(_, { emit }) {
    const imageLoaded = ref(false);
    const skeletonHeight = ref(0);

    const calculateHeight = () => {
      const imageElement = document.querySelector('.image');
      if (imageElement) {
        const width = imageElement.clientWidth;
        skeletonHeight.value = width * (7200 / 10800);
      }
    };

    onMounted(() => {
      calculateHeight();
      window.addEventListener('resize', calculateHeight);
    });

    watch(
      () => imageLoaded.value,
      (newValue) => {
        if (newValue) {
          window.removeEventListener('resize', calculateHeight);
        }
      },
    );

    const handleImageLoad = () => {
      imageLoaded.value = true;
      emit('loadPage');
    };

    return {
      imageLoaded,
      skeletonHeight,
      calculateHeight,
      handleImageLoad,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-contents-container {
  width: 100%;
  height: 100%;
  position: relative;

  .main-contents {
    .image {
      overflow: hidden;

      // .image-skeleton {
      //   width: 100%;
      //   height: 0;
      //   // padding-top: 56.25%; /* 예시: 16:9 비율 */
      //   background-color: #ccc; /* 스켈레톤 배경색 */
      // }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .wedding-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    background-color: #fff;

    .married-couple {
      display: flex;

      .groom,
      .bride {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 5px;
      }

      .vertical-line {
        display: inline-block;
        border-right: 1px solid black;
        height: 1.2rem;
        margin: 0 35px;
      }
    }

    .wedding-info-detail {
      display: flex;
      flex-direction: column;
      line-height: 0.5rem;
      margin-top: 30px;

      .wedding-time,
      .wedding-place {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
