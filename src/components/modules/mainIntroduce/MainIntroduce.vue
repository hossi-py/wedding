<template>
  <div class="main-introduce-container">
    <div class="introduce-title">결혼합니다</div>
    <div class="image">
      <img src="~@/assets/images/holding-hands.png" />
    </div>
    <div class="introduce-wrapper">
      <div class="text-medium">
        <p>2014년 여름,</p>
        <p>처음 만나 사랑을 시작한 곳에서</p>
      </div>
      <div class="section text-medium">
        <p>2024년 겨울,</p>
        <p>사랑의 결실을 맺으려합니다.</p>
      </div>
      <div class="section text-medium">
        <p>저희 두 사람의 10주년, 그리고 결혼식에 오셔서</p>
        <p>따뜻하게 축복해주시면 감사하겠습니다.</p>
      </div>
      <div class="section text-medium">
        <p>화환은 정중히 사양합니다.</p>
      </div>
      <div class="section">
        <div class="family text-medium">
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
        <div class="family text-medium">
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
            v-if="showCallBook"
            class="call-book"
            :class="{ fadeIn: showCallBook, fadeOut: !showCallBook }"
            ref="callBookRef"
            @click.stop
          >
            <div class="call-book-contents">
              <div class="title">연락하기</div>
              <div class="content">
                <div
                  class="content-items"
                  v-for="(item, index) in callBookItems"
                  :key="`item-${index}`"
                >
                  <span class="role">{{ item.role }}</span>
                  <span class="name">{{ item.name }}</span>
                  <div v-if="item.role" class="image">
                    <a
                      class="img-wrapper"
                      :href="`tel:${item.call}`"
                      @click="checkUserAgent"
                      ><img :src="callImage" alt="Image"
                    /></a>
                    <a
                      class="img-wrapper"
                      :href="`sms:${item.message}`"
                      @click="checkUserAgent"
                      ><img :src="messageImage" alt="Image"
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="call"
            @click="handleOnClick($event)"
            :data-active="showCallBook"
          >
            <div v-if="!showCallBook" class="call-contents">
              <span><img src="~@/assets/images/phone.png" /></span>
              <span class="text">연락하기</span>
            </div>
            <div v-else class="call-contents">
              <span><img src="~@/assets/images/back.png" /></span>
              <span class="text back">뒤로가기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from 'vue';

import { isiOS, isAndroid } from '@/utils';

export default defineComponent({
  setup() {
    const state = reactive({
      callBookItems: [
        {
          role: '신랑',
          name: '황태환',
          call: '01071111755',
          message: '01071111755',
        },
        {
          role: '신랑 아버지',
          name: '황남현',
          call: '01045343803',
          message: '01045343803',
        },
        {
          role: '신랑 어머니',
          name: '박경화',
          call: '01096628996',
          message: '01096628996',
        },
        { role: '', name: '' },
        {
          role: '신부',
          name: '김유라',
          call: '01031599804',
          message: '01031599804',
        },
        {
          role: '신부 아버지',
          name: '김한광',
          call: '01037726661',
          message: '01037726661',
        },
        {
          role: '신부 어머니',
          name: '이미혜',
          call: '01020719804',
          message: '01020719804',
        },
      ],
      callImage: require('@/assets/images/phone.png'),
      messageImage: require('@/assets/images/message.png'),
    });

    const showCallBook = ref(false);
    const callBookRef = ref<HTMLElement | null>(null);

    const handleOnClick = (event: Event) => {
      event.stopPropagation();
      showCallBook.value = !showCallBook.value;
    };

    const handleOutsideClick = (event: Event) => {
      if (
        callBookRef.value &&
        !callBookRef.value.contains(event.target as Node)
      ) {
        showCallBook.value = false;
      }
    };

    const checkUserAgent = (event: Event) => {
      const imgWrapper = event.currentTarget as HTMLElement;
      imgWrapper.classList.add('animate-click');
      imgWrapper.addEventListener(
        'animationend',
        () => {
          imgWrapper.classList.remove('animate-click');
        },
        { once: true },
      );

      if (!isiOS && !isAndroid) {
        alert('이 기능은 모바일 장치에서만 사용할 수 있습니다.');
        event?.preventDefault();
      } else {
        //
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutsideClick);
    });

    return {
      ...toRefs(state),
      showCallBook,
      callBookRef,
      handleOnClick,
      checkUserAgent,
    };
  },
});
</script>

<style scoped>
::v-deep .animate-click {
  animation: clickAnimation 0.3s ease;
  -webkit-animation: clickAnimation 0.3s ease;
}
</style>

<style lang="scss" scoped>
.fadeIn {
  -webkit-animation: fadeIn 1s forwards;
  animation: fadeIn 1s forwards;
}

.fadeOut {
  -webkit-animation: fadeOut 1s forwards;
  animation: fadeOut 1s forwards;
}

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
    font-weight: 500;
    .section {
      margin-top: 50px;
      .family {
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
    }
    .call-wrapper {
      position: relative;
      display: flex;
      justify-content: center;

      .call-book {
        z-index: 100;
        position: absolute;
        width: 90%;
        bottom: 80px;

        .call-book-contents {
          height: 420px;
          border-radius: 5px;
          background-color: #fffdf9;

          .title {
            padding: 10px 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            background-color: rgba(255, 165, 0, 0.5);
          }

          .content {
            border-left: 1px solid rgba(255, 165, 0, 0.5);
            border-right: 1px solid rgba(255, 165, 0, 0.5);
            border-bottom: 1px solid rgba(255, 165, 0, 0.5);
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            padding-top: 20px;
            font-size: 1rem;

            .content-items {
              display: flex;
              align-items: center;
              margin-bottom: 25px;

              .role {
                flex: 0.6 1 0%;
              }

              .name {
                flex: 0.5 1 0%;
              }

              .image {
                z-index: 100;
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 0.8 1 0%;

                .img-wrapper {
                  -webkit-tap-highlight-color: transparent;
                  margin-left: 20px;
                  width: 30px;
                  height: 30px;
                  border-radius: 15px;
                  background-color: rgba(255, 165, 0, 0.5);
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  img {
                    width: 15px;
                    height: 15px;
                  }
                }
              }
            }
          }
        }
      }
      .call {
        cursor: pointer;
        position: relative;
        z-index: 100;
        background-image: linear-gradient(
          to right,
          rgba(255, 165, 0, 0.5),
          rgba(255, 165, 0, 0.5)
        );

        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 150px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 6px;
        -webkit-tap-highlight-color: transparent;

        .call-contents {
          display: flex;
        }

        .text {
          font-size: 0.9rem;
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
        -webkit-animation: fillFromLeft 1s forwards;
        animation: fillFromLeft 1s forwards;
      }

      .call[data-active='false'] {
        -webkit-animation: fillFromRight 1s forwards;
        animation: fillFromRight 1s forwards;
      }
    }
  }
}
</style>
