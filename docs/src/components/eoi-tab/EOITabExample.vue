<template>
  <EOITab :active-tab="activeTab" :tabs-data="tabsData" @handle-click="handleClick">
    <template v-for="(screen, index) in screenData" :key="index" #[screen.name]>
        <component :is="screen.type" />
    </template>
  </EOITab>
</template>
<script setup lang="ts">
  import { EOITab, AutoComplete } from '@eoi-plus/components'
  import { ref, markRaw } from 'vue'
  import { TabPanelName, ElInput, ElDatePicker } from 'element-plus';

  const screenData = ref([
   {
      name: 'Tab1',
      type: markRaw(ElInput),
   },
   {
      name: 'Tab2',
      type: markRaw(ElDatePicker),
   },
  ])

  const tabsData = ref([
    {
      label: 'Tab1', 
      name: 'Tab1', 
      disabled: false,
    },
    {
      label: 'Tab2', 
      name: 'Tab2', 
      disabled: false,
    },
  ])

  const activeTab = ref('Tab1')
  const handleClick = (val: TabPanelName) => {
    console.log(val, '标签页')
  }
</script>


