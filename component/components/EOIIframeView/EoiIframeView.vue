<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';

defineOptions({
  name: 'EoiIframeView',
});

interface EoiIframeProps {
  name: string;
  url: string;
  route: string;
}

const props = withDefaults(defineProps<EoiIframeProps>(), {
  name: '标题',
  url: '',
  route: '',
});
const loading = ref(true);
onMounted(() => {
  nextTick(() => {
    let iframeDom: HTMLElement = document.getElementById('childrenHX');
    iframeDom.onload = function () {
      console.log(localStorage['pro__Access-Token']);
      (iframeDom as any).contentWindow.postMessage(
        {
          token:
            '{"value":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjQ4NzMyMzEsInVzZXJuYW1lIjoiYWRtaW4ifQ.66kcmTIMYgmmh9G5xs47nBa2ioCttm8APtCp_SOXaDI","expire":1664873230916}',
        },
        '*',
      );
      loading.value = false;
    };
  });
});
</script>
<template>
  <div v-loading="loading" class="EoiIframe">
    <iframe :id="name" :src="'http://' + url + route" :name="name" />
  </div>
</template>
<style lang="scss" scoped>
.EoiIframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  iframe {
    margin: 0;
    padding: 0;
    position: absolute;
    border: none;
    width: 100%;
    height: 100%;
  }
}
</style>
