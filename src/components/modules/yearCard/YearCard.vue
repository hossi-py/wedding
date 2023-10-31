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
  .year-card {
    position: relative;
    width: 170px;
    height: 230px;
    margin: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    .thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    // animation: bounce 400ms;
    animation: jelly 600ms;
  }
}
</style>
