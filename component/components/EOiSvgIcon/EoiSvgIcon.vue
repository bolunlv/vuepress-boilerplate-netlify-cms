<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'EoiSvgIcon',
});

interface EoiSvgIconProps {
  name: string;
  prefix: string;
  color?: string;
}

const props = withDefaults(defineProps<EoiSvgIconProps>(), {
  name: '',
  prefix: 'icon',
  color: 'red',
});
const pathName = computed(() => `#${props.prefix}-${props.name}`);
</script>
<template>
  <span class="eoi-svg">
    <svg class="" aria-hidden="true" style="display: inline; width: 1em; height: 1em">
      <use :xlink:href="pathName" />
    </svg>
  </span>
</template>
<style lang="scss">
// svg path {
//   fill: currentColor !important;
// }
</style>
