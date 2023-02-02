<script lang="ts" setup>
import * as Icon from '@element-plus/icons-vue';

import { recursionPropsType } from './Recursion.ts';

defineOptions({
  name: 'Recursion',
});
const props = defineProps(recursionPropsType);
</script>
<template>
  <template v-for="item in data">
    <template v-if="!item.meta.hide">
      <el-sub-menu v-if="item?.children?.length" :key="item.path" :route="item.path" :index="item.path">
        <template #title>
          <el-icon :size="15">
            <component :is="Icon[item.meta.icon]" v-if="Icon[item.meta.icon]" width="16px" height="16px" />
            <eoi-svg-icon :name="item.meta.icon" width="16px" height="16px" />
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Recursion v-if="item?.children?.length" :data="item.children" />
      </el-sub-menu>
      <el-menu-item v-else :key="item.name" :route="item.path" :index="item.path">
        <el-icon :size="15">
          <component :is="Icon[item.meta.icon]" v-if="Icon[item.meta.icon]" width="16px" height="16px" />
          <eoi-svg-icon :name="item.meta.icon" width="16px" height="16px" />
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>
