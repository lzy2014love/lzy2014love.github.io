# nodejs
***

### http状态码
1. 100  `Continue`	继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息
2. 200  `OK` 		正常返回信息
3. 201  `Created`  	请求成功并且服务器创建了新的资源
4. 202  `Accepted` 	服务器已接受请求，但尚未处理
5. 301  `Moved Permanently`  请求的网页已永久移动到新位置
6. 302 `Found`  		临时性重定向
7. 303 `See Other`  	临时性重定向，且总是使用 `GET` 请求新的 `URI`
8. 304  `Not Modified` 自从上次请求后，请求的网页未修改过

9. 400 `Bad Request`  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求
10. 401 `Unauthorized` 请求未授权
11. 403 `Forbidden`  	禁止访问
12. 404 `Not Found`  	找不到如何与 `URI` 相匹配的资源

13. 500 `Internal Server Error`  最常见的服务器端错误
14. 503 `Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）

### 一个页面从输入 URL 到页面加载显示完成的过程
1. 浏览器会开启一个线程来处理这个请求，对 `URL` 分析判断如果是 `http` 协议就按照 `Web` 方式来处理;
2. 调用浏览器内核中的对应方法，比如 `WebView` 中的 `loadUrl` 方法;
3. 通过`DNS`解析获取网址的`IP`地址，设置 `UA` 等信息发出第二个`GET`请求;
4. 进行`HTTP`协议会话，客户端发送报头(请求报头);
5. 进入到`web`服务器上的 `Web Server`，如 `Apache、Tomcat、Node.JS` 等服务器;
6. 进入部署好的后端应用，如 `PHP、Java、JavaScript、Python` 等，找到对应的请求处理;
7. 处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回`304`;
8. 浏览器开始下载`html`文档(响应报头，状态码`200`)，同时使用缓存;
9. 文档树建立，根据标记请求所需指定`MIME`类型的文件（比如`css`、`js`）,同时设置了`cookie`;
10. 页面开始渲染`DOM`，`JS`根据`DOM API`操作`DOM`,执行事件绑定等，页面显示完成。

### npm
* 设置淘宝镜像 `npm config set registry https://registry.npm.taobao.org`
* 修改全局安装路径 修改`npm`文件夹下的`npmrc`文件，打开修改里面的内容，原来的内容删掉，写入 `prefix=D:\node\node_global`
* 解决全局包找不到问题：先在用户变量里面新建明为`PATH`的变量，值为`D:\node\node_global`,这个值是你在步骤一种新建的文件夹的路径。然后在系统变量里面新建一个叫`NODE_PATH`的变量，值为`D:\node\node_global\node_modules`，这个值是步骤一中新建的node_global下的node_modules文件夹的路径，以后安装的全局模块就在这里

1. 安装本地包： 在项目根目录下`npm link`
### 软连接
* `linux`: `ln -sf file1 file2` 其中file1是软件链接的名称,file2是实际文件的路径，以后通过file1就可以访问file2了
* `windows`: `MKLINK [[/D] | [/H] | [/J]] Link Target`
 
        /D      创建目录符号链接。默认为文件
                符号链接。
        /H      创建硬链接，而不是符号链接。
        /J      创建目录联接。
        Link    指定新的符号链接名称。
        Target  指定新链接引用的路径
                (相对或绝对)。
                
### koa ctx.body类型
* `Buffer`,`Stream`对象： 设置ctx.type = 'application/octet-stream',即`Content-Type`为`application/octet-stream`,浏览器处理二进制文件默认是下载
* `String`对象： `text/html` 或 `text/plain`, 同时默认字符集是 `utf-8`
* `Object`或者`Array`对象： `application/json`