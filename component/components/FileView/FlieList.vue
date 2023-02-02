<script lang="ts" setup>
import { useDebounce, useSize } from 'ahooks-vue';
import { computed, ref } from 'vue';

import webIcon from '@/assets/icon/Slice41.png';
import pdfIcon from '@/assets/icon/Slice42.png';
import imgIcon from '@/assets/icon/Slice43.png';
import dirIcon from '@/assets/icon/Slice44.png';

defineOptions({
  name: 'FlieList',
});
const icon = {
  pdf: pdfIcon,
  doc: webIcon,
  docx: webIcon,
  dir: dirIcon,
  jpg: imgIcon,
  png: imgIcon,
  jpeg: imgIcon,
};
interface FlieListProps {
  data: any[];
  selectList: any[];
  selectConfig: any;
  config: (item: unknown) => any;
  checkAllText: string;
  select: unknown;
}

const props = withDefaults(defineProps<FlieListProps>(), {
  data: () => [],
  config: () => () => {},
  checkAllText: '全选',
  select: () => '',
  selectList: () => [],
  selectConfig: () => ({}),
});
const divRef = ref(null);
const size = useSize(divRef, {
  onChange: () => {
    // console.log('size change');
  },
});
const gap = computed(() => (size.width % 150) / Math.floor(size.width / 150) - 1 + 'px');
const debouncedValue = useDebounce(gap, { wait: 50 });
const checkAll = ref(false);
const isIndeterminate = ref(false);
const checkedCities = ref<any[]>([]);
const cities = computed<any[]>(() => props.data.map((item) => item.id));

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities.value : [];
  isIndeterminate.value = false;
  emits('checkChange', checkedCities.value);
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length;
  emits('checkChange', checkedCities.value);
};

const emits = defineEmits<(e: 'update:select' | 'checkChange' | 'clickChange', item: unknown) => void>();
const change = (v) => {
  emits('update:select', v);
};
const handleClick = (v) => {
  emits('clickChange', v);
};
</script>
<template>
  <div class="FlieList">
    <div ref="divRef">
      <div class="operationArea">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ props.checkAllText }}</el-checkbox>
        <el-select :model-value="props.select" @change="change">
          <el-option
            v-for="item in props.selectList"
            :key="item[selectConfig.key]"
            :value="item[selectConfig.value]"
            :label="item[selectConfig.title]"
          />
        </el-select>
      </div>
      <el-checkbox-group v-model="checkedCities" class="eoi-file-content" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in props.data" :key="config(item).id" class="eoi-file-item" :label="config(item).id">
          <div class="eoi-file-item" @dblclick="handleClick(item)">
            <img class="eoi-file-icon" :src="icon[config(item).type]" />
            <div>{{ config(item).title }}</div>
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.FlieList {
  margin-bottom: 20px;
  .operationArea {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 15px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(114, 12, 32, 0.3);
    &:deep(.el-input__inner) {
      width: unset !important;
    }
  }
}
.eoi-file-content {
  display: flex;
  flex-wrap: wrap;
  gap: v-bind(debouncedValue);
  &:deep(.el-checkbox) {
    margin-right: 0 !important;
  }
  .eoi-file-item {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    &:deep(.el-checkbox__input) {
      position: absolute;
      top: 0;
      left: 0;
    }
    .eoi-file-icon {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
