<template>
  <div class="attendee-component-container">
    <div class="header">참석 의사</div>

    <p>신랑, 신부에게 참석 의사를 전달할 수 있어요.</p>
    <div class="button-area">
      <div class="button" @click="handleClickButton">
        <p class="button-text">참석 의사 전달하기</p>
      </div>
    </div>

    <!-- <input v-model="name" type="text" placeholder="이름" />
    <input
      v-model="phoneNumber"
      type="tel"
      placeholder="휴대폰 번호 (숫자만 입력)"
    /> -->
    <!-- <div>
      <input type="radio" id="attending" :value="true" v-model="attending" />
      <label for="attending">참석</label>
      <input
        type="radio"
        id="notAttending"
        :value="false"
        v-model="attending"
      />
      <label for="notAttending">불참</label>
    </div> -->
    <!-- <button @click="addOrUpdateAttendee">추가</button> -->
    <attendee-list v-if="showPopup" @close="closePopup"></attendee-list>
    <toast-popup :message="toastMessage" :showToast="showToast"></toast-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, reactive, toRefs } from 'vue';
import { database } from '@/firebaseConfig';
import { onValue, ref, update, push } from 'firebase/database';
import { formatPhoneNumber } from '@/utils';
import ToastPopup from '../toastPopup/ToastPopup.vue';
import AttendeeList from '../attendeeList/AttendeeList.vue';

interface Attendee {
  name: string;
  phoneNumber: string;
  attending: boolean;
}

export default defineComponent({
  name: 'AttendeeComponent',
  components: {
    ToastPopup,
    AttendeeList,
  },
  setup() {
    const state = reactive({
      showPopup: false,
      name: '',
      phoneNumber: '',
      attending: true,
      isDuplicate: false,
      attendees: {} as Record<string, Attendee>,
      showToast: false,
      toastMessage: '',
    });

    const handleClickButton = () => {
      state.showPopup = true;
    };

    const closePopup = () => {
      state.showPopup = false;
    };

    watch(
      () => state.phoneNumber,
      (newValue) => {
        state.phoneNumber = formatPhoneNumber(newValue);
      },
    );

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

    // 참석자 추가 또는 업데이트 함수
    const addOrUpdateAttendee = async () => {
      if (!state.name) {
        setToastMessage('이름을 입력해주세요.');
        return;
      } else if (!state.phoneNumber) {
        setToastMessage('휴대폰 번호를 입력해주세요.');
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

    // 참석자 중복 확인하는 함수
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
                // TODO 기존에 remove대신 update를 사용 (remove를 하면 key가 꼬이는 거 같음)
                await update(attendeeRef, { attending: state.attending }); // 참석 여부만 업데이트
                updateLocalAttendees(key); // 로컬 상태 업데이트
                setToastMessage('참석 여부가 수정되었습니다.');
                return true;
              } else {
                return true;
              }
            } else {
              setToastMessage('이미 참석 여부를 등록하셨습니다.');
              return true;
            }
          }
        }
      }
      setToastMessage('등록되었습니다.');
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

    const setToastMessage = (message: string) => {
      state.toastMessage = message;
      state.showToast = true;
      setTimeout(() => {
        state.showToast = false;
      }, 1600);
    };

    // 데이터베이스에서 참석자 목록을 불러옴
    onMounted(loadAttendees);

    return {
      ...toRefs(state),
      handleClickButton,
      closePopup,
      addOrUpdateAttendee,
      checkDuplicateAttendee,
    };
  },
});
</script>

<style lang="scss" scoped>
.attendee-component-container {
  margin-top: 80px;
  p {
    font-size: 0.85rem;
  }

  .button-area {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    .button {
      border: 1px solid #eeeeee;
      background-color: #fff;
      width: 215px;
      height: 48px;
      border-radius: 15px;

      .button-text {
        font-weight: bold;
        font-size: 0.85rem;
        color: #404040;
      }
    }
  }
}
</style>
