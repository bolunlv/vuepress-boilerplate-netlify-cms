# EOITab


## 组件说明

- ​ 在element-plus的Tab组件的基础上增加了slot。可以通过配置数据结构动态渲染不同tab以及tab对应的内容（文字，组件等）。


## 示例
<EOITabExample />

<script setup lang="ts">
 import EOITabExample from './EOITabExample.vue'
</script>

```html
<EOITabExample />
<script setup lang="ts">
  import EOITabExample from "./EOITabExample.vue";
</script>
```

EOITabExample.vue

```html
<template>
  <EOITab :active-tab="activeTab" :tabs-data="tabsData" @handle-click="handleClick">
    <template v-for="(screen, index) in screenData" :key="index" #[screen.name]>
        <component :is="screen.type" />
    </template>
  </EOITab>
</template>
<script setup lang="ts">
  import { EOITab, AutoComplete } from '@eoi-plus/components'
  import { ref } from 'vue'
  import { TabPanelName } from 'element-plus';

  const screenData = ref([
   {
      name: 'Tab1',
      type: AutoComplete,
   },
   {
      name: 'Tab2',
      type: AutoComplete,
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
```

## 属性说明

| 属性             | 说明                                         | 是否必选   |  类型       |  默认值 |
| ---------------- | -------------------------------------------- | --------  |   ------   |  ------ |
| tabsData         | 标签页配置数据                                 | 是       |   { <br/> label：string;  // 标签名称<br/>name:string;  // 标签key&slot的名称 <br/> disabled?: string;  // 是否禁用标签 <br/>}[]       |   ---- |
| activeTab        | 当前选中的tab页签                              | 否       |    string    | -----  |

## 事件说明

| 事件名                 | 说明                           | 是否必选 |  类型  | 默认值 |
| ---------------------- | ------------------------------ | ------  | ----- | ------ |
| handleClick （事件）   | 点击tab页签触发                  | 是      | (event: 'handleClick', val: TabPanelName) => void | ---- |

## 更新记录

| 时间       | 更新人 | 更新说明 |
| ---------- | ------ | -------- |
| 2023-01-04 | 吕博伦   | 初始化 |


> 备注：此组件按照 Element-UI 的 Tabs 进行二次封装，其他的属性均可参照 Element-UI。
