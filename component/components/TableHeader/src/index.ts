import { buildProps } from '@eoi-plus/utils';
import type { ExtractPropTypes, PropType } from 'vue';

// 树形控件的数据类型
export interface TreeData {
  // 树形控件的children
  key: string;
  title: string;
  children?: TreeData[];
}

export const tableHeaderProps = buildProps({
  /** 所有数据, 格式为二维数组，数组每一项对应一个树形结构 */
  data: {
    type: Array as PropType<TreeData[][]>,
    default: () => [[]],
  },

  /** 点击恢复按钮用到的数据 */
  recoveryValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },

  /** 默认选中的值 */
  defaultValue: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
} as const);
export const tableHeaderEmits = {
  /** 点击确认按钮触发的事件 */
  check: (value: string[]) => value,
};

export type TableHeaderProps = ExtractPropTypes<typeof tableHeaderProps>;
export type TableHeaderEmits = typeof tableHeaderEmits;
