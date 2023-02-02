<script lang="ts" setup>
import { userControlEmits, userControlProps } from './index';

defineOptions({
  name: 'EoiUserControl',
});
const props = defineProps(userControlProps);
const emits = defineEmits(userControlEmits);
const handlerFc = (item) => {
  emits('change', item);
};
</script>
<template>
  <div class="UserControl">
    <el-popover popper-class="userSelect" placement="bottom" :width="'100%'" trigger="click" :teleported="false">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item v-if="!data?.length">
          <template #title>
            <span>暂无新分享知识</span>
          </template>
        </el-menu-item>

        <el-menu-item v-for="item in data" :key="item[config.keyword]" @click="handlerFc(item)">
          <!-- <el-icon :size="15">
            <component :is="Icon[item[config.icon]]" width="16px" height="16px" />
          </el-icon> -->
          <template #title>
            <span>{{ item[config.title] }}</span>
          </template>
        </el-menu-item>
      </el-menu>

      <template #reference>
        <div class="title">
          <slot name="avatar" />
          <div>
            <slot name="title" />
          </div>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<style lang="scss" scoped src="./index.scss" />
