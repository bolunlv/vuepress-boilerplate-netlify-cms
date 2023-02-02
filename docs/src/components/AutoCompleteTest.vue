
<template>
  <div>
    <AutoComplete 
    v-model="hostName" 
    style="width: calc(100% - 10px);" 
    sname="current/hostName" 
    :data="partitionList"
    placeholder="请输入分区" 
    @keydown.enter="handleSearch" @select="handleSearch" />
  </div>

</template>
<script setup lang="ts">
import { AutoComplete } from '@eoi-plus/components'
import { ref } from 'vue'
const partitionList = ref([
  {
    value: '分区1'
  },
  {
    value: '分区2'
  }, {
    value: 'demo1'
  },
  {
    value: 'demo2'
  }

])
const hostName = ref('')

const handleSearch = (e) => {
  console.log('e')
}

</script>
<style lang="scss">
.cncc-auto-complete .el-autocomplete-suggestion li:hover {
  color: #000;
}
</style>

