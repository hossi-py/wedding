<template>
  <div class="page-separator">
    <img src="~@/assets/images/page-separator.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageSeparator',
});
</script>

<style lang="scss" scoped>
.page-separator {
  padding-left: 10px;
  padding-right: 10px;
  img {
    width: 100%;
  }
}
</style>
