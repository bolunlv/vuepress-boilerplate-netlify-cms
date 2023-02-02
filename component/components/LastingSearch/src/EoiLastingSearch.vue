<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { useCacheList } from '@eoi-plus/hooks';
import { ref } from 'vue';

import { eoiLastingSearchEmits } from './index';

defineOptions({
  name: 'EoiLastingSearch',
});

interface EoiLastingSearchProps {
  title: string; // 标题 必须全局唯一 最后用模块名前缀
  placeholder?: string;
}

const props = withDefaults(defineProps<EoiLastingSearchProps>(), {
  title: '标题',
  placeholder: '请输入搜索内容',
});
const emits = defineEmits(eoiLastingSearchEmits);
const { cacheList, add, clear } = useCacheList(props.title);
const inputValue = ref('');
const inputRef = ref(null);
const handleChange = (v) => {
  emits('change', v);
  add(v);
  inputRef?.value?.blur();
};
const handleClear = () => {
  clear();
};
const handleFocus = () => {
  inputValue.value = '';
};
const handleChangeClick = (v: string) => {
  inputValue.value = v;
  handleChange(v);
};
</script>
<template>
  <div class="eoi-header-search">
    <!-- <el-card class="box-card"> -->
    <div class="eoi-header-search-content">
      <template v-if="$slots.advanced">
        <slot name="advanced" />
      </template>
      <span class="form-title">关键字</span>
      <el-input
        ref="inputRef"
        v-model="inputValue"
        size="large"
        :placeholder="placeholder"
        :suffix-icon="Search"
        @focus="handleFocus"
        @change="handleChange"
      />
    </div>
    <div class="list">
      <div class="left">
        <div v-for="item in cacheList.value" :key="item" :class="inputValue === item ? 'active' : ''" @click="handleChangeClick(item)">
          {{ item }}
        </div>
      </div>
      <div class="right" @click="handleClear">清空搜索历史</div>
    </div>
    <!-- </el-card> -->
  </div>
</template>
<style lang="scss" scoped src="./index.scss" />
