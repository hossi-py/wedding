<template>
  <img class="flower-leaf" :src="imageUrl" alt="leaf" :style="LeafStyle" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FlowerLeaf',

  setup() {
    const randomBetween = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const randomDelay = () => randomBetween(0, 12) + 's';
    const randomDegree = () => randomBetween(0, 360) + 'deg';
    const randomPosition = () => randomBetween(0, 100) + '%';
    const randomDuration = (min: number, max: number) =>
      randomBetween(min, max) + 's';

    const LeafStyle = computed(() => {
      return {
        '--fall-delay': randomDelay(),
        '--shake-delay': randomDelay(),
        '--shake-degree': randomDegree(),
        '--left-position': randomPosition(),
        '--translate-x': randomBetween(20, 80) + 'px',
        '--fall-duration': randomDuration(9, 16),
        '--shake-duration': randomDuration(2, 3),
      };
    });

    const imageUrl = computed(() => {
      const imageNumber = Math.floor(Math.random() * (6 - 1) + 1);
      return `/wedding/images/floral-leaf/floral-leaf-${imageNumber}.png`;
    });

    return {
      LeafStyle,
      imageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
.flower-leaf {
  z-index: 1000;
  left: var(--left-position);
  -webkit-animation-delay: var(--fall-delay), var(--shake-delay);
  animation-delay: var(--fall-delay), var(--shake-delay);
  position: fixed;
  top: -10%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: flowerleafs-fall, flowerleafs-shake;
  -webkit-animation-duration: var(--fall-duration), var(--shake-duration);
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: flowerleafs-fall, flowerleafs-shake;
  animation-duration: var(--fall-duration), var(--shake-duration);
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}

@-webkit-keyframes flowerleafs-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes flowerleafs-shake {
  0% {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
  50% {
    -webkit-transform: translateX(var(--translate-x))
      rotate(var(--shake-degree));
    transform: translateX(var(--translate-x)) rotate(var(--shake-degree));
  }
  100% {
    -webkit-transform: translateX(0px) rotate(0deg);
    transform: translateX(0px) rotate(0deg);
  }
}
@keyframes flowerleafs-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes flowerleafs-shake {
  0% {
    transform: translateX(0px) rotate(0deg);
  }
  50% {
    transform: translateX(var(--translate-x)) rotate(var(--shake-degree));
  }
  100% {
    transform: translateX(0px) rotate(0deg);
  }
}
</style>
