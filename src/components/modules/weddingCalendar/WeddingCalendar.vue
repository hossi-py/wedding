<template>
  <div class="calendar-container">
    <div class="header">우리의 특별한 날</div>
    <div class="date-highlight">
      <span class="prev-date more-blur">12</span>
      <span class="prev-date blur">1</span>
      <span class="current-date">2</span>
      <span class="next-date blur">3</span>
      <span class="next-date more-blur">4</span>
    </div>
    <div class="full-date">
      2024년 02월 03일 토요일<br />
      오후 6시
    </div>
    <div class="calendar">
      <div class="day-header holiday">일</div>
      <div class="day-header">월</div>
      <div class="day-header">화</div>
      <div class="day-header">수</div>
      <div class="day-header">목</div>
      <div class="day-header">금</div>
      <div class="day-header">토</div>
      <div class="day"></div>
      <div class="day"></div>
      <div class="day"></div>
      <div class="day"></div>
      <div class="day">1</div>
      <div class="day">2</div>
      <div class="day wedding-day">3</div>
      <div class="day holiday">4</div>
      <div class="day">5</div>
      <div class="day">6</div>
      <div class="day">7</div>
      <div class="day">8</div>
      <div class="day">9</div>
      <div class="day">10</div>
      <div class="day holiday">11</div>
      <div class="day">12</div>
      <div class="day">13</div>
      <div class="day">14</div>
      <div class="day">15</div>
      <div class="day">16</div>
      <div class="day">17</div>
      <div class="day holiday">18</div>
      <div class="day">19</div>
      <div class="day">20</div>
      <div class="day">21</div>
      <div class="day">22</div>
      <div class="day">23</div>
      <div class="day">24</div>
      <div class="day holiday">25</div>
      <div class="day">26</div>
      <div class="day">27</div>
      <div class="day">28</div>
      <div class="day">29</div>
    </div>

    <div class="footer">예식까지 남은 시간</div>

    <div class="countdown-wrapper">
      <div class="d-day">
        D-
        <div v-for="(digit, dayIndex) in splitNumber(daysLeft)" :key="dayIndex">
          <transition :name="'flip-transition-' + index" mode="out-in">
            <div class="digit" :key="digit">{{ digit }}</div>
          </transition>
        </div>
      </div>
      <div class="wedding-countdown">
        <div class="countdown-label">
          <!-- <div class="label">DAY</div> -->
          <div class="label">HOUR</div>
          <div class="label">MIN</div>
          <div class="label">SEC</div>
        </div>
        <div class="countdown-number">
          <div
            class="time-unit"
            v-for="(timeUnit, timeKey) in timeUnits"
            :key="timeKey"
          >
            <div v-for="(digit, index) in splitNumber(timeUnit)" :key="index">
              <transition :name="'flip-transition-' + index" mode="out-in">
                <div class="digit" :key="digit">
                  {{ digit }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'WeddingCountdown',

  setup() {
    const daysLeft = ref(0);
    const hoursLeft = ref(0);
    const minutesLeft = ref(0);
    const secondsLeft = ref(0);

    const targetDate = new Date(2024, 1, 3, 18, 0, 0);

    const splitNumber = (number: number) => {
      let str = String(number);
      if (number < 10) {
        str = '0' + str;
      }
      return Array.from(str).map(Number);
    };

    const timeUnits = computed(() => {
      return {
        // days: daysLeft.value,
        hours: hoursLeft.value,
        minutes: minutesLeft.value,
        seconds: secondsLeft.value,
      };
    });

    const updateCountdown = () => {
      const now = new Date();

      const diff = targetDate.getTime() - now.getTime();

      if (diff >= 0) {
        daysLeft.value = Math.floor(diff / (1000 * 60 * 60 * 24));
        hoursLeft.value = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        minutesLeft.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        secondsLeft.value = Math.floor((diff % (1000 * 60)) / 1000);
      }
    };

    let interval: number;

    onMounted(() => {
      updateCountdown();
      interval = setInterval(updateCountdown, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      daysLeft,
      hoursLeft,
      minutesLeft,
      secondsLeft,
      splitNumber,
      timeUnits,
    };
  },
});
</script>

<style lang="scss" scoped>
.calendar-container {
  margin-top: 80px;

  .header {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .date-highlight {
    display: flex;
    justify-content: center;
    align-items: center;

    .prev-date,
    .next-date {
      color: rgba(255, 165, 0, 0.5);
      font-size: 1.7rem;
      margin: 0 30px;
    }

    .blur {
      filter: blur(1.5px);
    }

    .more-blur {
      filter: blur(3px);
    }

    .current-date {
      font-size: 3.5rem;
    }
  }

  .full-date {
    margin: 20px 0;
    font-size: 0.8rem;
    line-height: 25px;
    font-weight: 600;
  }

  .calendar {
    font-size: 0.8rem;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
  }

  .day-header {
    font-weight: bold;
    text-align: center;
  }

  .day {
    text-align: center;
    padding: 8px;
  }

  .wedding-day {
    position: relative;
    display: inline-block;
    text-align: center;
    font-size: 0.8rem;
    font-weight: 800;
    z-index: 2;
  }

  .wedding-day::before {
    content: '♥';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    font-size: 24px;
    color: rgba(255, 165, 0, 0.6);
    -webkit-animation: fadeInOut 2s infinite;
    animation: fadeInOut 2s infinite;
    z-index: 1;
  }

  .holiday {
    color: #ff6b6b;
  }

  .countdown-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .d-day {
      margin-top: 10px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      color: #4e4c4b;
      font-size: 1rem;
      font-weight: 600;
      min-width: 12.5px;
    }

    .wedding-countdown {
      margin-top: 20px;
      width: 40%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .countdown-label,
      .countdown-number {
        display: contents;
      }

      .countdown-label {
        .label {
          padding-top: 20px;
          padding-bottom: 5px;
          font-size: 0.5rem;
          font-weight: 600;
        }
      }

      .countdown-number {
        .time-unit {
          display: flex;
          justify-content: center;

          .digit {
            color: #4e4c4b;
            font-size: 0.9rem;
            font-weight: 600;
            min-width: 12.5px;
          }
        }
      }
    }
  }

  .footer {
    margin-top: 20px;
    font-size: 0.7rem;
    font-weight: 600;
  }
}

.flip-transition-0-enter-active,
.flip-transition-1-enter-active,
.flip-transition-0-leave-active,
.flip-transition-1-leave-active {
  -webkit-animation-duration: 0.6s;
  animation-duration: 0.6s;
  -webkit-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  backface-visibility: hidden;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.flip-transition-0-enter,
.flip-transition-1-enter {
  -webkit-animation: flipIn 1s;
  animation: flipIn 1s;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}

.flip-transition-0-leave-to,
.flip-transition-1-leave-to {
  -webkit-animation-name: flipOut;
  animation-name: flipOut;
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
</style>
