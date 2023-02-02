import { buildProps } from '@eoi-plus/utils';
import type { ExtractPropTypes, PropType } from 'vue';

interface dataType {
  title: string;
  icon: string;
  keyWord: string | number;
}
export const userControlProps = buildProps({
  data: {
    type: Array as PropType<dataType[]>,
    default: [],
  },
  config: {
    type: Object as PropType<any>,
    default: {
      title: 'title',
      icon: 'icon',
      keyword: 'keyword',
    },
  },
} as const);
export const userControlEmits = {
  change: (value: dataType) => value,
};

export type UserControlrops = ExtractPropTypes<typeof userControlProps>;
export type UserControlEmits = typeof userControlEmits;
