<template>
  <div class="year-images-container">
    <button @click="closePopup">X</button>
    <div class="images-container">이미지 들어감</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    year: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selectedYear = computed(() => {
      return props.year;
    });

    const closePopup = () => {
      emit('close');
    };
    return { selectedYear, closePopup };
  },
});
</script>

<style lang="scss" scoped>
.year-images-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .images-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 80vw;
    max-height: 80vh;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; // 이미지 간 간격

    .year-image {
      max-width: 100px; // 이미지 최대 너비, 필요에 따라 조절하세요.
      border-radius: 5px;
    }
  }

  button {
    position: absolute;
    background-color: transparent;
    font-size: 25px;
    color: #fff;
    top: 10px;
    right: 10px;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
}
</style>
