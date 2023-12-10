<template>
  <div class="account-info-container">
    <div class="header">마음 전하실 곳</div>
    <div class="account-info-wrapper groom" @click="openAccountInfo('groom')">
      <span class="text-medium">신랑 측 계좌번호</span>
    </div>
    <div class="account-info-wrapper bride" @click="openAccountInfo('bride')">
      <span class="text-medium">신부 측 계좌번호</span>
    </div>
    <toast-popup :message="toastMessage" :showToast="showToast"></toast-popup>

    <transition name="slide-up">
      <div v-if="isAccountInfoVisible" class="account-info-popup">
        <div v-for="(item, index) in accountItems" :key="`item-${index}`">
          <div class="popup-wrapper">
            <div class="text-button">
              <div>{{ item.title }}</div>
              <button
                :class="selectedAccount"
                type="button"
                @click="copyToClipboard(item.account)"
              >
                복사하기
              </button>
            </div>
            <div class="divider"></div>
            <div class="sub-contents">
              <p>{{ item.bank }}</p>
              <p>{{ item.account }}</p>
            </div>
          </div>
        </div>
        <button
          :class="selectedAccount"
          class="close-button"
          @click="isAccountInfoVisible = false"
        >
          닫기
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import ToastPopup from '../toastPopup/ToastPopup.vue';

export default defineComponent({
  components: {
    ToastPopup,
  },
  setup() {
    const state = reactive({
      showToast: false,
      toastMessage: '',

      isAccountInfoVisible: false,
      selectedAccount: '',
    });

    const accountItems = computed(() => {
      if (state.selectedAccount === 'groom') {
        return {
          groom: {
            title: '신랑 계좌',
            bank: '하나은행 (예금주 · 황태환)',
            account: '810-16-110498-707',
          },
          groomFather: {
            title: '신랑아버지 계좌',
            bank: '농협은행 (예금주 · 황남현)',
            account: '183-12-180111',
          },
          groomMother: {
            title: '신랑어머니 계좌',
            bank: '국민은행 (예금주 · 박경화)',
            account: '841502-04-204344',
          },
        };
      } else if (state.selectedAccount === 'bride') {
        return {
          groom: {
            title: '신부 계좌',
            bank: '하나은행 (예금주 · 김유라)',
            account: '235-910087-61107',
          },
          groomFather: {
            title: '신부아버지 계좌',
            bank: '신한은행 (예금주 · 김한광)',
            account: '110-083-403-522',
          },
          groomMother: {
            title: '신부어머니 계좌',
            bank: '하나은행 (예금주 · 이미혜)',
            account: '235-910028-81708',
          },
        };
      } else return {};
    });

    const openAccountInfo = (type: string) => {
      state.selectedAccount = type;
      state.isAccountInfoVisible = true;
    };

    const copyToClipboard = (accountNumber: string) => {
      navigator.clipboard.writeText(accountNumber).then(() => {
        state.showToast = true;
        state.toastMessage = '계좌번호가 복사되었습니다.';

        setTimeout(() => {
          state.showToast = false;
        }, 1000);
      });
    };

    return {
      ...toRefs(state),
      accountItems,
      openAccountInfo,
      copyToClipboard,
    };
  },
});
</script>
<style lang="scss" scoped>
.account-info-container {
  margin-top: 80px;

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    opacity: 0;
  }
  .slide-up-enter-to,
  .slide-up-leave-from {
    opacity: 1;
  }

  .account-info-popup {
    position: fixed;
    left: 50%;
    bottom: 50%;
    transform: translateX(-50%) translateY(50%);
    -webkit-transform: translateX(-50%) translateY(50%);
    min-width: 350px;
    min-height: 200px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    z-index: 1000;

    .close-button {
      width: 350px;
      height: 40px;
    }
  }

  .popup-wrapper {
    padding: 15px 0;
    display: flex;
    flex-direction: column;

    .text-button {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        border-radius: 10px;
        width: 80px;
        height: 30px;
        margin-left: auto;
      }
    }

    .divider {
      height: 1px;
      width: 100%;
      background-color: #ccc;
      margin-top: 10px;
    }

    .sub-contents {
      text-align: start;
      margin-right: auto;

      p {
        line-height: 10px;
        color: #000000;
        opacity: 0.7;
      }
    }
  }

  .account-info-wrapper {
    width: 335px;
    height: 40px;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .groom {
    background-color: #e6e7dc;
    border: 1px solid#dbddcd;
  }

  .bride {
    background-color: #f0eae1;
    border: 1px solid #ded6cc;
  }
}
</style>
