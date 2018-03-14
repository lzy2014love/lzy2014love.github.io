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
1. 浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2. 调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
3. 通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
4. 进行HTTP协议会话，客户端发送报头(请求报头);
5. 进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
6. 进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
7. 处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
8. 浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
9. 文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
10. 页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。