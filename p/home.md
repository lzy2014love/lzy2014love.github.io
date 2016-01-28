[silentor](https://github.com/Jayin/silentor), a friendly fork of [silent](https://github.com/fritx/silent)
========
>Be a silentor, focus on writting your words down.


### ==>[1分钟快速构建你的博客](./docs/getting-start/main.md)

特点
----
* 开箱即用(Fork 本项目立马可以使用)
* markdown only ,让你专注文章本身
* 友好的移动端支持
* 灵活的样式扩展

教程目录
---

- 适用人群
- 目录结构
- 使用指南
    - 开箱即用
    - 配置config.json
    - 创建gh-pages分支并 上传到Github
    - 设置图片
    - 文章的图片位置问题
    - 在本文中引用其他目录的文章
    - 404: 根目录下的404.md就是找不页面时显示的内容
    - footer.md: 全局的底部信息
- 开发指南
    - 自定义样式
    - 更换语法高亮css
    - 网站标题
    - 网站分析
    - 大小写
    - 配置评论框
        - Disqus设置指南
        - 多说设置指南

-----

适用人群
------

* 会使用git, 推荐[廖雪峰Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/)
* 会使用Markdown, [Markdown语法简介](markdown-useage.md)

目录结构
--------
```
---silentor
   |---img //图片根目录
   |---p  //文章(markdown)根目录
       |---home.md   //页面主页
       |---sidebar.md //页面侧栏
       |---footer.md //页面底部
   |---vendor  // 库目录
   |---404.md   //404页
   |---config.json //配置
   |---default_config.json // 默认配置,用于参考
   |---index.html //博客入口

```

# 使用指南

### 开箱即用

1. Fork 本项目(可以忽略下面的第一、二步)
2. clone 本项目


### 第一步：配置根目录的config.json
```json
{
    "app_name": "{输入你的项目名}"
}

```

以`silentor`为例,此处应填写silentor

### 第二部步：创建gh-pages分支并 上传到Github
```shell
git init
git checkout -b gh-pages
git add --all
git commit -m 'my website'
git push origin gh-pages
//然后输入你的github账号,密码
```

see [Demo](http://meizhuo.github.io/silentor/)

### 设置图片
我们约定在根目录下的`img`下放置所有图片文件

当然，你也可以在`config.json`配置:
```json
{
    .....
    "img_root" : "{you_img_root}"
}
```

若markdown需要用到图片:
```markdown
![图片说明](__IMG__/xxx.jpg)
```

**注意: `__IMG__`就是指代你配置的图片根目录**

#### 文章的图片位置问题

默认是：图片居中，如果想图片居左：
```markdown
![图片说明|left](__IMG__/xxx.jpg)
```

居右
```markdown
![图片说明|right](__IMG__/xxx.jpg)
```

### 在本文中引用其他目录的文章

详情:参考这个[issue#1](https://github.com/Jayin/silentor/issues/1)

自v1.5.2新增了一个常量`__P__`来表示markdown文件的根目录，默认是`p`，同样地，你也可以在`config.json`配置:

```json
"markdown_root":"p"
```

例子:
```markdown

//引用当前目录下的other.md
[其他目录文章标题](other.md)    //推荐
[其他目录文章标题](./other.md)

//引用上一级目录App目录下的other.md
[其他目录文章标题](../App/other.md)

PS:支持多次上级操作，你可以自由地使用相对路径
[其他目录文章标题](../..//App/other.md)

//引用任意目录下other.md
[其他目录文章标题](__P__/path/to/file/other.md) //推荐

```

### 404: 根目录下的404.md就是找不页面时显示的内容

若有需要，可以改写里面的内容

### footer.md: 全局的底部信息

我们知道有sidebar（侧栏）,main page(主页),可是有时候我们需要一个网站底部一些关于信息 ，这个`footer.md`就是干这事情，建议在p/目录下建立footer.md 文件来添加底部信息


# 开发指南

### 自定义样式

silentor提供了简单的样式，如果你不满足，可以自己添加/修改。

注意: 并不推荐你直接修改核心部分的样式，而是推荐:

1. 在目录`vendor`新建一个文件夹`custom/css`
2. 在`vendor/custom/css`新建一个`my.css`
3. 在`index.html`中引入
```html
    <link rel="stylesheet" href="vendor/custom/css/my.css">
```

### 更换语法高亮css

在[highlightjs.org](https://highlightjs.org/)中下载对应的css,然后替换`vendor/highlight/styles/main.css`的内容

### 网站标题

首先网站只有2部分，一个Sidebar，左侧的菜单栏,另外一个是右侧，主页栏
网站标题默认是右侧内容页的第一行标题


### 网站分析

你可以在`index.html`中嵌入你的google analytics、百度分析


### 大小写

github pages、linux下都是大小写敏感，开发时约定都使用小写


### 配置评论框

- [Disqus设置指南](./docs/use-disqus/index.md)
- [多说设置指南](./docs/use-duoshuo/index.md)


License
===
    Copyright 2014 Jayin Ton
    Copyright 2014 Fritx

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
