<template>
  <div class="account-info-container">
    <div class="header">마음 전하실 곳</div>
    <div class="account-info-wrapper">
      <div
        class="groom-family"
        :class="{ shake: isOpenGroomInfo }"
        @click="openAccountInfo('groom')"
      >
        <div class="image-wrapper">
          <div><img src="~@/assets/images/groom.png" /></div>
          <div class="account-title groom">신랑측</div>
        </div>
        <div
          class="info-wrapper"
          :class="{ fadeIn: showGroomInfo }"
          v-if="!showGroomInfo"
        >
          <span>어떤 분에게 마음을 전하실건가요?</span>
          <div class="family-wrapper">
            <div class="button-shape">
              <span class="shape-groom">신랑</span>
            </div>
            <div class="button-shape">
              <span class="shape-groom">신랑 아버지</span>
            </div>
            <div class="button-shape">
              <span class="shape-groom">신랑 어머니</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bride-family"
        :class="{ shake: isOpenBrideInfo }"
        @click="openAccountInfo('bride')"
      >
        <div class="image-wrapper">
          <div><img src="~@/assets/images/bride.png" /></div>
          <div class="account-title bride">신부측</div>
        </div>
        <div
          class="info-wrapper"
          :class="{ fadeIn: showBrideInfo }"
          v-if="showBrideInfo"
        >
          <span>어떤 분에게 마음을 전하실건가요?</span>
          <div class="family-wrapper">
            <div>신부</div>
            <div>신부 아버지</div>
            <div>신부 어머니</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const isOpenGroomInfo = ref(false);
    const isOpenBrideInfo = ref(false);
    const showGroomInfo = ref(false);
    const showBrideInfo = ref(false);

    const openAccountInfo = (type: string) => {
      if (type === 'groom') {
        isOpenGroomInfo.value = !isOpenGroomInfo.value;
      } else {
        isOpenBrideInfo.value = !isOpenBrideInfo.value;
      }
    };

    watch(
      () => isOpenGroomInfo.value,
      (isOpenGroomInfo) => {
        if (isOpenGroomInfo) {
          setTimeout(() => {
            showGroomInfo.value = true;
          }, 600);
        } else {
          showGroomInfo.value = false;
        }
      },
    );

    watch(
      () => isOpenBrideInfo.value,
      (isOpenBrideInfo) => {
        if (isOpenBrideInfo) {
          setTimeout(() => {
            showBrideInfo.value = true;
          }, 600);
        } else {
          showBrideInfo.value = false;
        }
      },
    );

    return {
      isOpenGroomInfo,
      isOpenBrideInfo,
      showGroomInfo,
      showBrideInfo,
      openAccountInfo,
    };
  },
});
</script>

<style lang="scss" scoped>
.shake {
  animation: shake 0.5s 1;
  -webkit-animation: shake 0.5s 1;
}
.fadeIn {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}

.account-info-container {
  margin-top: 80px;

  .header {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .account-info-wrapper {
    .groom-family,
    .bride-family {
      width: 335px;
      min-height: 55px;
      margin: auto;
    }

    .groom-family {
      background-color: #e6e7dc;
      border: 1px solid #dbddcd;
      margin-bottom: 15px;
    }

    .bride-family {
      background-color: #f0eae1;
      border: 1px solid #ded6cc;
    }

    .image-wrapper {
      display: flex;
      align-items: center;
      transform: translateY(30%);
      -webkit-transform: translateY(30%);
      padding-left: 10px;

      .account-title {
        font-size: 0.85rem;
      }
      .groom {
        color: #6a6e4f;
      }
      .bride {
        color: #8c6e47;
      }

      img {
        padding-right: 5px;
        width: 30px;
        height: 30px;
      }
    }

    .info-wrapper {
      margin-top: 20px;

      span {
        font-size: 0.9rem;
      }

      .family-wrapper {
        display: flex;
        justify-content: space-around;
        margin: auto;
        margin-top: 30px;
        padding-bottom: 25px;

        .button-shape {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          border-radius: 10px;
          width: 90px;
          height: 40px;
          font-size: 0.9rem;

          .shape-groom {
            border-color: #92975d;
          }
        }
      }
    }
  }
}
</style>
