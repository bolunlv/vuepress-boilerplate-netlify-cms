
const path = require('path')


const logoPath = (logo) => {
  const { NODE_ENV } = process.env;
  let filePath = ''
  // if(NODE_ENV.trim() === 'development'){
  //   filePath = `/${logo}`
  // }else{
  //   filePath = `/public/${logo}`
  // }
  filePath = `/${logo}`

  return filePath;
}
export default {
  title: '首页',
  base: '',
  description: '整理的人行清算项目组件分享',
  themeConfig: {
    search: true,
    lastUpdated: '最后更新时间',
    // siteTitle: 'My Custom Title',
    logo: logoPath('desktop.png'),
    docsDir: '/',
    editLink: {
      pattern: '',
      text: 'Edit this page on GitHub'
    },
    repo: '',
    footer: {
      message: 'released under the MIT License',
      copyright: 'Copyright @ 2022 tmmaiyatang',
    },
    // 展示搜索框
    algolia: {
      appKey: '',
      indexName: '',
      searchParameters: {
        faeFilters: ['tags:guide,api']
      }
    },
    nav: [
      {
        text: '组件',
        link: '/components/auto-complete',
      },
    ],
    sidebar: {
      '/components/': [
        {
          text: '组件',
          collapsible: true,
          items: [
            {
              text: 'AutoComplete',
              link: '/components/auto-complete.md'
            },
            {
              text: 'EOITab',
              link: '/components/eoi-tab/eoi-tab.md'
            },
            {
              text: 'EOIFormFieldView',
              link: '/components/eoi-form-field-view/eoi-form-field-view.md'
            },
          ],
        }
      ],
      
    }
  }
}
