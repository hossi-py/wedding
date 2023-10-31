<template>
  <div class="year-gallery-container">
    <div class="header">우리의 특별한 순간</div>
    <div class="year-gallery">
      <year-card
        v-for="year in years"
        :key="`gallery-${year}`"
        :year="year"
        @click="handleYearClick"
      ></year-card>
    </div>
    <year-images
      v-if="showYearImagesPopup"
      :year="selectedYear"
      @close="handleCloseYearImagesPopup"
    ></year-images>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import YearCard from '../yearCard/YearCard.vue';
import YearImages from '../yearImages/YearImages.vue';

export default defineComponent({
  components: { YearCard, YearImages },
  setup() {
    const years = ref(Array.from({ length: 10 }, (_, i) => 2014 + i));
    const showYearImagesPopup = ref(false);
    const selectedYear = ref<number | null>(null);

    const handleYearClick = (year: number) => {
      selectedYear.value = year;

      setTimeout(() => {
        showYearImagesPopup.value = true;
      }, 700); // 애니메이션을 좀 더 보기 위한 시간
    };

    const handleCloseYearImagesPopup = () => {
      showYearImagesPopup.value = false;
    };

    return {
      years,
      showYearImagesPopup,
      selectedYear,
      handleYearClick,
      handleCloseYearImagesPopup,
    };
  },
});
</script>

<style lang="scss" scoped>
.year-gallery-container {
  margin-top: 80px;

  .header {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .year-gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
