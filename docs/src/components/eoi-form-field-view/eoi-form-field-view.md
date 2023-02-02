# EOIFormFieldView


## 组件说明

- ​ 通过配置数据结构动态渲染不同的表单组件以及自定义组件。


## 示例
<EOIFormFieldViewExample />

<script setup lang="ts">
   import EOIFormFieldViewExample from "./EOIFormFieldViewExample.vue";
</script>

```html
<EOIFormFieldViewExample />
<script setup lang="ts">
  import EOIFormFieldViewExample from "./EOIFormFieldViewExample.vue";
</script>
```

EOIFormFieldViewExample.vue

```html
<template>
  <EOIFormFieldView :field-info="fieldInfo" :formFieldValue="formFieldValue" />
</template>
<script setup lang="ts">
  import { EOIFormFieldView } from '@eoi-plus/components'
  import { ref } from 'vue'
  import { ElInput, ElRadioGroup, ElRadio, ElSelect, ElOption, ElDatePicker} from 'element-plus';
  const fieldInfo = ref([
    {
      fieldLabel: '名字',
      fieldType: ElInput,
      fieldKey: 'names',
      placeholder: '名字',
      fieldSpan: 12,
    },
    {
      fieldLabel: '性别',
      fieldType: ElRadioGroup,
      fieldKey: 'sex',
      placeholder: '名字',
      fieldSpan: 24,
      children: [
        {
          fieldLabel: 'option1',
          fieldType: ElRadio,
          size: 'default',
          value: 1,
        },
        {
          fieldLabel: 'option2',
          fieldType: ElRadio,
          size: 'default',
          value: 2,
        },
      ],
    },
    {
      fieldLabel: '部门',
      fieldType: ElSelect,
      fieldKey: 'department',
      placeholder: '请输入部门',
      fieldSpan: 12,
      children: [
        {
          fieldLabel: '开发',
          fieldType: ElOption,
          size: 'default',
          value: 'code',
        },
        {
          fieldLabel: '人力',
          fieldType: ElOption,
          size: 'default',
          value: 'hr',
        },
      ],
    },
    {
      fieldLabel: '日期',
      fieldType: ElDatePicker,
      fieldKey: 'date',
      placeholder: '选择日期',
      type: 'date',
    },
  ])

  const formFieldValue = ref({
    names: 'test-name',
    sex: '1',
    department: 'hr',
  })

</script>
```

## 属性说明

| 属性             | 说明                                         | 是否必选   |  类型       |  默认值 |
| ---------------- | -------------------------------------------- | --------  |   ------   |  ------ |
| fieldInfo         | 表单配置数据                                 | 是       |   { <br/> fieldLabel: string; // 表单标签<br/>fieldSpan?: string; // 表单占比 <br/> fieldType: any;  // 表单类型 <br/> fieldKey: string; // 表单绑定的值对应的key <br/> placeholder?: string; // 提示信息 <br/> size?: string; // 表单尺寸 <br/> children?: ChildField[]; // 子元素的配置信息 <br/>}[]       |   ---- |
| -------- | childField                                            | 否       |   { <br/> fieldLabel: string; // 表单标签 <br/> fieldType: any;  // 表单类型 <br/> size?: string; // 表单尺寸 <br/> value: number; // 选项值 <br/>}     | -----  |
| formFieldValue        | 所有表单的值                              | 是       |    any       | -----  |
| justifyOption        | 表单排列样式                              | 否      |  'start', 'end', 'center', 'space-around','space-between', 'space-evenly'      |  'start'  |

## 事件说明

| 事件名                 | 说明                           | 是否必选 |  类型  | 默认值 |
| ---------------------- | ------------------------------ | ------  | ----- | ------ |
| formChange （事件）   | 表单数值改变是触发                 | 否     | (event: 'formChange', val: string | number) => void | ---- |

## 更新记录

| 时间       | 更新人 | 更新说明 |
| ---------- | ------ | -------- |
| 2023-01-04 | 吕博伦   | 初始化 |


> 备注：
