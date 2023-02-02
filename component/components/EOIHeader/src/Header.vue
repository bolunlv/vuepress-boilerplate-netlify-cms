<script lang="ts" setup>
import { h, useSlots } from 'vue';

defineOptions({
  name: 'EoiHeader',
});
const slots = useSlots().default();
const navControl = h(slots.find((item: any) => item.type.name === 'EoiNavControl') || 'template');
const headerSearch = h(slots.find((item: any) => item.type.name === 'EoiHeaderSearch') || 'template');
const loginControl = h(slots.find((item: any) => item.type.name === 'EoiLoginControl') || 'template');
</script>
<template>
  <div class="eoi-header-layout">
    <div class="eoi-header-left">
      <div class="nav-control-layout">
        <nav-control />
      </div>
      <div class="eoi-header-title">
        <slot name="title">项目标题</slot>
      </div>
    </div>
    <div class="eoi-header-right">
      <div>
        <header-search />
      </div>
      <div class="userControl">
        <slot name="userControl" />
      </div>
      <div>
        <loginControl />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./Header.scss" />
