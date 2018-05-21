# HTML

---

### 360 浏览器强制 webkit 渲染

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="renderer" content="webkit">
```

### 移动 webh5

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, minimal-ui">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta name="full-screen" content="yes">
<meta name="x5-fullscreen" content="true">
```

### meta 标签

```html
    <!-- 设置缩放 -->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui" />
    <!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->
    <meta name="format-detection"content="telephone=no, email=no" />

    <!-- 启用360浏览器的极速模式(webkit) -->
    <meta name="renderer" content="webkit">
    <!-- 避免IE使用兼容模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true">
    <!-- 微软的老式浏览器 -->
    <meta name="MobileOptimized" content="320">
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
    <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">
```

### 处理 移动端 1px 被 渲染成 2px

1.  局部处理
    `meta`标签中的 `viewport`属性 ，`initial-scale` 设置为 1
    `rem` 按照设计稿标准走，外加利用`transfrome` 的`scale(0.5)` 缩小一倍即可；
2.  全局处理
    `meta`标签中的 `viewport`属性 ，`initial-scale` 设置为 `0.5`
    `rem` 按照设计稿标准走即可

### ie9 下 es5，css3 兼容

```html
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
```

### ie9 下兼容

`ie7–js`中是一个`JavaScript`库（解决`IE`与`W3C`标准的冲突的`JS`库），使微软的`Internet Explorer`的行为像一个`Web`标准兼容的浏览器，支持更多的`W3C`标准，支持`CSS2`、`CSS3`选择器。它修复了许多的`HTML`和`CSS`问题，并使 得透明`PNG`在`IE5`、`IE6`下正确显示。

```html
<!–[if lt IE 9]>
<script src=”http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE9.js”></script>
<![endif]–>
```

### 分享代码

```html
<div class="share">
  <!-- JiaThis Button BEGIN -->
  <div class="jiathis_style">
    <span class="jiathis_txt">分享到：</span>
    <a class="jiathis_button_weixin"></a>
    <a class="jiathis_button_tsina"></a>
    <a class="jiathis_button_qzone"></a>
    <a class="jiathis_button_tqq"></a>
    <a class="jiathis_button_renren"></a>
    <a class="jiathis_button_kaixin001"></a>
  </div>
  <script type="text/javascript">
    var jiathis_config = {
      summary: "",
      shortUrl: false,
      hideMore: false
    }
  </script>
  <script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
  <!-- JiaThis Button END -->
</div>
```

###

```html
<audio controls="controls">
  <source src="music/bg.ogg" type="audio/ogg"></source>
  <source src="music/bg.mp3" type="audio/mpeg"></source>
  优先播放音乐bg.ogg，不支持在播放bg.mp3
</audio>
```

```js
//JS绑定自动播放（操作window时，播放音乐）
$(window).one('touchstart', function() {
  music.play()
})

//微信下兼容处理
document.addEventListener(
  'WeixinJSBridgeReady',
  function() {
    music.play()
  },
  false
)

//1.audio元素的autoplay属性在IOS及Android上无法使用，在PC端正常；
//2.audio元素没有设置controls时，在IOS及Android会占据空间大小，而在PC端Chrome是不会占据任何空间；
//3.注意不要遗漏微信的兼容处理需要引用微信JS；
```
