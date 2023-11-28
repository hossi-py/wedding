<template>
  <div class="attendee-list-container" @scroll="handleScroll">
    <div class="header">
      <span class="title">참석 의사 전달하기</span>
      <button class="close-button" @click="closePopup">X</button>
    </div>

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
        <label for="attending">참석가능</label>

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

    <div class="attendee-list-wrapper">
      <span class="sub-title">정보를 입력해주세요.</span>
      <div class="input-container">
        <span class="input-area">
          <span class="text">성함<b class="spot"></b></span>
        </span>
        <input
          id="name"
          type="text"
          placeholder="성함을 입력해주세요."
          autocomplete="off"
          maxlength="30"
        />
      </div>
      <div class="input-container">
        <span class="input-area">
          <span class="text">연락처<b class="spot"></b></span>
        </span>
        <input
          id="contact"
          type="text"
          placeholder="휴대폰번호를 입력해주세요. (숫자만)"
          autocomplete="off"
          maxlength="30"
        />
      </div>
    </div>

    <div class="personal-info-wrapper">
      <div class="text">
        개인정보 수집 및 이용동의(필수)<b class="spot"></b>
      </div>
      <p class="description">
        참석여부 확인을 위한 개인정보 수집 및 이용에 동의해주세요.
        <br />
        항목: 성함, 연락처 · 보유기간: 결혼식 익일까지
      </p>
      <div class="checkbox">
        <input id="agree" type="checkbox" />
        <label for="agree">동의합니다</label>
      </div>
    </div>

    <div class="button" @click="handleClickButton">참석 의사 전달하기</div>
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

    const handleClickButton = () => {
      //
    };

    return { ...toRefs(state), closePopup, handleClickButton };
  },
});
</script>

<style lang="scss" scoped>
.attendee-list-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80vh;
  max-width: 500px;
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15%;

    .title {
      font-size: 1rem;
    }

    .close-button {
      position: absolute;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }

  .attendee-list-wrapper {
    .sub-title {
      padding-left: 10px;
      margin-top: 8%;
      display: flex;
      font-size: 0.9rem;
      font-weight: bold;
    }

    .radio-area {
      margin-top: 30px;
      margin-bottom: 30px;
      position: relative;
      display: flex;
      justify-content: center;
      gap: 30px;

      input[type='radio'] {
        position: absolute;
        width: 0;
        height: 0;
      }

      label {
        position: relative;
        padding: 10px 35px;
        border: 1px solid rgba(255, 165, 0, 0.2);
        border-radius: 5px;
        cursor: pointer;
      }

      label::before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid transparent;
        border-radius: 5px;
      }

      input[type='radio']:checked + label {
        background-color: rgba(255, 165, 0, 0.5);
        color: #000000;
        border-color: rgba(255, 165, 0, 0.5);
      }
    }

    .input-container {
      position: relative;
      border-bottom: 1px solid rgba(255, 165, 0, 0.2);
      padding-left: 60px;
      height: 60px;

      .input-area {
        padding-left: 10px;
        position: absolute;
        text-align: left;
        width: 75px;
        height: 60px;
        top: 0;
        left: 0;

        .text {
          position: relative;
          font-size: 0.8rem;
          font-weight: 600;
          color: #222;
          line-height: 60px;

          .spot {
            position: absolute;
            display: inline-block;
            border-radius: 100%;
            width: 5px;
            height: 5px;
            top: 0;
            right: -10px;
            background: #f76767;
          }
        }
      }

      input {
        width: 100%;
        height: 60px;
        background: transparent;
        border: none;
        outline: none;
        box-sizing: border-box;
        font-size: 0.9rem;
        color: #333;
      }

      input::placeholder {
        font-size: 0.75rem;
        color: #aaa;
      }
    }
  }

  .personal-info-wrapper {
    display: flex;
    flex-direction: column;
    text-align: left;
    border: 1px solid rgba(255, 165, 0, 0.2);
    box-sizing: border-box;
    padding: 10px 20px;
    margin-top: 20px;

    .text {
      display: inline-block;
      position: relative;
      font-size: 0.95rem;
      font-weight: bold;

      .spot {
        position: absolute;
        display: inline-block;
        border-radius: 100%;
        width: 5px;
        height: 5px;
        top: 0;
        margin-left: 10px;
        background: #f76767;
      }
    }

    .description {
      font-size: 0.75rem;
      letter-spacing: -1px;
      color: #aaa;
      font-weight: 300;
      line-height: 20px;
    }

    .checkbox {
      display: flex;
      align-items: center;
      font-size: 0.8rem;

      input[type='checkbox'] {
        position: absolute;
        width: 0;
        height: 0;
      }

      label {
        display: inline-block;
        position: relative;
        padding-left: 25px;
      }

      // 가상의 체크박스
      label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 15px;
        height: 15px;
        border: 2px solid rgba(255, 165, 0, 0.2);
        border-radius: 4px;
        background-color: white;
      }

      input[type='checkbox']:checked + label:after {
        content: '';
        position: absolute;
        left: 6px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid orange; /* 체크 표시 색상 */
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }

  .button {
    font-size: 0.9rem;
    font-weight: bold;
    border: 1px solid rgba(255, 165, 0, 0.2);
    box-sizing: border-box;
    padding: 10px 20px;
    margin-top: 20px;
  }
}
</style>
