# AutoComplete


## 组件说明

- ​ 自动补全输入框，根据客户的需要定制化该组件，支持用户输入保存用户的历史记录。


## 示例
<AutoCompleteTest />

<script setup lang="ts">
 import AutoCompleteTest from './AutoCompleteTest.vue'
</script>

```html
<AutoCompleteTest />
<script setup lang="ts">
  import AutoCompleteTest from "./AutoCompleteTest.vue";
</script>
```

AutoCompleteTest.vue

```html
<template>
  <div>
    <AutoComplete v-model="hostName" style="width: calc(100% - 10px);"
    sname="current/hostName" :data="partition./AutoCompleteTest.vue
    placeholder="请输入分区" @keydown.enter="handleSearch"
    @select="handleSearch" />
  </div>
</template>
<script setup lang="ts">
  import { AutoComplete } from '@eoi-plus/components'
  import { ref } from 'vue'
  const partitionList = ref([
    {./AutoCompleteTest.vue
      value: '分区1'
    },
    {
      value: '分区2'
    }, {
      value: 'demo1'
    },
    {
      value: 'demo2'
    }

  ])
  const hostName = ref('')
  const handleSearch = (e) => {
    console.log('e')
  }
</script>
<style lang="scss">
  .cncc-auto-complete .el-autocomplete-suggestion li:hover {
    color: #000;
  }
</style>
```

## 属性说明

| 属性             | 说明                                         | 是否必选 | 默认值 |
| ---------------- | -------------------------------------------- | -------- | ------ |
| v-model          | 选中项绑定值                                 | 是       | ---    |
| sname            | 当前用来存储历史记录的 sessionStorage 的 key | 否       | ---    |
| trigger-on-focus | 无论什么是否聚焦都会触发下拉列表             | 否       | true   |
| data             | 聚焦时下拉列表数据的列表                     | 是       | ---    |

## 事件说明

| 事件名                 | 说明                           | 是否必选 | 默认值 |
| ---------------------- | ------------------------------ | -------- | ------ |
| keydown.enter （事件） | 输入内容键入回车触发的事件     | 是       | ---    |
| select（事件）         | 选择下拉列表的某一项触发的事件 | 是       | ---    |

## 更新记录

| 时间       | 更新人 | 更新说明 |
| ---------- | ------ | -------- |
| 2022-12-21 | 王国晗   | 初始化 |

- data 数据格式：[{value:'demo1'},{value2:'demo'}];

> 备注：此组件按照 Element-UI 的 auto-complete 进行二次封装，其他的属性均可参照 Element-UI。
>
> _此组件目前不支持插槽_
