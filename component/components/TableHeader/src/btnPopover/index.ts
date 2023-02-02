import { buildProps } from '@eoi-plus/utils';
import type { ExtractPropTypes } from 'vue';

export const btnPopoverProps = buildProps({
  visible: {
    type: Boolean,
    default: false,
  },
} as const);

export const btnPopoverEmits = {
  close: () => {},
};

export type BtnPopoverProps = ExtractPropTypes<typeof btnPopoverProps>;
export type BtnPopoverEmits = typeof btnPopoverEmits;
