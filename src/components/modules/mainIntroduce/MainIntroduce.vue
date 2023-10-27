<template>
  <div class="main-introduce-container">
    <div class="introduce-title">결혼합니다</div>
    <div class="image">
      <img src="~@/assets/images/holding-hands.png" />
    </div>
    <div class="introduce-wrapper">
      <div>
        <p>저희 결혼식에 귀한 시간 내어</p>
        <p>함께하실 여러분께 감사의 말씀을 전합니다.</p>
      </div>
      <div class="section">
        <p>그 동안 함께해주신 마음에 깊은 감사를 느끼며,</p>
        <p>저희의 새로운 시작을 여러분과 함께 기뻐하고 싶습니다.</p>
      </div>
      <div class="section">
        <p>여러분의 축복과 함께 더욱 뜻깊은 순간이 될 것을 기대합니다.</p>
        <p>곧 만나게 될 그날을 기다리며, 진심으로 감사드립니다.</p>
      </div>
      <div class="section">
        <div class="family">
          <span class="name">황남현</span>
          <span class="dot">·</span>
          <span class="name">박경화</span>
          <span class="sub">의 장남</span>
          <div class="couple-info">
            <span class="couple-name">태환 </span>
            <span>
              <img src="~@/assets/images/groom.png" />
            </span>
          </div>
        </div>
        <div class="family">
          <span class="name">김한광</span>
          <span class="dot">·</span>
          <span class="name">이미혜</span>
          <span class="sub">의 장녀</span>
          <div class="couple-info">
            <span class="couple-name">유라</span>
            <span>
              <img src="~@/assets/images/bride.png" />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="section call-wrapper">
          <div
            class="call-book"
            :class="{ fadeIn: showCallBook, fadeOut: !showCallBook }"
          >
            <div class="call-book-contents"></div>
          </div>
          <div class="call" @click="handleOnClick" :data-active="showCallBook">
            <div v-if="!showCallBook">
              <span><img src="~@/assets/images/phone.png" /></span>
              <span class="text">연락하기</span>
            </div>
            <div v-else>
              <span class="text back">돌아가기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const showCallBook = ref(false);

    const handleOnClick = () => {
      showCallBook.value = !showCallBook.value;
    };

    return {
      showCallBook,
      handleOnClick,
    };
  },
});
</script>

<style scoped>
.fadeIn {
  animation: fadeIn 1s forwards;
}

.fadeOut {
  animation: fadeOut 1s forwards;
}
</style>

<style lang="scss" scoped>
.main-introduce-container {
  .introduce-title {
    font-family: 'KCCChassam';
    font-size: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .image {
    img {
      width: 100%;
    }
  }

  .introduce-wrapper {
    p {
      font-size: 0.9rem;
    }
    font-weight: 500;
    .section {
      margin-top: 50px;
      .family {
        font-size: 0.9rem;
        padding-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .name {
        color: black;
      }

      .dot {
        margin-left: 10px;
        margin-right: 10px;
      }

      .sub {
        margin-left: 5px;
        font-size: 0.8rem;
      }

      .couple-info {
        display: flex;
        align-items: center;
        .couple-name {
          color: black;
          margin-left: 15px;
        }
        img {
          width: 35px;
          height: 35px;
        }
      }

      .call {
        background-image: linear-gradient(to right, #ffbc00, #ffbc00);
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 150px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 6px;

        .text {
          font-size: 0.9rem;
          padding-bottom: 2px;
        }
        .back {
          // color: #fff;
        }

        img {
          margin-right: 5px;
          width: 15px;
          height: 15px;
        }
      }
      .call[data-active='true'] {
        animation: fillFromLeft 1s forwards;
      }

      .call[data-active='false'] {
        animation: fillFromRight 1s forwards;
      }
    }
    .call-book {
      position: absolute;
      width: 95%;
      bottom: 80px;

      .call-book-contents {
        z-index: 10;
        height: 420px;
        border: 1px solid #b8b8b8;
        border-radius: 6px;
        background-color: #fffdf9;
      }
    }
    .call-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
