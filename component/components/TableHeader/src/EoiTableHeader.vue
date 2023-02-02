<script lang="ts" setup>
import { ref } from 'vue';

import BtnPopover from './btnPopover/BtnPopover.vue';
import { tableHeaderEmits, tableHeaderProps } from './index.ts';

defineOptions({
  name: 'EoiTableHeader',
});
const emits = defineEmits(tableHeaderEmits);
const props = defineProps(tableHeaderProps);
// 弹出层开关
const visible = ref(false);
// tree实例列表
let $tree = [];

const closeFc = () => {
  visible.value = false;
};
const openFc = () => {
  visible.value = true;
};
const mountRef = (el) => {
  if (el) {
    if ($tree.length >= props.data.length) {
      $tree = [];
    }
    $tree.push(el);
  }
};
const getTreeValue = (): string[] => {
  return $tree.map((item) => item.getCheckedKeys(true)).flat();
};
const handleChange = () => {
  emits('check', getTreeValue());
  closeFc();
};
const handleReset = () => {
  $tree.forEach((item) => {
    item.setCheckedKeys(props.recoveryValue, true, true);
  });
};
</script>
<template>
  <span class="EoiTableHeader">
    <BtnPopover placement="right-end" :visible="visible" @close="closeFc">
      <template v-for="item in data">
        <el-tree
          :ref="mountRef"
          :data="item"
          :indent="0"
          show-checkbox
          node-key="id"
          default-expand-all
          check-on-click-node
          :default-checked-keys="defaultValue"
        />
      </template>

      <template #operating>
        <div class="operating">
          <div>
            <el-button type="primary" @click="handleChange">确认</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </div>
          <el-button type="primary" @click="closeFc">取消</el-button>
        </div>
      </template>
      <template #reference>
        <span @click="openFc">
          <slot />
        </span>
      </template>
    </BtnPopover>
  </span>
</template>
<style lang="scss" scoped src="./index.scss" />
