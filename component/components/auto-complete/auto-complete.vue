<template>
  <el-autocomplete
    v-bind="{ ...$attrs, ...$props }"
    ref="autoComplete"
    v-model="state"
    clearable
    class="inline-input w-50"
    popper-class="cncc-auto-complete"
    :trigger-on-focus="true"
    :fit-input-width="true"
    :fetch-suggestions="querySearch"
    @clear="clear"
    @select="handleSelect"
    @keydown.enter="handleEnter"
  />

</template>
<script lang="ts">
export default {
  name:'auto-complete'
}
</script>
<script setup lang="ts">
import {
  ElAutocomplete,
} from 'element-plus';
import { ref, watch } from 'vue';

interface Props {
  data: any;
  modelValue: string;
  sname?: string;
  startHistory?: boolean; // 鼠标聚焦显示当前搜索的历史纪录
  triggerOnFocus?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  startHistory: true,
  triggerOnFocus:true,
});
type eventName =  ['update:modelValue'][number];
const emit = defineEmits<(event: eventName, r?: any) => void>();

const sessionKey = `$$SESSION_HISTORY_LIST_${props.sname || ''}`;
const getHistory = () => {
  const result = JSON.parse(sessionStorage.getItem(sessionKey) || '[]');
  return result;
};
const setHistory = e => {
  const result = JSON.parse(sessionStorage.getItem(sessionKey) || '[]');
  const i = result.findIndex(item => item.value === e.value);
  if (i === -1) {
    result.unshift(e);
  } else {
    const c = result.splice(i,1);
    result.unshift(...c);
  }
  sessionStorage.setItem(sessionKey, JSON.stringify(result));
};
const useComplete = () => {
  const state = ref('');
  const results = ref([]);
  const autoComplete = ref(null);
  const querySearch = (queryString: string, cb: any) => {

    if (queryString) {
      results.value = props.data.filter(createFilter(queryString));
    } else {
      if (props.startHistory !== false) {
        const r = getHistory();
        results.value = r;
      } else {
        results.value = props.data;
      }
    }
    cb(results.value);
  };
  const createFilter = (queryString: string) => (restaurant: any) => (
    restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  );

  watch(() => state.value, (next, to) => {
    emit('update:modelValue', next);
  });

  const handleSelect = (e: any) => {
    setHistory(e);
    // emit('select', e); // 父组件绑定了子组件相同名称的事件 ，都会触发，不需要单独再触发父组件上绑定的事件
  };
  const handleEnter = (e: any) => {
    const obj = { value: e.target.value };
    setHistory(obj);
  };
  
  const clear = e => {
    /**
     * 处理清空内容后，下拉框不弹射的问题，
     * 参考链接： https://www.jianshu.com/p/cac2ed8e1ee7
     */
    autoComplete.value.activated = true;
  };
  return { state, querySearch, handleSelect, handleEnter,clear,autoComplete };
};

const { state, querySearch, handleSelect, handleEnter,clear,autoComplete } = useComplete();
</script>
<style scoped lang="scss">
</style>
<style  lang="scss">

.cncc-auto-complete{

  .el-autocomplete-suggestion {
    background-color: var(--color-neutrals-5);

    & li {
      margin: 0px 4px;
      padding: 0px 10px;
    }

    & li:hover {
      background: var(--color-primary);
      border-radius: 4px;
      color: white;

    }
  }

  .el-popper__arrow{
    display: none;
  }
}

</style>
