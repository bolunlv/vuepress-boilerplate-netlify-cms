<script lang="ts" setup>
import { withDefaults, markRaw } from 'vue';
import { ElForm, ElFormItem, ElRow, ElCol } from 'element-plus';

interface ChildField {
  fieldType: any;
  fieldLabel: string;
  size?: string;
  value: number;
}

interface FieldModel {
  fieldLabel: string;
  fieldSpan?: number;
  fieldType: any;
  fieldKey: string;
  placeholder?: string;
  size?: string;
  children?: ChildField[];
}

interface Props {
  fieldInfo: FieldModel[];
  formFieldValue: Record<string, any>;
  justifyOption?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
}
const props = withDefaults(defineProps<Props>(), {
  justifyOption: 'start',
});

const $emit = defineEmits<(e: 'formChange', val: string | number) => void>();
const formHandleChange = (val: string | number) => {
  $emit('formChange', val);
}

</script>

<template>
  <div class="field">
    <el-form :model="formFieldValue" >
      <!-- 多行 -->
      <el-row :justify="justifyOption">
        <!-- 每一行展示多个字段 -->
        <el-col v-for="(field, ind) in props.fieldInfo" :key="ind" :span="field.fieldSpan">
          <el-form-item :label="field.fieldLabel">
            <!-- 生成表单并设置表单属性 -->
            <component
              :is="field.fieldType"
              v-model="formFieldValue[field.fieldKey]"
              :placeholder="`请输入${field.placeholder}`"
              :size="field.size"
              @change="formHandleChange"
            >
              <!-- 表单需要children -->
              <template v-if="field.children">
                <template v-if="field.fieldType.name === 'ElRadioGroup'">
                  <component :is="child.fieldType" v-for="child in field.children" :key="child.value" :label="child.value" :size="child.size">
                    {{ child.fieldLabel }}
                  </component>
                </template>
                <template v-else>
                  <component
                    :is="child.fieldType"
                    v-for="child in field.children"
                    :key="child.value"
                    :label="child.fieldLabel"
                    :value="child.value"
                    :size="child.size"
                  />
                </template>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

