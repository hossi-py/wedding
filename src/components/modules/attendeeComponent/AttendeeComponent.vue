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
import {
  defineComponent,
  ref as vueRef,
  watch,
  onMounted,
  computed,
} from 'vue';
import { database } from '@/firebaseConfig';
import { ref, push, onValue, remove, child } from 'firebase/database';
import { formatPhoneNumber } from '@/utils';

interface Attendee {
  name: string;
  phoneNumber: string;
  attending: boolean;
}

export default defineComponent({
  name: 'AttendeeComponent',
  setup() {
    const name = vueRef('');
    const phoneNumber = vueRef('');
    const formattedPhoneNumber = computed(() =>
      formatPhoneNumber(phoneNumber.value),
    );
    const attending = vueRef('true');
    const attendees = vueRef<Record<string, Attendee>>({});
    const isDuplicate = vueRef(false);

    watch(phoneNumber, (newValue) => {
      phoneNumber.value = formatPhoneNumber(newValue);
    });

    // Firebase에서 참석자 목록을 불러오는 함수
    const loadAttendees = () => {
      const attendeesRef = ref(database, 'attendees');
      onValue(attendeesRef, (snapshot) => {
        attendees.value = snapshot.val() || {};
      });
    };

    // 이름과 전화번호가 중복되는지 검사하는 함수
    const checkDuplicate = () => {
      isDuplicate.value = false; // 기본적으로 중복이 아님

      for (const [, attendee] of Object.entries(attendees.value)) {
        if (
          attendee.name === name.value &&
          attendee.phoneNumber === phoneNumber.value
        ) {
          if (attendee.attending.toString() === attending.value) {
            isDuplicate.value = true; // 중복이며 참석 여부도 같으면 중복으로 설정
            break;
          }
        }
      }
    };

    // 참석자 추가 또는 업데이트 함수
    const addOrUpdateAttendee = async () => {
      if (isDuplicate.value) return; // 중복이면 추가하지 않음

      const attendeesRef = ref(database, 'attendees');
      let duplicateKey = null;

      // 기존 데이터 검사 및 키 찾기
      for (const [key, attendee] of Object.entries(attendees.value)) {
        if (
          attendee.name === name.value &&
          attendee.phoneNumber === phoneNumber.value
        ) {
          duplicateKey = key; // 중복된 키 저장
          break;
        }
      }

      // 중복된 데이터가 있으면 삭제
      if (duplicateKey !== null) {
        await remove(child(attendeesRef, duplicateKey));
      }

      // 새 데이터 추가
      push(attendeesRef, {
        name: name.value,
        phoneNumber: phoneNumber.value,
        attending: attending.value === 'true',
      });

      name.value = '';
      phoneNumber.value = '';
      attending.value = 'true';
    };

    // 데이터베이스에서 참석자 목록을 불러옴
    onMounted(loadAttendees);

    // 중복 검사
    watch([name, phoneNumber, attending], checkDuplicate);

    return {
      name,
      phoneNumber,
      formattedPhoneNumber,
      attending,
      addOrUpdateAttendee,
      isDuplicate,
    };
  },
});
</script>

<style lang="scss" scoped>
.attendee-component-container {
}
</style>
