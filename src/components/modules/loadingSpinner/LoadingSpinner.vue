<template>
  <div class="spinner" v-show="visible">
    <div class="loading">
      <p class="loading-text">
        앱이 설치되어있지 않은 경우<br />앱 다운로드 화면으로 이동합니다.
        <!-- <span class="dot" :class="{ 'is-visible': dotCount >= 1 }">.</span>
        <span class="dot" :class="{ 'is-visible': dotCount >= 2 }">.</span>
        <span class="dot" :class="{ 'is-visible': dotCount >= 3 }">.</span> -->
      </p>
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
} from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({
      dotCount: 0,
      intervalId: 0,
    });

    // function updateDots() {
    //   // dotCount를 증가시키고, 3이 되면 다시 0으로 초기화
    //   state.dotCount = (state.dotCount + 1) % 4;
    // }

    onMounted(() => {
      document.body.classList.add('no-scroll');

      // state.intervalId = setInterval(updateDots, 500);
    });

    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');

      // clearInterval(state.intervalId);
    });

    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.spinner {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .loading {
    color: #fff;

    // .dot {
    //   transition: opacity 0.5s ease-in-out;
    //   -webkit-transition: opacity 0.5s ease-in-out;
    //   opacity: 0;
    // }

    // .is-visible {
    //   opacity: 1;
    // }

    .loading-text {
      font-size: 0.9rem;
      line-height: 1.5rem;
      width: 200px;
    }

    .loading-bar-container {
      width: 200px;
      border: 1px solid #fff;
      border-radius: 5px;
    }

    .loading-bar {
      width: 0;
      height: 15px;
      background-color: rgba(255, 165, 0, 0.5);
      background-image: linear-gradient(
        to right,
        rgba(255, 165, 0, 0.8),
        rgba(255, 165, 0, 0.6)
      );
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      animation: fillBar 2.5s linear forwards;
      -webkit-animation: fillBar 2.5s linear forwards;
    }
  }
}
</style>
