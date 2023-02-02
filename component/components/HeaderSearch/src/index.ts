import { buildProps } from '@eoi-plus/utils';
import { isString } from '@vue/shared';
import type { ExtractPropTypes, PropType } from 'vue';

interface dataType {
  children?: dataType[];
  component?: string;
  id?: string;
  meta?: {
    keepAlive?: boolean;
    internalOrExternal?: boolean;
    icon?: string;
    componentName?: string;
    title?: string;
  };
  name?: string;
  path?: string;
  redirect?: null | unknown;
  route?: string | number;
}
export const headerSearchProps = buildProps({
  data: {
    type: Array as PropType<dataType[]>, //
    default: () => [],
  },
} as const);

export const headerSearchEmits = {
  change: (value: string) => isString(value),
};

export type HeaderSearchProps = ExtractPropTypes<typeof headerSearchProps>;
export type HeaderSearchEmits = typeof headerSearchEmits;
