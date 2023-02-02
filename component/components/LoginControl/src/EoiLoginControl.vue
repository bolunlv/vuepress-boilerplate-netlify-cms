<script lang="ts" setup>
import { SwitchButton } from '@element-plus/icons-vue';

import { loginControlEmits } from './index';
defineOptions({
  name: 'EoiLoginControl',
});
const emits = defineEmits(loginControlEmits);
const handleFc = (event) => {
  emits('click', event);
};
</script>
<template>
  <div class="EoiLoginControl" @click="handleFc">
    <template v-if="$slots.default"><slot /></template>
    <div v-else class="default">
      <el-icon>
        <SwitchButton class="icon" />
      </el-icon>
      <span>退出登录</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  transform: rotate(90deg);
}
.default {
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
