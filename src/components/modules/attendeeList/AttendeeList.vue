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
          v-model="name"
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
          v-model="phoneNumber"
          id="contact"
          type="tel"
          placeholder="휴대폰번호를 입력해주세요. (숫자만 입력)"
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
        항목: 성함, 연락처, IP주소 · 보유기간: 결혼식 익일까지
        <br />
        IP주소는 무분별한 데이터 수정을 방지하기 위해 수집됩니다.
      </p>
      <div class="checkbox">
        <input id="agree" type="checkbox" v-model="agree" />
        <label for="agree">동의합니다</label>
      </div>
    </div>

    <button class="button" :disabled="isLoading" @click="handleSubmit">
      참석 의사 전달하기
    </button>
  </div>
  <toast-popup :message="toastMessage" :showToast="showToast"></toast-popup>
  <circle-spinner :isLoading="isLoading"></circle-spinner>
</template>

<script lang="ts">
import { formatPhoneNumber } from '@/utils';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  watch,
} from 'vue';
import { database } from '@/firebaseConfig';
import { onValue, ref, update, push } from 'firebase/database';
import { ToastPopup } from '../toastPopup';
import { CircleSpinner } from '../circleSpinner';
import { limitFirebaseRequest } from '@/api';

interface Attendee {
  name: string;
  phoneNumber: string;
  attending: boolean;
}

export default defineComponent({
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  components: { ToastPopup, CircleSpinner },
  setup(props, { emit }) {
    const state = reactive({
      name: '',
      phoneNumber: '',
      attending: true,
      isDuplicate: false,
      attendees: {} as Record<string, Attendee>,
      showToast: false,
      toastMessage: '',
      agree: false,
      isLoading: false,
    });

    onMounted(() => {
      loadAttendees();
      document.body.classList.add('no-scroll');
    });

    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');
    });

    watch(
      () => state.phoneNumber,
      (newValue) => {
        state.phoneNumber = formatPhoneNumber(newValue);
      },
    );

    const setToastMessage = (message: string, close?: boolean) => {
      state.toastMessage = message;
      state.showToast = true;
      setTimeout(() => {
        state.showToast = false;

        if (close) {
          closePopup();
        }
      }, 1000);
    };

    const closePopup = () => {
      emit('close');
      document.body.classList.remove('no-scroll');
    };

    /**
     * Firebase에서 참석자 목록을 불러오는 함수
     *
     * onValue를 통해 실시간 데이터 감지 및 자동 UI 업데이트 시킴
     */
    const loadAttendees = () => {
      const attendeesRef = ref(database, 'attendees');

      onValue(attendeesRef, (snapshot) => {
        state.attendees = snapshot.val() || {};
      });
    };

    const limitCheck = async () => {
      try {
        state.isLoading = true;
        const {
          data: { remainingRequests, message },
        } = await limitFirebaseRequest();
        return { remainingRequests, message };
      } catch (error) {
        state.isLoading = false;
        return { remainingRequests: null, message: 'error' };
      } finally {
        state.isLoading = false;
      }
    };

    const handleSubmit = async () => {
      if (!state.name) {
        setToastMessage('성함을 입력해주세요.');
        return;
      } else if (!state.phoneNumber) {
        setToastMessage('연락처를 입력해주세요.');
        return;
      } else if (!state.agree) {
        setToastMessage('개인정보 수집 및 이용에 동의해주세요.');
        return;
      }

      const isDuplicate = await checkDuplicateAttendee();

      if (isDuplicate) {
        return;
      } else {
        // 기존 데이터 삭제 후 새로운 데이터 추가 로직
        const attendeesRef = ref(database, 'attendees');
        const newAttendeeRef = await push(attendeesRef, {
          name: state.name,
          phoneNumber: state.phoneNumber,
          attending: state.attending,
        });

        // 로컬 상태 업데이트
        if (newAttendeeRef.key) {
          updateLocalAttendees(newAttendeeRef.key);
        }
      }
    };

    const checkDuplicateAttendee = async () => {
      for (const key in state.attendees) {
        const attendee = state.attendees[key];
        if (attendee.phoneNumber === state.phoneNumber) {
          if (attendee.name === state.name) {
            const attendeeRef = ref(database, `attendees/${key}`);
            if (attendee.attending !== state.attending) {
              if (
                window.confirm(
                  `이미 참석 여부를 등록하셨습니다.\n참석 여부를 변경하시겠습니까?`,
                )
              ) {
                const { remainingRequests } = await limitCheck();

                if (remainingRequests === 0) {
                  setToastMessage(`더 이상 수정할 수 없습니다.`, false);
                  return true;
                }
                // TODO 기존에 remove대신 update를 사용 (remove를 하면 key가 꼬이는 거 같음)
                await update(attendeeRef, { attending: state.attending }); // 참석 여부만 업데이트
                updateLocalAttendees(key); // 로컬 상태 업데이트
                setToastMessage(
                  `참석 여부가 수정되었습니다. 남은 수정 횟수 ${remainingRequests}회`,
                  true,
                );
                return true;
              } else {
                return true;
              }
            } else {
              const { remainingRequests } = await limitCheck();
              if (remainingRequests === 0) {
                setToastMessage(`더 이상 수정할 수 없습니다.`, false);
                return true;
              }
              setToastMessage('이미 참석 여부를 등록하셨습니다.');
              return true;
            }
          }
        }
      }
      const { remainingRequests } = await limitCheck();
      setToastMessage(
        `등록되었습니다. 남은 수정 횟수 ${remainingRequests}회`,
        true,
      );
      return false;
    };

    // 로컬 상태 업데이트 함수
    const updateLocalAttendees = (key: string) => {
      if (key) {
        state.attendees[key] = {
          ...state.attendees[key],
          attending: state.attending,
        };
      }
    };

    return {
      ...toRefs(state),
      setToastMessage,
      closePopup,
      limitCheck,
      handleSubmit,
      checkDuplicateAttendee,
    };
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
  max-height: 80vh;
  height: auto;
  max-width: 500px;
  background-color: #f9f9f9;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  overflow: auto;

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
        letter-spacing: -1px;
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
    width: 100%;
    background-color: transparent;
    font-size: 0.9rem;
    font-weight: bold;
    border: 1px solid rgba(255, 165, 0, 0.2);
    box-sizing: border-box;
    padding: 10px 20px;
    margin-top: 20px;
  }
}
</style>
