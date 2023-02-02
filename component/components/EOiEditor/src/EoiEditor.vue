<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

defineOptions({
  name: 'EoiEditor',
});

interface EoiEditorProps {
  title: string;
}

const editorRef = shallowRef(null);

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    console.log(editorRef.value?.getAllMenuKeys());
  }, 1500);
});

const toolbarConfig = {
  // excludeKeys: ['insertImage'],
  toolbarKeys: [
    'headerSelect',
    'blockquote',
    '|',
    'bold',
    'underline',
    'italic',
    'color',
    'bgColor',
    '|',
    'fontSize',
    'fontFamily',
    'lineHeight',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    {
      key: 'group-justify-style', // 必填，要以 group 开头
      title: '对齐方式', // 必填
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'], // 下级菜单 key ，必填
    },
    {
      key: 'group-sj-style', // 必填，要以 group 开头
      title: '缩进方式', // 必填
      menuKeys: ['indent', 'delIndent'], // 下级菜单 key ，必填
    },

    '|',

    'insertLink',
    '|',
    'insertTable',
    {
      key: 'group-table-style', // 必填，要以 group 开头
      title: '表格操作', // 必填
      menuKeys: ['deleteTable', 'insertTableRow', 'deleteTableRow', 'insertTableCol', 'deleteTableCol', 'tableHeader', 'tableFullWidth'], // 下级菜单 key ，必填
    },
    '|',
    'codeBlock',
    'divider',
    '|',
    'undo',
    'redo',
  ],
};
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      fieldName: 'your-fileName',
      base64LimitSize: 10 * 1024 * 1024, // 10M 以下插入 base64
    },
    codeSelectLang: {
      codeLangs: [
        { text: 'CSS', value: 'css' },
        { text: 'HTML', value: 'html' },
        { text: 'XML', value: 'xml' },
        { text: 'TS', value: 'ts' },
        { text: 'JS', value: 'js' },
        // 其他
      ],
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  // console.log(valueHtml);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
interface EditorProps {
  modelValue: string;
}

const props = withDefaults(defineProps<EditorProps>(), {
  modelValue: '',
});
const emits = defineEmits<(e: 'update:modelValue', item: unknown) => void>();
const update = (v) => {
  emits('update:modelValue', v);
};
</script>
<template>
  <div class="EoiEditor">
    <div style="border: 1px solid #ccc">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" />
      <Editor
        :model-value="modelValue"
        style="height: 500px; overflow-y: hidden"
        :default-config="editorConfig"
        @update:model-value="update"
        @on-created="handleCreated"
      />
    </div>
  </div>
</template>
