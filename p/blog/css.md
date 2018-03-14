# CSS
***
### ie css hack
``` css
.ie6_7_8{
    color: blue; /*所有浏览器*/
    color: red\9; /*IE8以及以下版本浏览器*/
    *color: green; /*IE7及其以下版本浏览器*/
    _color: purple; /*IE6浏览器*/
}
```

### css多列等高如何实现？
>利用padding-bottom|margin-bottom正负值相抵；
>设置父容器设置超出隐藏（overflow:hidden），这样子父容器的高度就还是它里面的列没有设定padding-bottom时的高度，
>当它里面的任 一列高度增加了，则父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的padding-bottom补偿这部分高度差。

### 清除浮动代码
``` css
.clearfix:before,
.clearfix:after {
  display: table;
  content: ".";
  visibility: hidden;
  height: 0;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom:1;
}
```

### 样式初始化
``` css
/* 样式初始化 */
@charset "utf-8";

body {
  margin: 0 auto;
  width: 100%;
  font: 12px "微软雅黑", "宋体";
  background: #fff;
  color: #000;
}

ul,
li,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  border: none;
}

a:hover {
  border: none;
}

a:link,
a:active,
a:visited {
  text-decoration: none;
  border: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
h7,
p {
  margin: 0;
  padding: 0;
}

img {
  border: none;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.clearfix {
  display: inline-block;
}
```

### 字体font-family
``` css
    @ 宋体      SimSun
    @ 黑体      SimHei
    @ 微信雅黑   Microsoft Yahei
    @ 微软正黑体 Microsoft JhengHei
    @ 新宋体    NSimSun
    @ 新细明体  MingLiU
    @ 细明体    MingLiU
    @ 标楷体    DFKai-SB
    @ 仿宋     FangSong
    @ 楷体     KaiTi
    @ 仿宋_GB2312  FangSong_GB2312
    @ 楷体_GB2312  KaiTi_GB2312  
    @
    @ 说明：中文字体多数使用宋体、雅黑，英文用Helvetica
    
    body { font-family: Microsoft Yahei,SimSun,Helvetica; } 
```

### 消除transition闪屏
``` cs
.css {
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
```

### css实现单行文本溢出显示
还需要加宽度width属来兼容部分浏览。
``` css
.css {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

```
### css实现多行文本溢出显示
``` css
.css {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```

### 让图文不可复制
``` css
.css {
  -webkit-user-select: none; 
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
```

### 盒子垂直水平居中
1. 定位 盒子宽高已知
``` css
.css {
  position: absolute;
  left: 50%; top: 50%; 
  margin-left:-自身一半宽度; 
  margin-top: -自身一半高度;
}
```

2. table-cell布局 
``` css
/* 父级  */
display: table-cell; 
vertical-align: middle; 

/* 子级  */
margin: 0 auto;
```
3. 定位 + transform ; 适用于 子盒子 宽高不定时
``` css
  position: relative / absolute;
  /*top和left偏移各为50%*/
  top: 50%;
  left: 50%;
  /*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
  transform: translate(-50%, -50%); 
  /* 注意这里启动了3D硬件加速哦  */
```
4. flex 布局
``` css
  /* 父级：  */
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
```

### 水平方向上居中
``` css
margin-left : 50% ; 
transform: translateX(-50%);
```

### 改变placeholder的字体颜色大小
PC端可以，真机可能没用
``` css
input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:14px;
    color: #333;
} 
input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:14px;
    color: #333;
} 
input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:14px;
    color: #333;
}
```

### opacity 兼容
``` css
.opacity {
    opacity: 0.4
    filter: alpha(opacity=60); /* for IE5-7 */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; /* for IE 8*/
}
```

### BFC
满足下面任一条件的元素，会触发为 BFC ：

1. 浮动元素，`float` 除 `none` 以外的值
2. 绝对定位元素，`position`（`absolute`，`fixed`）
3. `display` 为以下其中之一的值 `inline-blocks`，`table-cells`，`table-captions`
4. `overflow` 除了 `visible` 以外的值（`hidden`，`auto`，`scroll`）

但是，`display:table` 本身并不产生 `BFC`，而是由它产生匿名框，匿名框中包含 `display:table-cell` 的框会产 `BFC`。 总之，对于 `display:table` 的元素，产生 BFC 的是匿名框而不是 `display:table`。
