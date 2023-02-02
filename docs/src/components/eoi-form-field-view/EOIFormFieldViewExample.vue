<template>
  <EOIFormFieldView :field-info="fieldInfo" :formFieldValue="formFieldValue" @form-change="formChange" />
</template>
<script setup lang="ts">
  import { EOIFormFieldView } from '@eoi-plus/components'
  import { ref, markRaw } from 'vue'
  import { ElInput, ElRadioGroup, ElRadio, ElSelect, ElOption, ElDatePicker} from 'element-plus';
  const fieldInfo = ref([
    {
      fieldLabel: '名字',
      fieldType: markRaw(ElInput),
      fieldKey: 'names',
      placeholder: '名字',
      fieldSpan: 12,
    },
    {
      fieldLabel: '性别',
      fieldType: markRaw(ElRadioGroup),
      fieldKey: 'sex',
      placeholder: '名字',
      fieldSpan: 24,
      children: [
        {
          fieldLabel: 'option1',
          fieldType: markRaw(ElRadio),
          size: 'default',
          value: 1,
        },
        {
          fieldLabel: 'option2',
          fieldType: markRaw(ElRadio),
          size: 'default',
          value: 2,
        },
      ],
    },
    {
      fieldLabel: '部门',
      fieldType: markRaw(ElSelect),
      fieldKey: 'department',
      placeholder: '请输入部门',
      fieldSpan: 12,
      children: [
        {
          fieldLabel: '开发',
          fieldType: markRaw(ElOption),
          size: 'default',
          value: 'code',
        },
        {
          fieldLabel: '人力',
          fieldType: markRaw(ElOption),
          size: 'default',
          value: 'hr',
        },
      ],
    },
    {
      fieldLabel: '日期',
      fieldType: markRaw(ElDatePicker),
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

  const formChange = (val: string | number) => {
    console.log(val, '66')
  }

</script>


