
<script setup lang="ts">
import { ElTabs, ElTabPane, TabPanelName } from 'element-plus';

interface TabsModel {
  label: string;
  name: string;
  disabled?: boolean;
}

interface Props {
  tabsData: TabsModel[];
  activeTab: string;
}
const props = withDefaults(defineProps<Props>(), {
  tabsData: () => [],
});

const $emit = defineEmits<(event: 'handleClick', val: TabPanelName) => void>();

const tabHandleChange = (val: TabPanelName) => {
  $emit('handleClick', val);
}

</script>

<template>
  <el-tabs
    :model-value="props.activeTab"
    @tab-change="tabHandleChange"
  >
    <el-tab-pane v-for="tab in props.tabsData"
                 :key="tab.name"
                 :label="tab.label"
                 :name="tab.name"
                 lazy
                 :disabled="tab.disabled">
      <slot :name="tab.name" />
    </el-tab-pane>
  </el-tabs>
</template>
