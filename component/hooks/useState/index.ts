import { ref, shallowReadonly, shallowRef } from 'vue';

export type useStateType = <T>(init: T, deep?: boolean) => any[];
export const useState: useStateType = <T>(init, deep = false) => {
  if (deep) {
    const data = ref<T>(init);
    return [
      data.value,
      (v) => {
        data.value = v;
      },
      data,
    ];
  }
  const data = shallowRef<T>(init);
  return [
    shallowReadonly(data),
    (v) => {
      data.value = v;
    },
  ];
};
