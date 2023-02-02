import { format } from '@eoi-plus/utils';
import { useToggle } from 'ahooks-vue';
import { defineComponent, ref } from 'vue';

import style from './index.module.scss';

const box = ref(null);
function num2px(num: string | number) {
  return typeof num === 'string' ? num : num + 'px';
}
const { state: checkedKeys, toggle } = useToggle();
const multipleTable = ref(null);
function selectAll(data) {
  toggle();
  splite(data);
}
/**
 * 处理数据
 */
function splite(data) {
  data.forEach((row) => {
    multipleTable.value.toggleRowSelection(row, checkedKeys.value);
    splite(row.children || []);
  });
}

const sorter = ref();
export const EoiTableView = defineComponent({
  name: 'EoiTableView',
  render: ({ $attrs }) => {
    return (
      <>
        <div class={style.box} style={{ width: $attrs.width ? num2px($attrs.width) : '100%' }} ref={box}>
          <el-table
            size="default"
            layout="total, prev, pager, next, jumper,sizes"
            width="100%"
            max-height={$attrs?.maxHeight || 9999999}
            vLoading={$attrs['v-loading']}
            {...$attrs}
            ref={multipleTable}
            onSelectAll={() => {
              selectAll($attrs.data);
            }}
            onSortChange={(props) => {
              sorter.value = props;
              $attrs.onSortChange({ currentPage: $attrs.currentPage, pageSize: $attrs['page-size'], sorter });
            }}
          >
            {{
              empty: () => {
                return <el-empty />;
              },
              default: () => {
                return ($attrs.columns || []).map((item) => {
                  return !item.type ? (
                    <el-table-column {...item} prop={item.dataIndex || item.key} key={item.key || item.dataIndex} label={item.title}>
                      {{
                        default: (a) => (
                          <>
                            {item.cellRenderer
                              ? item.cellRenderer(a.row)
                              : format({
                                  target: a.row[item.dataIndex],
                                  type: item.formatType || 'default',
                                  placeholder: item.formatPlaceholder || '',
                                  size: item.formatSize,
                              })}
                          </>
                        ),
                        header: (a) => {
                          return <>{item.headerCellRenderer ? item.headerCellRenderer(a.column) : format({ target: a.column.label })}</>;
                        },
                      }}
                    </el-table-column>
                  ) : (
                    <el-table-column {...item} />
                  );
                });
              },
            }}
          </el-table>
          <el-pagination
            {...$attrs}
            onCurrentChange={() => {
              $attrs.onSortChange({ currentPage: $attrs.currentPage, pageSize: $attrs['page-size'], sorter });
            }}
            onSizeChange={() => {
              $attrs.onSortChange({ currentPage: $attrs.currentPage, pageSize: $attrs['page-size'], sorter });
            }}
          />
        </div>
      </>
    );
  },
});
