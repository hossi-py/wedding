<template>
  <div class="carousel-overlay">
    <div
      class="carousel-container"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img :src="images[0]" alt="" />
      <div v-for="(image, index) in images" :key="`carousel-${index}`">
        <img
          :src="image"
          :style="{
            transform: `translateX(${
              (index - currentSelectedIndex.value) * 100 + offset
            }%`,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  props: {
    selectedIndex: {
      type: Number,
    },
    images: {
      type: Array,
    },
  },
  setup(props) {
    const offset = ref(0);
    const currentSelectedIndex = ref(props.selectedIndex);

    watch(
      () => props.selectedIndex,
      (newValue) => {
        currentSelectedIndex.value = newValue;
      },
    );

    let startX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const deltaX = event.touches[0].clientX - startX;
      offset.value = (deltaX / window.innerWidth) * 100;
    };

    const handleTouchEnd = () => {
      if (Math.abs(offset.value) > 50) {
        if (currentSelectedIndex.value) {
          currentSelectedIndex.value += offset.value > 0 ? -1 : 1;
        }
      }
      offset.value = 0;
    };

    return {
      offset,
      currentSelectedIndex,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
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
    display: flex;
    overflow: hidden;

    img {
      width: 100vw;
      height: auto;
      transition: transform 0.3s ease;
    }
  }
}
</style>
