import { useLocalStorageState } from 'ahooks-vue';
import { reactive } from 'vue';

export function useCacheList<T>(title: string) {
  const cacheList = reactive({
    value: useLocalStorageState(title + 'cacheList', () => [] as T[]),
  });
  const add = (value: T) => {
    let result = cacheList.value.findIndex((item) => item === value);
    if (result > -1) {
      cacheList.value.splice(result, 1);
    }
    if (cacheList.value.length >= 5) {
      cacheList.value.pop();
    }
    cacheList.value.unshift(value);
  };
  const clear = () => {
    cacheList.value = [];
  };
  return { cacheList, add, clear };
}
