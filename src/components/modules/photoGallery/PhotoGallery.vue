<template>
  <div class="photo-gallery">
    <div class="photo-gallery-title">갤러리</div>
    <div class="select-box">
      <div>
        <p v-if="selectedValues.length === 0" id="promptMessage">
          터치하여 연도 선택
        </p>
        <p v-else style="opacity: 0">&nbsp;</p>
      </div>
      <select-box
        :options="yearOptions || []"
        :placeholder="'연도 선택'"
        :value="selectedValues"
        @change="handleOptionChange"
      ></select-box>
    </div>

    <div v-if="selectedValues.length === 0">
      <p>우리의 소중한 순간, 함께 기억해 주실래요?</p>
    </div>
    <div
      v-else
      class="photo-gallery-items"
      v-for="(item, index) in galleryItems"
      :key="`year-${index}`"
    >
      <p class="year" v-if="year !== 'ALL'">{{ item.year }}년, 우리</p>
      <div class="gallery-wrapper">
        <div class="gallery-inner">
          <div
            class="gallery-item"
            v-for="imgName in item.images"
            :key="imgName"
          >
            <div class="image">
              <img :src="`/wedding/gallery/${imgName}.png`" alt="Image" />
            </div>
            <div class="arch"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import SelectBox from '../selectBox/SelectBox.vue';

export default defineComponent({
  name: 'PhotoGallery',
  components: { SelectBox },
  setup() {
    const state = reactive({
      yearOptions: [
        { label: '전체', value: 'ALL' },
        {
          label: '2014',
          value: '2014',
          images: [
            '2014-0',
            '2014-1',
            '2014-2',
            '2014-3',
            '2014-4',
            '2014-5',
            '2014-6',
            '2014-7',
            '2014-8',
          ],
        },
        { label: '2015', value: '2015', images: ['2015-0', '2015-1'] },
        {
          label: '2016',
          value: '2016',
          images: ['2016-0', '2016-1', '2016-2'],
        },
        { label: '2017', value: '2017', images: ['2017-0'] },
        { label: '2018', value: '2018', images: ['2018-0'] },
        { label: '2019', value: '2019', images: ['2019-0'] },
        { label: '2020', value: '2020', images: ['2020-0'] },
        { label: '2021', value: '2021', images: ['2021-0'] },
        { label: '2022', value: '2022', images: ['2022-0'] },
        { label: '2023', value: '2023', images: ['2023-0'] },
      ],
      selectedValues: [] as string[],
    });

    const galleryItems = computed(() => {
      return state.selectedValues
        .map((year) => {
          const option = state.yearOptions.find((o) => o.value === year);
          if (option && option.images) {
            return {
              year: option.value,
              images: option.images,
            };
          }
          return null;
        })
        .filter(Boolean);
    });

    const handleOptionChange = (value: string[]) => {
      // 전체를 포함하고 있다면
      if (value.includes('ALL')) {
        state.selectedValues = state.yearOptions.map((option) => option.value);
      } else {
        state.selectedValues = value;
      }
    };

    return {
      ...toRefs(state),
      galleryItems,
      handleOptionChange,
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  font-family: 'HakgyoansimWoojuR';
  font-weight: bold;
}
.photo-gallery-title {
  font-family: 'yg-jalnan';
  font-size: 16px;
}
.select-box {
  /* display: flex; */
  margin-left: auto;
  margin-right: 15px;
}

.photo-gallery-items {
  margin-bottom: 20px; // 각 연도별 갤러리 사이의 간격

  .year {
    display: flex;
    margin-right: auto;
    margin-left: 10px;
  }

  .gallery-wrapper {
    overflow-x: auto; // 좌우로 스크롤 가능하게 설정
    white-space: nowrap; // 갤러리 아이템들을 한 줄에 표시
    -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤 경험을 위한 설정

    .gallery-inner {
      display: flex; // 아이템들을 행 방향으로 배열
      align-items: flex-start;

      .gallery-item {
        position: relative;
        flex: 0 0 auto; // 아이템의 너비를 내용에 맞게 조절
        margin-right: 10px; // 이미지 사이의 간격
        &:before {
          position: absolute;
          top: 0;
          left: -1px;
          display: block;
          content: '';
          width: 2px;
          height: 360px;
          background-color: #fffaf0;
          z-index: 11;
        }
        &:after {
          position: absolute;
          top: 0;
          right: -1px;
          display: block;
          content: '';
          width: 2px;
          height: 360px;
          background-color: #fffaf0;
          z-index: 11;
        }

        .arch {
          position: absolute;
          top: 0;
          left: 0;
          width: 240px;
          height: 360px;
          background-image: url('~@/assets/images/arch.png');
          background-repeat: no-repeat;
          background-size: 240px auto;
          background-position: top left;
          z-index: 10;
        }
      }
    }
  }

  .image {
    width: 240px; // 원하는 이미지 너비 설정
    height: 360px; // 원하는 이미지 높이 설정
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0.3;
  }
  10% {
    opacity: 0.4;
  }
  20% {
    opacity: 0.5;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.85;
  }
  70% {
    opacity: 0.9;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
}

#promptMessage {
  font-family: 'HakgyoansimWoojuR';
  font-weight: bolder;
  font-size: 15px;
  animation: fadeInOut 1.5s infinite;
  text-align: end;
  margin-right: 15px;
}
</style>
