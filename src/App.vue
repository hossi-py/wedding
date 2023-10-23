<template>
  <div id="app">
    <falling-leaf></falling-leaf>
    <div class="introduce">
      <p class="main-title">결혼합니다</p>
      <page-separator></page-separator>
      <div class="names">
        <p class="name">유라</p>
        <div class="date">
          MM
          <hr class="hr" />
          DD
        </div>
        <p class="name">태환</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FallingLeaf, PageSeparator } from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    PageSeparator,
    FallingLeaf,
  },
});
</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fffaf0;
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

@font-face {
  font-family: 'KCCChassam';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCCChassam.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

.introduce {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.introduce .main-title {
  font-family: 'KCCChassam';
  font-size: 38px;
  margin-bottom: 1rem;
  letter-spacing: 5px;
}

.names {
  font-family: 'KCCChassam';
  display: flex;
  gap: 4rem;
  margin-top: 20px;
}

.date {
  font-size: 25px;
}

.name {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  text-align: center;
  font-size: 26px;
}
</style>
