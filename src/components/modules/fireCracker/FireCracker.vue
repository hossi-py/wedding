<template>
  <div class="firecracker-container">
    <div
      v-for="paper in papers"
      :key="paper.id"
      :style="paper.style"
      class="paper"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'FireCracker',
  setup() {
    const papers = ref([] as any);

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#FF33F0'];

    onMounted(() => {
      for (let i = 0; i < 50; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * window.innerWidth;
        const animationDuration = 3 + Math.random() * 5 + 's';
        const endLeft = (Math.random() - 0.5) * 100 + left;
        const top = Math.random() * window.innerHeight - 100;

        papers.value.push({
          id: i,
          style: {
            backgroundColor: color,
            left: left + 'px',
            animationDuration: animationDuration,
            animationTimingFunction: 'cubic-bezier(.17,.67,.83,.67)',
            animationName: `fall, move${i % 2 === 0 ? 'Right' : 'Left'}`,
            top: top + 'px',
          },
          endLeft: endLeft + 'px',
        });
      }
    });

    return {
      papers,
    };
  },
});
</script>

<style scoped>
.paper {
  animation-name: fall;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 1000;
}

@keyframes fall {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes moveRight {
  to {
    transform: translateX(50px);
  }
}

@keyframes moveLeft {
  to {
    transform: translateX(-50px);
  }
}

.firecracker-container {
  position: relative;
  overflow: hidden;
}
</style>
