<template>
  <div class="spinner" v-if="visible && loadingDuration >= 800">
    <div class="loading">
      <p class="loading-text">
        <span>우리의 행복한 날을 함께할 준비를 하고 있어요!</span>
      </p>
      <div class="loading-bar-container">
        <div class="loading-bar" :style="{ width: loadingProgress + '%' }">
          <span>{{ loadingProgress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loadingDuration: {
      // 로딩 시간을 props로 받음
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      loadingProgress: 0, // 로딩 진행률
    });

    const updateLoadingProgress = () => {
      const interval = props.loadingDuration / 100;

      const timer = setInterval(() => {
        if (state.loadingProgress < 100) {
          state.loadingProgress += 1;
        } else {
          clearInterval(timer);
          emit('loading-complete');
        }
      }, interval);
    };

    watch(
      () => props.visible,
      (newValue) => {
        if (newValue) {
          document.body.classList.add('no-scroll');
          updateLoadingProgress(); // 로딩이 시작될 때 진행률 업데이트 시작
        } else {
          document.body.classList.remove('no-scroll');
          state.loadingProgress = 0; // 로딩이 끝나면 진행률 리셋
        }
      },
    );

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

    .loading-text {
      font-size: 0.8rem;
      margin-bottom: 15px;
      text-align: center;

      span {
        display: block; // 문구를 블록 요소로 만들어 줄바꿈
        margin-bottom: 5px; // 퍼센트와의 간격
      }
    }

    .loading-bar-container {
      position: relative;
      border: 1px solid #fff;
      border-radius: 5px;

      .loading-bar {
        width: 0;
        height: 20px;
        background-color: rgba(255, 165, 0, 0.5);
        background-image: linear-gradient(
          to right,
          rgba(255, 165, 0, 0.8),
          rgba(255, 165, 0, 0.6)
        );
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          font-size: 0.8rem;
          color: #fff;
        }
      }
    }
  }
}
</style>
