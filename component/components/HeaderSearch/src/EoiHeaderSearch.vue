<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

import RecursiveComponent from './RecursiveComponent.vue';
import { headerSearchEmits, headerSearchProps } from './index';

defineOptions({
  name: 'EoiHeaderSearch',
});
const props = defineProps(headerSearchProps);
const emits = defineEmits(headerSearchEmits);
const selectFlag = ref<boolean>(false);
const handlerFunc = (): void => {
  selectFlag.value = true;
};
const handleChange = (value: string) => {
  emits('change', value);
  // selectFlag.value = false;
};
</script>
<template>
  <div class="eoi-header-search">
    <el-icon class="icon" :size="15" @click="handlerFunc">
      <Search />
    </el-icon>
    <div v-show="selectFlag" class="select">
      <el-select :model-value="$route.meta.title" size="default" filterable placeholder="菜单搜索" @change="handleChange">
        <RecursiveComponent :data="data" />
      </el-select>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./index.scss" />
