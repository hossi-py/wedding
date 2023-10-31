<template>
  <div class="year-images-container">
    <button @click="closePopup">X</button>
    <div
      class="images-container"
      v-for="(item, index) in imageOptions"
      :key="`image-${index}`"
    >
      <div class="images-wrapper">
        <div
          class="image-item"
          v-for="imgName in item.images"
          :key="`item-${imgName}`"
        >
          <div class="image">
            <img v-lazy="`/wedding/gallery/${year}/${imgName}`" alt="Image" />
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
  toRefs,
} from 'vue';

export default defineComponent({
  props: {
    year: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      imageOptions: [
        {
          value: '2014',
          images: [
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
            '2014-0.jpg',
          ],
        },
      ],
    });

    const closePopup = () => {
      emit('close');
      document.body.classList.remove('no-scroll');
    };

    // 컴포넌트가 마운트 될 때 스크롤 잠금
    onMounted(() => {
      document.body.classList.add('no-scroll');
    });

    // 컴포넌트가 언마운트될 떄 스크롤 잠금 해제
    onBeforeUnmount(() => {
      document.body.classList.remove('no-scroll');
    });

    return { ...toRefs(state), closePopup };
  },
});
</script>

<style lang="scss" scoped>
.year-images-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  overflow: auto;

  .images-container {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 50px 20px 0 20px;
    box-sizing: border-box; // 전체 너비가 줄어도 padding 유지

    .images-wrapper {
      grid-template-columns: repeat(2, 1fr);
      display: grid;
      gap: 10px;

      .image-item {
        .image {
          width: auto;
          height: 270px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 6px;
            object-fit: cover;
          }
        }
      }
    }
  }

  button {
    position: fixed;
    background-color: transparent;
    font-size: 25px;
    color: #fff;
    top: 10px;
    right: 25px;
    border: none;
  }
}
</style>
