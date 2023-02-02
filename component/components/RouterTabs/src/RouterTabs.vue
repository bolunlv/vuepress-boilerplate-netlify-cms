<script lang="ts" setup>
import { useCacheRouterList } from '@eoi-plus/hooks';
import { useRoute, useRouter } from 'vue-router';

import { RouterTabsProps, routerTabsProps } from './index';

defineOptions({
  name: 'EoiRouterTabs',
});
const props: RouterTabsProps = defineProps(routerTabsProps);
const [routerList, remove] = useCacheRouterList(props.defaultPath);
const $route = useRoute();
const $router = useRouter();
const handleRemove = (e) => {
  const arr = Array.from(routerList);
  const index = Array.from(routerList).findIndex((item) => {
    return item[1].path === e;
  });
  const node = arr[index] || [];

  if (node[1].path === $route.path) {
    if (index <= 0) {
      $router.push(props.defaultPath);
    } else {
      $router.push((arr[index - 1] || [])[1].path);
    }
  }
  remove(node[0]);
};
const handleChange = (e) => {
  $router.push(e);
};
</script>
<template>
  <div class="eoi-router-tabs">
    <div class="eoi-router-tabs-list">
      <el-tabs :model-value="$route.path" type="card" class="demo-tabs" @tab-change="handleChange" @tab-remove="handleRemove">
        <el-tab-pane v-if="isDefault" :label="defaultTitle || '未定义'" :name="defaultPath || '/home'" />
        <el-tab-pane v-for="[key, item] in routerList" :key="key" closable :label="item?.meta?.title || '未定义'" :name="item.path" />
      </el-tabs>
    </div>
    <div class="eoi-router-tabs-operate">
      <slot name="operate" />
    </div>
  </div>
</template>
<style lang="scss" scoped src="./index.scss" />
