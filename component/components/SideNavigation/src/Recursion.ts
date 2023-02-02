import { buildProps } from '@eoi-plus/utils';
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
export const recursionPropsType = buildProps({
  data: {
    type: Array as PropType<dataType[]>, //
    default: () => [],
  },
} as const);

export const sidNavigationPropsType = buildProps({
  data: {
    type: Array as PropType<dataType[]>, //
    default: () => [],
  },
  isCollapse: {
    type: Boolean,
    default: true,
  },
  logoPath: {
    type: String,
    default: '/path',
  },
} as const);

export type RecursionPropsType = ExtractPropTypes<typeof recursionPropsType>;
export type SidNavigationPropsType = ExtractPropTypes<typeof sidNavigationPropsType>;
