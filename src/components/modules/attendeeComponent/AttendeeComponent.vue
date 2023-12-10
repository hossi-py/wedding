<template>
  <div class="attendee-component-container">
    <div class="header">참석 의사</div>

    <p class="text-medium">신랑, 신부에게 참석 의사를 전달할 수 있어요.</p>
    <div class="button-area">
      <div class="button" @click="handleClickButton">
        <p class="button-text text-medium">참석 의사 전달하기</p>
      </div>
    </div>
    <attendee-list v-if="showPopup" @close="closePopup"></attendee-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import AttendeeList from '../attendeeList/AttendeeList.vue';

export default defineComponent({
  name: 'AttendeeComponent',
  components: {
    AttendeeList,
  },
  setup() {
    const state = reactive({
      showPopup: false,
      isDuplicate: false,
    });

    const handleClickButton = () => {
      state.showPopup = true;
    };

    const closePopup = () => {
      state.showPopup = false;
    };

    return {
      ...toRefs(state),
      handleClickButton,
      closePopup,
    };
  },
});
</script>

<style lang="scss" scoped>
.attendee-component-container {
  margin-top: 80px;
  p {
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
        color: #404040;
      }
    }
  }
}
</style>
