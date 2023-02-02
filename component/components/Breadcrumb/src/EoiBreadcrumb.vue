<script lang="ts" setup>
import { useFileBreadcrumb } from '@eoi-plus/hooks';

defineOptions({
  name: 'EoiBreadcrumb',
});

interface EoiBreadcrumbProps {
  initNode: any;
}
const props = withDefaults(defineProps<EoiBreadcrumbProps>(), {
  initNode: { key: 'index', value: '我的文件' },
});
const emits = defineEmits<(e: 'change', item: unknown) => void>();
const { data, del, add, clear, selectList } = useFileBreadcrumb();

const handleFc = (item) => {
  del(item, 'key');
  emits('change', item);
};

defineExpose({ add, clear });
</script>
<template>
  <div class="EoiBreadcrumb">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>
        <span class="item" @click="handleFc(data[0])">{{ data[0].value }}</span>
        <template v-if="selectList.length">
          <el-dropdown>
            <span class="icon">...</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in selectList" :key="item.key" @click="handleFc(item)">{{ item.value }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in data.slice(1)" :key="item.key" @click="handleFc(item)"
        ><span class="item">{{ item.value }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  margin: 0 15px;
  cursor: pointer;
}
.item {
  cursor: pointer;
}
</style>
