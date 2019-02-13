> [Vue CLI 3文档](https://cli.vuejs.org/zh/guide/)
## 升级步骤
1. [安装Vue CLI 3 ](https://cli.vuejs.org/zh/guide/installation.html)
2. [创建项目](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)
3. 保留旧项目src目录和index.html, 其他文件项目用新项目替换
4. 添加.browserslistrc、.editorconfig、.eslintrc.js、.prettierrc.js、vue.config.js等配置文件
5. 检查升级的依赖，如果升级的大版本，必须看`CHANGELOG.md`和`releases`是否有`breaking changes`。如果有文档有迁移指南则可作为主要参考
6. 代码修改升级后，启动项目看报错信息，根据信息定位问题，重复步骤5，6
****
## 遇到的问题
1. Vue CLI 3 生成的项目Vue Loader 14 升级到15，可参考(https://vue-loader.vuejs.org/zh/migrating.html)
> 如果项目中需要支持 `<template lang="pug">`，你安装 `pug-plain-loader` `pug`
> `require('xxx.vue')`必须改为`require('xxx.vue').default` 或者 import xxx from 'xxx.vue' vue组件才能正确导入
2. Vue Loader 14 升级到15，vue/vue-router必须配套升级，vue升级到2.5， vue-router升级到3.0.0
3. vue@2.5版本支持`.vue`文件的`functional`组件，即2.5之前版本在`template`标签写`<template functional>`是不生效的
****
## 补充
`vue inspect > output.js` 可以审查当前实际`webpack`配置，对于写`chainWebpack`配置项有帮助