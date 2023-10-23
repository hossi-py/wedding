<template>
  <div>
    <flower-leaf v-for="n in 12" :key="`leaf-${n}`"></flower-leaf>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FlowerLeaf } from '../flowerLeaf';

export default defineComponent({
  name: 'FallingLeaf',
  components: { FlowerLeaf },
  setup() {
    return {};
  },
});
</script>
