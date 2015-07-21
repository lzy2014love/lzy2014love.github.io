### 加入多说评论框

首先到`http://duoshuo.com/` 申请有账号
然后进入后台获得通用评论框代码，放到index.html的`#main-page下`

e.g:
```html
     <!-- main -->
    <div class="main" id="main">
        <div class="main-inner">
            <div class="main-page markdown-body" id="main-page"></div>
        </div>
        <!-- 多说评论框 start -->
        <div class="ds-thread" data-thread-key="请将此处替换成文章在你的站点中的ID" data-title="请替换成文章的标题" data-url="请替换成文章的网址"></div>
        <!-- 多说评论框 end -->
        <!-- 多说公共JS代码 start (一个网页只需插入一次) -->
        <script type="text/javascript">
        var duoshuoQuery = {
            short_name: "jayin"
        };
        (function() {
            var ds = document.createElement('script');
            ds.type = 'text/javascript';
            ds.async = true;
            ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
            ds.charset = 'UTF-8';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
        </script>
        <!-- 多说公共JS代码 end -->
    </div>
```

**如果想在网站首页不显示评论,如何做？**
```javascript
//blog.js
function init() {
    read_config(function() {
        load('#sidebar-page', 'sidebar.md', true);

        if (cur_md_path === '') {
            load('#main-page', 'home.md');
            console.log("load main~");
            //多说评论,若想不在首页显示评论框 那么：取消这一句注释
            //$('.ds-thread').removeClass('ds-thread');
        }
    });
}
```
