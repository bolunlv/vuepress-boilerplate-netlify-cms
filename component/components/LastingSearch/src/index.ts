import { isString } from '@vue/shared';

export const eoiLastingSearchEmits = {
  change: (value: string) => isString(value),
};

export type EoiLastingSearchEmits = typeof eoiLastingSearchEmits;
