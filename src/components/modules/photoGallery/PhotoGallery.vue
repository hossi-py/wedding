<template>
  <div class="photo-gallery">
    갤러리 영역
    <select-box
      :options="yearOptions || []"
      :placeholder="'연도 선택'"
      :value="selectedValues"
      @change="handleOptionChange"
    ></select-box>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import SelectBox from '../selectBox/SelectBox.vue';

export default defineComponent({
  name: 'PhotoGallery',
  components: { SelectBox },
  setup() {
    const state = reactive({
      yearOptions: [
        { label: '전체', value: 'ALL' },
        { label: '2014', value: '2014' },
        { label: '2015', value: '2015' },
        { label: '2016', value: '2016' },
        { label: '2017', value: '2017' },
        { label: '2018', value: '2018' },
        { label: '2019', value: '2019' },
        { label: '2020', value: '2020' },
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
      ],
      selectedValues: [] as string[],
    });

    const handleOptionChange = (value: string[]) => {
      if (value.includes('ALL')) {
        state.selectedValues = state.yearOptions.map((option) => option.value);
      } else {
        state.selectedValues = value;
      }
    };

    return {
      ...toRefs(state),
      handleOptionChange,
    };
  },
});
</script>

<style scoped>
.photo-gallery {
}
</style>
