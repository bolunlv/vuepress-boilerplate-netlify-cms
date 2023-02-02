import { buildProps } from '@eoi-plus/utils';
import { ExtractPropTypes } from 'vue';

export const routerTabsProps = buildProps({
  isDefault: {
    type: Boolean,
    default: false,
  },
  defaultTitle: {
    type: String,
    default: '',
  },
  defaultPath: {
    type: String,
    default: '',
  },
} as const);

export type RouterTabsProps = ExtractPropTypes<typeof routerTabsProps>;
