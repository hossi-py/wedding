<template>
  <div id="toast" :class="{ visible: localShowToast }">
    <div class="toast-wrapper">
      <div class="toast-icon">
        <img src="~@/assets/images/circle_check.png" alt="" />
      </div>
      <span>{{ message }}</span>
    </div>
    <div class="toast-timer" :class="{ loading: localShowToast }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
    showToast: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const state = reactive({
      localShowToast: false,
    });

    watch(
      () => props.showToast,
      (newValue) => {
        state.localShowToast = newValue;
      },
    );

    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
#toast {
  visibility: hidden;
  border: 1px solid rgba(255, 165, 0, 0.5);
  border-radius: 15px;
  background-color: #fff;
  width: 300px;
  height: 70px;
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;

  &.visible {
    visibility: visible;
  }

  .toast-wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;

    .toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 20px;
      width: 40px;
      height: 40px;
      background-color: rgba(255, 165, 0, 0.2);
      border-radius: 10px;
    }

    span {
      margin-left: 25px;
      font-size: 0.85rem;
    }
  }

  .toast-timer.loading {
    width: 0;
    height: 7px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    position: absolute;
    bottom: 0;
    background-color: rgba(255, 165, 0, 0.5);
    background-image: linear-gradient(
      to right,
      rgba(255, 165, 0, 0.1),
      rgba(255, 165, 0, 1)
    );
    border-radius: 5px;
    animation: fillBar 1.5s linear forwards;
    -webkit-animation: fillBar 1.5s linear forwards;
  }
}
</style>
