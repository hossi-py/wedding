<template>
  <div class="year-card-container">
    <div class="year-card" :class="{ active: isActive }" @click="selectYear">
      <img class="thumbnail" :src="yearImageMap[year]" alt="Year Thumbnail" />
      <div class="year-label">{{ year }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'YearCard',
  props: {
    year: {
      type: Number,
      require: true,
    },
  },
  setup(props, { emit }) {
    const isActive = ref(false);

    const yearImageMap = ref({
      2014: '/wedding/gallery/thumbnail/thumbnail-2014.jpg',
      2015: '/wedding/gallery/thumbnail/thumbnail-2015.jpg',
      2016: '/wedding/gallery/thumbnail/thumbnail-2016.jpg',
      2017: '/wedding/gallery/thumbnail/thumbnail-2017.jpg',
      2018: '/wedding/gallery/thumbnail/thumbnail-2018.jpg',
      2019: '/wedding/gallery/thumbnail/thumbnail-2019.jpg',
      2020: '/wedding/gallery/thumbnail/thumbnail-2020.jpg',
      2021: '/wedding/gallery/thumbnail/thumbnail-2014.jpg',
      2022: '/wedding/gallery/thumbnail/thumbnail-2015.jpg',
      2023: '/wedding/gallery/thumbnail/thumbnail-2016.jpg',
    });

    const selectYear = (e: Event) => {
      e.stopPropagation();

      isActive.value = true;
      setTimeout(() => {
        isActive.value = false;
      }, 600);

      emit('click', props.year);
    };

    return { isActive, yearImageMap, selectYear };
  },
});
</script>

<style lang="scss" scoped>
.year-card-container {
  perspective: 1000px;
  .year-card {
    position: relative;
    width: 170px;
    height: 230px;
    margin: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform-style: preserve-3d;
    transform: rotateX(0deg);
    transition: transform 0.5s;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      bottom: 5px;
      border-radius: 10px;
      background: #f2f2f2;
      z-index: -1;
      border: 1px solid #c7c7c7;
    }

    &::before {
      transform: rotate(1deg) translateY(7px) translateZ(-1px);
      right: -6px;
      // bottom: -0.1px;
    }

    &::after {
      transform: rotate(2deg) translateY(12px) translateZ(-2px);
      right: -12px;
      // bottom: -0.6px;
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      // border: 1px solid #c7c7c7;
    }

    .year-label {
      position: absolute;
      bottom: 10px;
      left: 10px;
      padding: 5px 10px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      font-weight: bold;
    }
  }

  .year-card.active {
    animation: jelly 600ms;
    transform: rotateX(10deg);
  }
}
</style>
