import { computed, ref } from 'vue';

export interface node {
  key: string | number;
  value: string | number;
}
export const useFileBreadcrumb = (initNode = { key: 'index', value: '我的文件' }) => {
  const breadcrumbList = ref<node[]>([initNode]);
  const clear = () => {
    breadcrumbList.value = [initNode];
  };
  const add = (v: node) => {
    breadcrumbList.value.push(v);
  };
  const del = (v: node, key = 'key') => {
    breadcrumbList.value = breadcrumbList.value.slice(
      0,
      breadcrumbList.value.findIndex((item) => {
        return item[key] === v[key];
      }) + 1,
    );
  };
  const result = computed(() =>
    breadcrumbList.value.length < 5 ? breadcrumbList.value : [breadcrumbList.value[0]].concat(breadcrumbList.value.slice(-4)),
  );
  const selectList = computed(() => (breadcrumbList.value.length < 5 ? [] : breadcrumbList.value.slice(1, -4)));
  return {
    clear,
    data: result,
    add,
    selectList,
    del,
  };
};
