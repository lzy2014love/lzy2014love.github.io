Markdown语法
===

> 注意： Markdown语法没有标准，各家的实现略有不同，可以参考GitHub的

> 参考:
>* [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
>* [Markdown: Syntax](http://daringfireball.net/projects/markdown/syntax)

## 标题
输入
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

效果：

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题

## 加入超链接
输入
```
[超链接标题](https://github.com/Meizhuo)
```
效果
[超链接标题](https://github.com/Meizhuo)

### `markdown`中超链接通过新窗口打开
抛弃markdown中的行内式链接的语法。自己动手在需要超链接的位置，用html语言实现超链接在新窗口打开
```
欢迎大家访问<a href="https://lzy2014love.github.io/silentor/" target="_blank">lzy2014love的github blog</a>
```
效果 
欢迎大家访问<a href="https://lzy2014love.github.io/silentor/" target="_blank">lzy2014love的github blog</a>


## 加入图片
输入
```
![这里填写图片标题,可以为空](这里放置图片链接)

//例如
![Meizhuo Logo](https://avatars1.githubusercontent.com/u/6211725?v=2&s=200)
```
效果:
![Meizhuo Logo](https://avatars1.githubusercontent.com/u/6211725?v=2&s=200)

**注意**
在silentor中，图片均放在blog/img/目录下(例如有一张bg.jpg在img/目录下)
那么应该这么写
```
![图片名](__IMG__/jpg)
```

如果我的图片bg.jpg放在`img/`的子目录`img/mypic/`咋办？那也容易
```
![图片名](__IMG__/mypic/bg.jpg)
```


## 列表
```
//第一种风格,记得*号后空一格

* 列表写法1
* 列表写法1
* 列表写法1

//第二种风格 记得-号后空一格

- 列表写法1
- 列表写法1
- 列表写法1
```

第二种风格效果

* 列表写法1
* 列表写法1
* 列表写法1

第二种风格效果

- 列表写法1
- 列表写法1
- 列表写法1

如果还有子列表咋办？
```
//子目录只需要多打一个TAB键(or 4个空格)
- 列表目录1
    - 列表子目录1
    - 列表子目录2
    - 列表子目录3
```
效果:

- 列表目录1
    - 列表子目录1
    - 列表子目录2
    - 列表子目录3



## 字体加粗
输入
```
**这是加粗的内容**
```
效果:
**这是加粗的内容**



## 斜体
输入
```
_这是斜体_
```
效果:
_这是斜体_


## 删除线
输入
```
~~这是删除线~~
```
效果:
~~这是删除线~~



## 引用
输入
```
>人生自古谁无死？
```
效果:
>人生自古谁无死？



## 表格
输入
```
表格标题1  |表格标题2  |  表格标题3
------------ | -------------| -------------
nickname | 用户昵称     | Y
email    |  邮箱      | Y
psw      | 密码   | Y
```
效果:

表格标题1  |表格标题2  |  表格标题3
------------ | -------------| -------------
nickname | 用户昵称     | Y
email    |  邮箱      | Y
psw      | 密码    | Y
