<script lang="ts" setup>
import { headerSearchProps } from './index.ts';
defineOptions({
  name: 'RecursiveComponent',
});
const props = defineProps(headerSearchProps);
</script>
<template>
  <template v-for="item in data">
    <el-option v-if="!item?.children?.length" :key="item.path" :label="item.meta.title" :value="item.path" />
    <RecursiveComponent v-else :data="item.children" />
  </template>
</template>
<style lang="scss" scoped src="./index.scss" />
