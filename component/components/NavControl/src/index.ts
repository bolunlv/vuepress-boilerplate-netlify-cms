import { buildProps } from '@eoi-plus/utils';
import { ExtractPropTypes } from 'vue';

export const navControlProps = buildProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
} as const);
export const navControlEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};
export type NavControlProps = ExtractPropTypes<typeof navControlProps>;
