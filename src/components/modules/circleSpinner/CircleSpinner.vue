<template>
  <div class="spinner-overlay" v-if="isLoading">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return;
  },
});
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-left-color: rgba(255, 165, 0, 0.5);
  animation: spin 1s ease infinite;
  -webkit-animation: spin 1s ease infinite;
}
</style>
