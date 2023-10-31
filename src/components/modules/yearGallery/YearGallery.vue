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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import YearCard from '../yearCard/YearCard.vue';

export default defineComponent({
  components: { YearCard },
  setup() {
    const years = ref(Array.from({ length: 10 }, (_, i) => 2014 + i));

    const handleYearClick = (selectedYear: number) => {
      console.log(selectedYear);
    };

    return { years, handleYearClick };
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
