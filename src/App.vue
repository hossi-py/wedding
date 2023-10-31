<template>
  <falling-leaf></falling-leaf>
  <div id="app" :class="{ 'fade-enter': !isLoaded }">
    <main-contents></main-contents>
    <main-introduce></main-introduce>
    <wedding-calendar></wedding-calendar>
    <year-gallery></year-gallery>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import {
  FallingLeaf,
  MainContents,
  MainIntroduce,
  WeddingCalendar,
  YearGallery,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    FallingLeaf,
    MainContents,
    MainIntroduce,
    WeddingCalendar,
    YearGallery,
  },
  setup() {
    const isLoaded = ref(false);

    onMounted(() => {
      setTimeout(() => {
        isLoaded.value = true;
      }, 3000);
    });

    return { isLoaded };
  },
});
</script>

<style>
@import '@/assets/styles/base.css';

.fade-enter {
  animation: fadeIn 3s forwards;
}

.fade-carousel {
  animation: fadeIn 0.7s forwards;
}

.fade-image {
  animation: fadeIn 1s forwards;
}

.no-scroll {
  overflow: hidden;
  height: 100%;
}

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

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.3;
  }
  10% {
    opacity: 0.4;
  }
  20% {
    opacity: 0.5;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.85;
  }
  70% {
    opacity: 0.9;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
}

@keyframes flipIn {
  0% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  10% {
    transform: rotateX(-80deg);
    opacity: 0.2;
  }
  20% {
    transform: rotateX(-70deg);
    opacity: 0.3;
  }
  30% {
    transform: rotateX(-60deg);
    opacity: 0.7;
  }
  40% {
    transform: rotateX(-50deg);
    opacity: 0.8;
  }
  50% {
    transform: rotateX(-45deg);
    opacity: 0.9;
  }
  60% {
    transform: rotateX(-30deg);
    opacity: 0.95;
  }
  70% {
    transform: rotateX(-15deg);
    opacity: 0.98;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

@keyframes flipOut {
  0% {
    transform: rotateX(0deg);
  }
  10% {
    transform: rotateX(10deg);
  }
  20% {
    transform: rotateX(20deg);
  }
  30% {
    transform: rotateX(30deg);
  }
  40% {
    transform: rotateX(40deg);
  }
  50% {
    transform: rotateX(50deg);
  }
  60% {
    transform: rotateX(60deg);
    opacity: 0.3;
  }
  70% {
    transform: rotateX(75deg);
    opacity: 0.2;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes jelly {
  0% {
    transform: scale(1, 1) translateZ(0);
  }
  30% {
    transform: scale(1.175, 0.825) translateZ(-17.5px);
  }
  40% {
    transform: scale(0.825, 1.175) translateZ(15px);
  }
  50% {
    transform: scale(1.1, 0.9) translateZ(-12.5px);
  }
  65% {
    transform: scale(0.935, 1.065) translateZ(11px);
  }
  75% {
    transform: scale(1.035, 0.965) translateZ(-7.5px);
  }
  100% {
    transform: scale(1, 1) translateZ(0);
  }
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
html {
  scroll-behavior: smooth;
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
