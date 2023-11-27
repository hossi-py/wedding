<template>
  <div class="attendee-list-container" @scroll="handleScroll">
    <span class="title">참석 의사 전달하기</span>
    <button class="close-button" @click="closePopup">X</button>

    <div class="attendee-list-wrapper">
      <span class="sub-title">참석 여부를 선택해주세요.</span>
      <div class="radio-area">
        <input
          type="radio"
          id="attending"
          name="attending"
          :value="true"
          v-model="attending"
        />
        <label for="attending_can">참석가능</label>

        <input
          type="radio"
          id="notAttending"
          name="attending"
          :value="false"
          v-model="attending"
        />
        <label for="notAttending">참석불가</label>
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
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      attending: true,
    });

    onMounted(() => {
      document.body.classList.add('no-scroll');
    });

    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');
    });

    const closePopup = () => {
      emit('close');
      document.body.classList.remove('no-scroll');
    };

    return { ...toRefs(state), closePopup };
  },
});
</script>

<style lang="scss" scoped>
.sub-title {
  font-size: 0.9rem;
  font-weight: bold;
}

.attendee-list-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10;

  .title {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 3%;
    left: 50%;
    font-weight: bold;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  .close-button {
    cursor: pointer;
    z-index: 100;
    position: fixed;
    background-color: transparent;
    font-size: 25px;
    top: 14px;
    right: 25px;
    border: none;
  }

  .attendee-list-wrapper {
    z-index: 100;
    margin-top: 100px;

    .radio-area {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .radio-area input[type='radio'] {
      position: absolute;
      visibility: hidden;
    }

    .radio-area label {
      padding: 5px 15px;
      border: 1px solid #ccc;
      cursor: pointer;
    }

    /* 선택되지 않은 상태의 라디오 버튼 스타일 */
    .radio-area label:not(:checked) {
      background-color: #fff;
    }

    /* 선택된 상태의 라디오 버튼 스타일 */
    .radio-area input[type='radio']:checked + label {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
