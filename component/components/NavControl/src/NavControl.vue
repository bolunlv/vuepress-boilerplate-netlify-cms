<script lang="ts" setup>
import { Expand } from '@element-plus/icons-vue';

import { navControlEmits, navControlProps } from './index.ts';
defineOptions({
  name: 'EoiNavControl',
});
const emits = defineEmits(navControlEmits);
const props = defineProps(navControlProps);
const handlerFunc = (event) => {
  emits('click', event);
};
</script>
<template>
  <div :class="'NavControlActive'">
    <el-icon :size="22" @click="handlerFunc">
      <Expand />
    </el-icon>
    <div class="down" />
  </div>
</template>
<style lang="scss" scoped src="./index.scss" />
