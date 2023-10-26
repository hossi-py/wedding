<template>
  <div class="select-box">
    <!-- 셀렉트 박스 영역 -->
    <div class="selected" @click="toggleDropdown">
      <div class="selected-value">
        <div
          v-for="(option, index) in selectedOptions"
          :key="index"
          :class="{
            'selected-option': option.type === 'option',
            'additional-option': option.type === 'additional',
          }"
        >
          {{ option.label }}
        </div>
      </div>
      <span class="arrow"></span>
    </div>
    <!-- 옵션 영역 -->
    <div class="options" v-show="showDropdown">
      <div class="option" v-for="(option, index) in options" :key="index">
        <input
          class="custom-checkbox"
          type="checkbox"
          v-model="selectedValues"
          :id="option.value"
          :value="option.value"
          :checked="selectedValues.includes(option.value)"
          @change="handleOptionChange"
        />
        <label :for="option.value"></label>
        <label :for="option.value" class="option-label" :title="option.label">{{
          option.label
        }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue';

type optionType = {
  label: string;
  value: string;
};

export default defineComponent({
  name: 'SelectBox',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array as () => optionType[],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const state = reactive({});

    const showDropdown = ref(false); // option 영역을 보여줄 지 결정
    const selectedValues = ref(props.value); // 선택된 값들

    const selectedOptions = computed(() => {
      // option 선택 제어
      const selectedOptionLabels = selectedValues.value.map((value) =>
        props.options.find((option: optionType) => option?.value === value),
      );

      // selectbox 자체에 노출되는 값
      if (selectedOptionLabels.length === 0) {
        return [{ type: 'placeholder', label: `${props.placeholder}` }];
      } else if (selectedOptionLabels.length === 1) {
        return [{ type: 'option', label: selectedOptionLabels[0]?.label }];
      } else {
        return [
          { type: 'option', label: selectedOptionLabels[0]?.label },
          { type: 'additional', label: `+ ${selectedOptionLabels.length - 1}` },
        ];
      }
    });

    const handleOptionChange = (e: any) => {
      e.stopPropagation(); // 이벤트 버블링 처리 => 자식 요소 이벤트가 부모까지 전파

      // 전체 선택
      if (e.target.value === 'ALL') {
        // 전체 상태를 눌렀을 때, 체크 여부에 따른 체크 제어
        const changedValues = e.target.checked
          ? props.options.map((option) => option.value)
          : [];

        emit('change', changedValues);
      } else {
        const optionsValue = props.options.map(({ value }) => value);

        if (optionsValue.includes('ALL')) {
          const isAllChecked =
            selectedValues.value.filter((value) => value !== 'ALL').length ===
            optionsValue.length - 1;

          if (isAllChecked) {
            emit('change', optionsValue);
          } else {
            emit(
              'change',
              selectedValues.value.filter((value) => value !== 'ALL'),
            );
          }
        } else {
          emit('change', selectedValues.value);
        }
      }
    };

    // 셀렉트박스 영역 클릭 => options를 보여준다.
    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    // 셀렉트 박스 범위 밖 체크
    const onDocumentClick = (event: Event) => {
      const targetElement = event.target as Node;
      const selectBoxElement = document.querySelector('.select-box');

      if (selectBoxElement && selectBoxElement.contains(targetElement)) {
        //
      } else {
        showDropdown.value = false;
      }
    };

    // 상태값 변경 감지
    watch(
      () => props.value,
      (newValue) => {
        selectedValues.value = newValue;
      },
    );

    return {
      ...toRefs(state),
      showDropdown,
      selectedValues,
      selectedOptions,
      handleOptionChange,
      toggleDropdown,
      onDocumentClick,
    };
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  },
});
</script>

<style scoped>
.select-box {
  max-width: 180px;
  position: relative;
  user-select: none;
}

.selected {
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 17px 1px 10px;
  border-radius: 5px;
  font-size: 16px;
  height: 2.5rem;
  box-sizing: border-box;
  width: 180px;
  max-width: 100%;
}

.selected-value {
  display: flex;
  align-items: center;
  font-family: 'HakgyoansimWoojuR';
  font-weight: bold;
}

.arrow {
  margin-left: auto;
  border: solid #333;
  border-width: 0 2px 2px 0;
  padding: 3px;
  transform: rotate(45deg);
  z-index: 2;
}

.label {
  font-size: 12px;
}

.options {
  max-height: 180px;
  width: 180px;
  background-color: #fff;
  position: absolute;
  left: 0;
  right: 0;
  border: 1px solid #ccc;
  border-top: none;
  padding: 0.5rem 0;
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  overflow-y: auto;
}

.option {
  display: flex;
  align-items: center;
  padding: 0.25rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.additional-option {
  padding: 3px 5px 3px 5px;
  background-color: #ffbc00;
  border-radius: 10px;
  font-size: 12px;
  margin-right: 5px;
  font-family: 'KBFGDisplayM';
  margin-left: 2px;
}

.option-label {
  font-family: 'HakgyoansimWoojuR';
  font-weight: bold;
  cursor: pointer;
  position: relative;
  display: block;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.option > * {
  margin-top: 10px;
}

.option input {
  margin-right: 0.5rem;
}

.option:hover {
  background-color: #f1f1f1;
}

/* 커스텀 체크박스 */
.custom-checkbox {
  display: none;
}

.custom-checkbox + label {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  position: relative;
  background: url(~@/assets/images/check-none.png) 0 0 no-repeat;
  background-size: cover;
  cursor: pointer;
  vertical-align: top;
}

.custom-checkbox:checked + label::before {
  content: '';
  width: 20px;
  height: 20px;
  background: url(~@/assets/images/check.png) center no-repeat;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
