<template>
  <falling-leaf></falling-leaf>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FallingLeaf } from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    FallingLeaf,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
@import '@/assets/styles/base.css';
</style>
