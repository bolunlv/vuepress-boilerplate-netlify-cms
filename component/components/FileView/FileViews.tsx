import { useToggle } from 'ahooks-vue';
import { computed, defineComponent, ref } from 'vue';

import FileList from './FlieList.vue';
import style from './index.module.scss';

function num2px(num: string | number) {
  return typeof num === 'string' ? num : num + 'px';
}
const { state: checkedKeys, toggle } = useToggle();
const multipleTable = ref(null);
function selectAll(data) {
  toggle();
  splite(data);
}
const box = ref(null);
const gap = computed(() => {
  return (box.value?.offsetWidth || 0) % 150;
});
/**
 * 处理数据
 */
function splite(data) {
  data.forEach((row) => {
    multipleTable.value.toggleRowSelection(row, checkedKeys.value);
    splite(row.children || []);
  });
}

const EoiFileView = defineComponent({
  name: 'EoiFileView',
  render: (item) => {
    const { $attrs } = item;
    return (
      <>
        <div class={style.box} style={{ width: $attrs.width ? num2px($attrs.width) : '100%' }} ref={box}>
          <FileList {...$attrs}></FileList>
          <el-pagination {...$attrs} />
        </div>
      </>
    );
  },
});
export default EoiFileView;
