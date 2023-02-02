<script lang="ts" setup>
import { CloseBold } from '@element-plus/icons-vue';

import { btnPopoverEmits, btnPopoverProps } from './index.ts';
defineOptions({
  name: 'BtnPopover',
});
const emits = defineEmits(btnPopoverEmits);
const props = defineProps(btnPopoverProps);
const handleFc = (): void => {
  emits('close');
};
</script>
<template>
  <el-popover :teleported="false" width="unset" placement="bottom-start" :visible="visible">
    <div class="constent">
      <slot />
      <div class="close" @click="handleFc">
        <el-icon><CloseBold /></el-icon>
      </div>
    </div>
    <slot name="operating" />
    <template #reference>
      <slot name="reference" />
    </template>
  </el-popover>
</template>
<style lang="scss" scoped src="./index.scss" />
