import { defineComponent, ref } from 'vue';

const box = ref(null);
function num2px(num: string | number) {
  return typeof num === 'string' ? num : num + 'px';
}
const EoiTableView = defineComponent({
  name: 'EoiTableViewV2',
  render({ $attrs }) {
    return (
      <>
        <div style={{ width: $attrs.width ? num2px($attrs.width) : '100%' }} ref={box}>
          <el-table-v2 {...$attrs} width={(box.value?.offsetWidth as number) || 0} />
          <el-pagination {...$attrs} ref={undefined} />
        </div>
      </>
    );
  },
});
export default EoiTableView;
