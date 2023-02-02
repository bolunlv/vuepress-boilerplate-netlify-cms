<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { useRoute } from 'vue-router';

import { sidNavigationPropsType } from './Recursion.ts';
import Recursion from './Recursion.vue';

defineOptions({
  name: 'EoiSideNavigation',
});

const props = defineProps(sidNavigationPropsType);
const $route = useRoute();
const $solts = useSlots();
const layoutLogo = computed(() => ($solts.logoTitle ? 'flex-start' : 'center'));
</script>
<template>
  <div class="EoiSideNavigation">
    <el-menu unique-opened :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" router>
      <div>
        <router-link :to="logoPath" class="logo">
          <slot class="logo1" name="logo" />
          <slot v-if="!isCollapse" name="logoTitle" />
        </router-link>
      </div>
      <Recursion :data="data" />
    </el-menu>
  </div>
</template>
<!--<style lang="scss" scoped src="./index.scss" />-->
<style scoped lang="scss">
.EoiSideNavigation {
  width: 100%;
  height: 100%;
  .logo {
    padding-left: 14px;
    padding-right: 14px;
    transition: none;
    height: 59px;
    width: 100%;
    display: flex;
    justify-content: v-bind(layoutLogo);
    align-items: center;
    gap: 10px;
    background: var(--theme-color);
    border-right: 1px solid var(--theme-header-border);
    cursor: pointer;
    position: absolute;
    top: 0;
    .logo1 {
      position: absolute;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    border-right: none;
  }
  .el-menu-vertical-demo {
    height: 100%;
    position: relative;
    padding-top: 59px;
    // overflow-y: auto;
    box-sizing: border-box;
    &:deep(.el-menu-item.is-active) {
      background: var(--theme-menu-active);
      border-right: 2px solid var(--theme-menu-border-active);
    }
  }
  &:deep(.el-menu-item.is-active) {
    font-weight: 700;
  }
}
</style>
