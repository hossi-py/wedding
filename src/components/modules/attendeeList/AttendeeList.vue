<template>
  <div class="attendee-list-container">
    <h2>참석자 명단</h2>
    <ul>
      <li v-for="(attendee, index) in attendees" :key="index">
        이름: {{ attendee.name }}, 참석 여부:
        {{ attendee.attending ? '참석' : '불참' }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref as vueRef } from 'vue';
import { database } from '@/firebaseConfig';
import { ref as firebaseRef, onValue } from 'firebase/database';

export default defineComponent({
  setup() {
    const attendees = vueRef([]);

    onMounted(() => {
      const attendeesRef = firebaseRef(database, 'attendees');
      onValue(attendeesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          attendees.value = Object.values(data);
        }
      });
    });

    return { attendees };
  },
});
</script>

<style lang="scss" scoped>
.attendee-list-container {
}
</style>
