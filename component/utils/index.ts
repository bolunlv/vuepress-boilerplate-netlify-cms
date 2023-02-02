import { hasOwn, isObject } from '@vue/shared';
import { fromPairs } from 'lodash-unified';
import type { Component, ExtractPropTypes, PropType } from 'vue';
import { warn } from 'vue';

import type { EpProp, EpPropConvert, EpPropFinalized, EpPropInput, EpPropMergeType, IfEpProp, IfNativePropType, NativePropType } from './types';
import type { SFCWithInstall } from './typescript';

export const epPropKey = '__epPropKey';

export const definePropType = <T>(val: any): PropType<T> => val;
export const iconPropType = definePropType<string | Component>([String, Object, Function]);

export const isEpProp = (val: unknown): val is EpProp<any, any, any> => isObject(val) && !!(val as any)[epPropKey];

/**
 * @description Build prop. It can better optimize prop types
 * @description 生成 prop，能更好地优化类型
 * @example
 // limited options
 // the type will be PropType<'light' | 'dark'>
 buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
 * @example
 // limited options and other types
 // the type will be PropType<'small' | 'large' | number>
 buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
 @link see more: https://github.com/element-plus/element-plus/pull/3341
 */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends EpPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false,
>(
  prop: EpPropInput<Type, Value, Validator, Default, Required>,
  key?: string,
): EpPropFinalized<Type, Value, Validator, Default, Required> => {
  // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
  if (!isObject(prop) || isEpProp(prop)) return prop as any;

  const { values, required, default: defaultValue, type, validator } = prop;

  const _validator =
    values || validator
      ? (val: unknown) => {
        let valid = false;
        let allowedValues: unknown[] = [];

        if (values) {
          allowedValues = Array.from(values);
          if (hasOwn(prop, 'default')) {
            allowedValues.push(defaultValue);
          }
          valid ||= allowedValues.includes(val);
        }
        if (validator) valid ||= validator(val);

        if (!valid && allowedValues.length > 0) {
          const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(', ');
          warn(
            `Invalid prop: validation failed${key ? ` for prop "${key}"` : ''}. Expected one of [${allowValuesText}], got value ${JSON.stringify(
              val,
            )}.`,
          );
        }
        return valid;
      }
      : undefined;

  const epProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true,
  };
  if (hasOwn(prop, 'default')) epProp.default = defaultValue;
  return epProp;
};

export const buildProps = <Props extends Record<string, { [epPropKey]: true } | NativePropType | EpPropInput<any, any, any, any, any>>>(
  props: Props,
): {
  [K in keyof Props]: IfEpProp<Props[K], Props[K], IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>>;
} => fromPairs(Object.entries(props).map(([key, option]) => [key, buildProp(option as any, key)])) as any;

/**
 * 装包工具
 * @param main 装包目标
 * @param extra 后续group 支持
 */
export const withInstall = <T, E extends Record<string, any>>(main: ExtractPropTypes<any>, extra?: E) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    app.component(main.name, main);
  };
  return main as SFCWithInstall<T> & E;
};

/**
 * 装包工具All
 */
export const withAllInstall = <T, E extends Record<string, any>>(all, extra?: E) => {
  const main: { All: any; install?: any } = { All: all };
  main.install = (app): void => {
    main.All.forEach((item) => {
      item.install(app);
    });
  };
  return main as SFCWithInstall<any>;
};
export * from './format';
export default { withInstall };
