<template>
  <div class="account-info-container">
    <div class="header">마음 전하실 곳</div>
    <div class="account-info-wrapper">
      <div class="groom-family" @click="openAccountInfo('groom')">
        <div class="image-wrapper">
          <div><img src="~@/assets/images/groom.png" /></div>
          <div class="account-title groom">신랑측</div>
        </div>
        <div
          v-if="showGroomInfo"
          class="info-wrapper"
          :class="{ 'fade-in': showGroomInfo }"
        >
          <div class="family-wrapper">
            <!-- 신랑 영역 -->
            <div
              class="button-shape shape-groom"
              :class="{
                'shake-button': isGroomShake,
                fall: isGroomFall,
                up: isGroomFatherShrink || isGroomMotherShrink,
                'size-grow': isGroomGrow,
                'size-shrink': isGroomShrink,
              }"
              @click="handleButtonClick('groom', $event)"
            >
              <div v-if="!showGroomAccount">신랑</div>
              <div
                v-else
                class="contents"
                :class="{
                  'fade-in-content': showGroomAccount,
                  'fade-out-content': !showGroomAccount,
                }"
              >
                <div>{{ accountItems.groom }}</div>
                <div class="copy-button">
                  <button class="copy" type="button">
                    <img src="~@/assets/images/copy.png" alt="" />
                    <span class="text">계좌번호 복사</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="button-shape shape-groom"
              :class="{
                'shake-button': isGroomFatherShake,
                fall: isGroomFatherFall,
                up: isGroomShrink || isGroomMotherShrink,
                'size-grow': isGroomFatherGrow,
                'size-shrink': isGroomFatherShrink,
              }"
              @click="handleButtonClick('groom-f', $event)"
            >
              <div v-if="!showGroomFatherAccount">신랑 아버지</div>
              <div
                v-else
                class="contents"
                :class="{
                  'fade-in-content': showGroomFatherAccount,
                  'fade-out-content': !showGroomFatherAccount,
                }"
              >
                <div>{{ accountItems.groomFather }}</div>
                <div class="copy-button">
                  <button class="copy" type="button">
                    <img src="~@/assets/images/copy.png" alt="" />
                    <span class="text">계좌번호 복사</span>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="button-shape shape-groom"
              :class="{
                'shake-button': isGroomMotherShake,
                fall: isGroomMotherFall,
                up: isGroomShrink || isGroomFatherShrink,
                'size-grow': isGroomMotherGrow,
                'size-shrink': isGroomMotherShrink,
              }"
              @click="handleButtonClick('groom-m', $event)"
            >
              <div v-if="!showGroomMotherAccount">신랑 어머니</div>
              <div
                v-else
                class="contents"
                :class="{
                  'fade-in-content': showGroomMotherAccount,
                  'fade-out-content': !showGroomMotherAccount,
                }"
              >
                <div>{{ accountItems.groomMother }}</div>
                <div class="copy-button">
                  <button class="copy" type="button">
                    <img src="~@/assets/images/copy.png" alt="" />
                    <span class="text">계좌번호 복사</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bride-family" @click="openAccountInfo('bride')">
        <div class="image-wrapper">
          <div><img src="~@/assets/images/bride.png" /></div>
          <div class="account-title bride">신부측</div>
        </div>
        <div
          class="info-wrapper"
          :class="{ 'fade-in': showBrideInfo }"
          v-if="showBrideInfo"
        >
          <div class="family-wrapper">
            <div
              class="button-shape shape-bride"
              @click="handleButtonClick('bride', $event)"
            >
              신부
            </div>
            <div
              class="button-shape shape-bride"
              @click="handleButtonClick('bride-f', $event)"
            >
              신부 아버지
            </div>
            <div
              class="button-shape shape-bride"
              @click="handleButtonClick('bride-m', $event)"
            >
              신부 어머니
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  setup() {
    const state = reactive({
      accountItems: {
        groom: '황태환 · 카카오뱅크 1111-11-1111111',
        groomFather: '황남현 · 카카오뱅크 1111-11-1111111',
        groomMother: '박경화 · 카카오뱅크 1111-11-1111111',
      },

      isAnimating: false,

      showGroomInfo: false, // 신랑측 정보 열기
      showBrideInfo: false, // 신부측 정보 열기

      // 신랑
      isGroomShake: false, // 신랑 버튼 흔들림
      isGroomFall: false, // 신랑 버튼 떨어짐
      isGroomGrow: false, // 신랑 버튼 확대
      isGroomShrink: false, // 신랑 버튼 축소
      showGroomAccount: false, // 신랑 계좌 정보 상세

      // 신랑 아버지
      isGroomFatherShake: false,
      isGroomFatherFall: false,
      isGroomFatherGrow: false,
      isGroomFatherShrink: false,
      showGroomFatherAccount: false,

      // 신랑 어머니
      isGroomMotherShake: false,
      isGroomMotherFall: false,
      isGroomMotherGrow: false,
      isGroomMotherShrink: false,
      showGroomMotherAccount: false,
    });

    const openAccountInfo = (type: string) => {
      if (state.isAnimating) return;

      state.isAnimating = true;

      if (type === 'groom') {
        if (
          state.isGroomGrow ||
          state.isGroomFatherGrow ||
          state.isGroomMotherGrow
        ) {
          // 신랑 버튼이 확장되어 있을 경우
          if (state.isGroomGrow) {
            state.showGroomAccount = false; // 내용물 복구
            state.isGroomShrink = true; // 축소
            state.isGroomGrow = false;

            setTimeout(() => {
              // 축소 css 애니메이션 재사용
              state.isGroomShrink = false;
              // 다른 버튼 불러오기
              state.isGroomFatherFall = false;
              state.isGroomMotherFall = false;
            }, 1000);
          }

          if (state.isGroomFatherGrow) {
            state.showGroomFatherAccount = false;
            state.isGroomFatherShrink = true;
            state.isGroomFatherGrow = false;

            setTimeout(() => {
              state.isGroomFatherShrink = false;
              state.isGroomFall = false;
              state.isGroomMotherFall = false;
            }, 1000);
          }

          if (state.isGroomMotherGrow) {
            state.showGroomMotherAccount = false;
            state.isGroomMotherShrink = true;
            state.isGroomMotherGrow = false;

            setTimeout(() => {
              state.isGroomMotherShrink = false;
              state.isGroomFall = false;
              state.isGroomFatherFall = false;
            }, 1000);
          }
        } else {
          state.showGroomInfo = !state.showGroomInfo;
        }
      }

      // 신부
      else {
        //
      }
      setTimeout(() => {
        state.isAnimating = false;
      }, 1000);
    };

    const handleButtonClick = (type: string, event: Event) => {
      event.stopPropagation();

      if (state.isAnimating) return;

      state.isAnimating = true;

      switch (type) {
        case 'groom':
          state.isGroomFatherShake = true;
          state.isGroomMotherShake = true;

          setTimeout(() => {
            state.isGroomFatherShake = false;
            state.isGroomMotherShake = false;

            state.isGroomFatherFall = true;
            state.isGroomMotherFall = true;
          }, 500);

          setTimeout(() => {
            state.isGroomGrow = true;
            state.showGroomAccount = true;
          }, 1000);
          break;
        case 'groom-f':
          state.isGroomShake = true;
          state.isGroomMotherShake = true;

          setTimeout(() => {
            state.isGroomShake = false;
            state.isGroomMotherShake = false;

            state.isGroomFall = true;
            state.isGroomMotherFall = true;
          }, 500);

          setTimeout(() => {
            state.isGroomFatherGrow = true;
            state.showGroomFatherAccount = true;
          }, 1000);
          break;
        case 'groom-m':
          state.isGroomShake = true;
          state.isGroomFatherShake = true;

          setTimeout(() => {
            state.isGroomShake = false;
            state.isGroomFatherShake = false;

            state.isGroomFall = true;
            state.isGroomFatherFall = true;
          }, 500);

          setTimeout(() => {
            state.isGroomMotherGrow = true;
            state.showGroomMotherAccount = true;
          }, 1000);
          break;
        case 'bride':
          break;
        case 'bride-f':
          break;
        case 'bride-m':
          break;
      }

      setTimeout(() => {
        state.isAnimating = false;
      }, 1000);
    };

    return {
      ...toRefs(state),
      openAccountInfo,
      handleButtonClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.shake {
  animation: shake 0.5s;
  -webkit-animation: shake 0.5s;
}
.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
}

.fade-in-content {
  animation: fadeInContent 1s;
  -webkit-animation: fadeInContent 1s;
}

.fade-out-content {
  animation: fadeOutContent 1s;
  -webkit-animation: fadeOutContent 1s;
}

.shake-button {
  animation: shakeButton 0.5s ease-in-out;
  -webkit-animation: shakeButton 0.5s ease-in-out;
}

.fall {
  animation: fall 0.5s ease forwards;
  -webkit-animation: fall 0.5s ease forwards;
}

.up {
  animation: up 0.5s ease forwards;
  -webkit-animation: up 0.5s ease forwards;
}

.size-grow {
  animation: sizeGrow 1s forwards;
  -webkit-animation: sizeGrow 1s forwards;
  display: flex; // Flex 컨테이너 설정
  justify-content: center; // 가로 방향 중앙 정렬
  align-items: center; // 세로 방향 중앙 정렬
}

.size-shrink {
  animation: sizeShrink 1s forwards;
  -webkit-animation: sizeShrink 1s forwards;
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
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          border-radius: 10px;
          width: 90px;
          height: 40px;
          font-size: 0.85rem;
        }

        .shape-groom {
          color: #6a6e4f;
          font-weight: 600;
          border-color: #92975d;

          .contents {
            color: #000000;
            display: flex;
            flex-direction: column;
          }
        }
        .shape-bride {
          color: #8c6e47;
          font-weight: 600;
          border-color: #a7967d;
        }

        .copy-button {
          display: flex;
          justify-content: center;
          align-items: center;

          .copy {
            display: flex;
            justify-content: center;
            align-items: center;

            .text {
              margin-left: 5px;
              font-size: 0.7rem;
              font-weight: 600;
              font-family: 'SUIT-Regular';
            }
          }

          button {
            margin-top: 15px;
            width: 140px;
            height: 30px;
            background-color: rgb(255, 255, 255);
            border: 1px solid transparent;
            border-radius: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
