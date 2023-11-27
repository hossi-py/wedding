<template>
  <div class="attendee-component-container">
    <input v-model="name" type="text" placeholder="이름" />
    <input
      v-model="phoneNumber"
      type="tel"
      placeholder="전화번호 (숫자만 입력)"
    />
    <div>
      <input type="radio" id="attending" value="true" v-model="attending" />
      <label for="attending">참석</label>
      <input type="radio" id="notAttending" value="false" v-model="attending" />
      <label for="notAttending">불참</label>
    </div>
    <button @click="addOrUpdateAttendee" :disabled="isDuplicate">추가</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, reactive, toRefs } from 'vue';
import { database } from '@/firebaseConfig';
import { onValue, ref, remove, set, push } from 'firebase/database';
import { formatPhoneNumber } from '@/utils';

interface Attendee {
  name: string;
  phoneNumber: string;
  attending: boolean;
}

export default defineComponent({
  name: 'AttendeeComponent',
  setup() {
    const state = reactive({
      name: '',
      phoneNumber: '',
      attending: false,
      isDuplicate: false,
      attendees: {} as Record<string, Attendee>,
    });

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
      state.isDuplicate = await checkDuplicateAttendee();

      if (state.isDuplicate) {
        const attendeeRef = ref(database, `attendees/${state.phoneNumber}`);

        await set(attendeeRef, {
          name: state.name,
          phoneNumber: state.phoneNumber,
          attending: state.attending,
        });
        // 로컬 상태 업데이트
        state.attendees[state.phoneNumber] = {
          name: state.name,
          phoneNumber: state.phoneNumber,
          attending: state.attending,
        };
      } else {
        const attendeesRef = ref(database, 'attendees');

        const newAttendeeRef = await push(attendeesRef, {
          name: state.name,
          phoneNumber: state.phoneNumber,
          attending: state.attending,
        });
        // 로컬 상태 업데이트
        const newAttendeeKey = newAttendeeRef.key;

        if (newAttendeeKey) {
          state.attendees[newAttendeeKey] = {
            name: state.name,
            phoneNumber: state.phoneNumber,
            attending: state.attending,
          };
        }
      }
    };

    // 참석자 중복 확인하는 함수
    const checkDuplicateAttendee = async () => {
      const attendee = state.attendees[state.phoneNumber];

      console.log(attendee);

      if (attendee && attendee.name === state.name) {
        if (attendee.attending === state.attending) {
          // 완전히 일치하는 경우 데이터 업데이트 없음
          return true;
        } else {
          // 이름과 전화번호가 일치하지만 참석 여부만 다른 경우
          // 기존 데이터 삭제 후 새로운 데이터 추가
          const attendeeRef = ref(database, `attendees/${state.phoneNumber}`);
          await remove(attendeeRef);
          return false;
        }
      }

      return false;
    };

    // 데이터베이스에서 참석자 목록을 불러옴
    onMounted(loadAttendees);

    return {
      ...toRefs(state),
      addOrUpdateAttendee,
      checkDuplicateAttendee,
    };
  },
});
</script>

<style lang="scss" scoped></style>
