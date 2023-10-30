<template>
  <falling-leaf></falling-leaf>
  <div id="app" :class="{ 'fade-enter': !isLoaded }">
    <main-contents></main-contents>
    <main-introduce></main-introduce>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { FallingLeaf, MainContents, MainIntroduce } from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    FallingLeaf,
    MainContents,
    MainIntroduce,
  },
  setup() {
    const isLoaded = ref(false);

    onMounted(() => {
      setTimeout(() => {
        isLoaded.value = true;
      }, 2000);
    });

    return { isLoaded };
  },
});
</script>

<style>
@import '@/assets/styles/base.css';

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fillFromLeft {
  from {
    background-size: 0% 100%;
  }
  to {
    background-size: 100% 100%;
  }
}

@keyframes fillFromRight {
  from {
    background-size: 100% 100%;
  }
  to {
    background-size: 0% 100%;
  }
}

.fade-enter {
  animation: fadeIn 3s forwards;
}

@font-face {
  font-family: 'KCCChassam';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCCChassam.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'yg-jalnan';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'HakgyoansimWoojuR';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SUIT-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2')
    format('woff2');
  font-weight: normal;
  font-style: normal;
}

body,
html {
  height: 100%;
  background-color: #fffdf9;
  margin: 0;
  margin-bottom: 16px;
}
#app {
  background-color: #fffdf9;
  display: flex;
  flex-direction: column;
  font-family: 'SUIT-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-bottom: 36px;
}
</style>
