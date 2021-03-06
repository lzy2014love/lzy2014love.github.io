# JS

---

### DOM

> `tagName`只能用在元素节点上，而`nodeName`可以用在任何节点上，可以说`nodeName`涵盖了`tagName`，并且具有更多的功能，因此建议总是使用`nodeName`。

---

### 获取元素的绝对位置，大小。 参数 js 对象

```js
function getElAbsolute(elem) {
  var t = elem.offsetTop
  var l = elem.offsetLeft
  var w = elem.offsetWidth
  var h = elem.offsetHeight
  elem = elem.offsetParent
  while (elem) {
    t += elem.offsetTop
    l += elem.offsetLeft
    elem = elem.offsetParent
  }
  return {
    top: t,
    left: l,
    width: w,
    height: h,
  }
}
```

### 兼容各种浏览器的,获取鼠标真实位置

```js
function mousePosition(ev) {
  if (!ev) ev = window.event
  if (ev.pageX || ev.pageY) {
    return { x: ev.pageX, y: ev.pageY }
  }
  return {
    x: ev.clientX + document.documentElement.scrollLeft - document.body.clientLeft,
    y: ev.clientY + document.documentElement.scrollTop - document.body.clientTop,
  }
}
```

### 判断可视区域（常用于 css3 动画）

用法：\$('#selector').viewarea(options)

```js
/**options = {
     inFn: function (element) {
     //移入可视区域callback
     },
     outFn: function (element) {
     //移出可视区域callback
     }
     };*/
;(function($) {
  ViewArea = function(element, options) {
    this.options = $.extend({}, options)
    this.init(element)
  }
  ViewArea.prototype.ViewAreaResult = function(element) {
    var windowScrollTop = $(window).scrollTop(), //滚轮距离顶部高度
      domTopDistance = $(element).offset().top, //dom距离顶部高度
      domHeight = $(element).outerHeight(), //dom自身高度
      windowHeight = $(window).height() //window可视区域高度
    var scrollTop = windowScrollTop > domTopDistance + domHeight,
      scrollBottom = windowScrollTop < domTopDistance - windowHeight
    var result = scrollTop || scrollBottom
    return result
  }
  ViewArea.prototype.callBackFn = function(element, result) {
    var options = this.options,
      inFn = options.inFn,
      outFn = options.outFn
    if (!result && !!inFn) {
      inFn(element)
    } else if (!!outFn) {
      outFn(element)
    }
  }
  ViewArea.prototype.init = function(element) {
    var result = this.ViewAreaResult(element)
    this.callBackFn(element, result)
  }
  $.fn.viewarea = function(options) {
    return this.each(function() {
      new ViewArea(this, options)
    })
  }
})(window.jQuery)
```

### 函数节流

1.  函数节流是指一定时间内 js 方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。
2.  函数防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。

```js
const throttle = (fun, delay, ...rest) => {
  let last = null
  return () => {
    const now = +new Date()
    if (now - last > delay) {
      fun(rest)
      last = now
    }
  }
}
```

### 函数防抖

```js
//函数防抖
const debouce = (fun, delay, ...rest) => {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fun(rest)
    }, delay)
  }
}
```

### 使用 setTimeout 代替 setInterval

> setInterval 间歇调用，是在前一个方法执行前，就开始计时，比如间歇时间是 500ms，那么不管那时候前一个方法是否已经执行完毕，都会把后一个方法放入执行的序列中。这时候就会发生一个问题，假如前一个方法的执行时间超过 500ms，加入是 1000ms，那么就意味着，前一个方法执行结束后，后一个方法马上就会执行，因为此时间歇时间已经超过 500ms 了

## fetch

### `fetch`发送请求默认是不发送`cookie`

`fetch`发送请求默认是不发送`cookie`的，不管是同域还是跨域；那么问题就来了，对于那些需要权限验证的请求就可能无法正常获取数据，这时可以配置其`credentials`项，其有 3 个值：

1.  `omit`: 默认值，忽略 cookie 的发送
2.  `same-origin`: 表示 cookie 只能同域发送，不能跨域发送
3.  `include`: cookie 既可以同域发送，也可以跨域发送
    > fetch 默认对服务端通过 Set-Cookie 头设置的 cookie 也会忽略，若想选择接受来自服务端的 cookie 信息，也必须要配置 credentials 选项；

### fetch 请求对某些错误 http 状态不会`reject`

`fetch`返回的 promise 在某些错误的 http 状态下如 400、500 等不会`reject`，相反它会被`resolve`；只有网络错误会导致请求不能完成时，`fetch` 才会被 `reject`；所以一般会对 fetch 请求做一层封装

```js
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
function parseJSON(response) {
  return response.json()
}
export default function request(url, options) {
  let opt = options || {}
  return fetch(url, { credentials: 'include', ...opt })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => data)
    .catch(err => err)
}
```

### `fetch`不支持超时`timeout`处理

实现`fetch`的`timeout`功能，其思想就是新创建一个可以手动控制`promise`状态的实例，根据不同情况来对新`promise`实例进行`resolve`或者`reject`，从而达到实现`timeout`的功能

1.  方法一

```js
var oldFetchfn = fetch
window.fetch = function(input, opts) {
  return new Promise(function(resolve, reject) {
    var abort_promise = function() {
      reject(new Error('fetch abort'))
    }
    var p = oldFetchfn(input, opts).then(resolve, reject)
    p.abort = abort_promise
    return p
  })
}
```

2.  方法二

```js
var oldFetchfn = fetch; //拦截原始的fetch方法
window.fetch = function(input, opts){//定义新的fetch方法，封装原有的fetch方法
    var fetchPromise = oldFetchfn(input, opts);
    var timeoutPromise = new Promise(function(resolve, reject){
        setTimeout(()=>{
             reject(new Error("fetch timeout"))
        }, opts.timeout)
    });
    retrun Promise.race([fetchPromise, timeoutPromise])
}
```

> fetch 的 timeout 即使超时发生了，本次请求也不会被 abort 丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已；

### fetch 实现`jsonp`

要实现一个`JSONP`，只不过这个`JSONP`的实现要与`fetch`的实现类似，即基于`Promise`来实现一个`JSONP`；而其外在表现给人感觉是`fetch`支持`JSONP`一样；
`npm install fetch-jsonp --save-dev`
然后在像下面一样使用：

```js
fetchJsonp('/users.jsonp', {
  timeout: 3000,
  jsonpCallback: 'custom_callback',
})
  .then(function(response) {
    return response.json()
  })
  .catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### fetch 跨域问题

fetch 的 mode 配置项有 3 个值，如下：

1.  `same-origin`：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个 error 告知不能跨域；其对应的 response type 为 basic。
2.  `cors`: 该模式支持跨域请求，顾名思义它是以 CORS 的形式跨域；当然该模式也可以同域请求不需要后端额外的 CORS 支持；其对应的 response type 为 cors。
3.  `no-cors`: 该模式用于跨域请求但是服务器不带 CORS 响应头，也就是服务端不支持 CORS；这也是 fetch 的特殊跨域请求方式；其对应的 response type 为 opaque。
    > `no-cors`模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其 response type 为 opaque 透明的原因

### UMD 模块模版

```js
;(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory)
  } else if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory(require('jquery'))
  } else {
    // 浏览器全局变量(global 即 window)
    global.returnExports = factory(global.jQuery)
  }
})(typeof window !== 'undefined' ? window : this, function($) {
  // 实现代码
  // juqery插件不用返回
  $.fn.myFunc = function() {}

  // 暴露公共方法
  return myFunc
})
```

### 如何判断一个对象是{}

```js
function isEmptyObject(obj) {
  obj = obj.__proto__ && Object.keys(obj.__proto__).length ? obj.__proto__ : obj
  return !Object.keys(obj).length
}
```

### js 继承

```js
function Animal() {
  this.species = '动物'
}

function Cat(name, color) {
  this.name = name
  this.color = color
}
```

1.  构造函数绑定

```js
function Cat(name, color) {
  Animal.apply(this, arguments) // 父对象的构造函数绑定在子对象上
  this.name = name
  this.color = color
}
```

2.  prototype 模式

```js
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat
```

3.  空对象作为中介

```js
function extend(Child, Parent) {
  var F = function() {}
  F.prototype = Parent.prototype
  Child.prototype = new F()
  Child.prototype.constructor = Child
  Child.uber = Parent.prototype // 属性uber上可以直接调用父对象的方法
}
```

4.  属性浅拷贝

```js
function extend2(Child, Parent) {
  var p = Parent.prototype
  var c = Child.prototype
  for (var i in p) {
    c[i] = p[i]
  }
  c.uber = p
}
```

5.  属性深拷贝

```js
function deepCopy(p, c) {
  var c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = p[i].constructor === Array ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}
```

5.  委托

```js
function objectCreate(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

### new 操作符具体干了什么

1.  创建一个空对象，并且 `this` 变量引用该对象，同时还继承了该函数的原型。
2.  属性和方法被加入到 `this` 引用的对象中。
3.  新创建的对象由 `this` 所引用，并且最后隐式的返回 `this` 。

```js
var obj = {}
obj.__proto__ = Base.prototype
Base.call(obj)
```

### 构造函数必须 new

```js
function aa() {
  if (this.constructor !== aa) {
    throw new Error('必须new')
  }

  if (!(this instanceof aa)) {
    throw new Error('必须new')
  }
}
```

### 动态加载

```js
function loadScript(jsfileUrl, successCallback, errorCallback) {
  var head = document.head
  var script = document.createElement('script')
  script.type = 'text/javascript' // script.setAttribute('type', 'text/javascript');
  script.src = jsfileUrl //  script.setAttribute('src', jsfile);
  head.appendChild(script)
  //IE6、IE7 support js.onreadystatechange
  script.onload = script.onreadystatechange = function(event) {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      script.onload = script.onreadystatechange = null
      ;(successCallback && typeof successCallback === 'function') || successCallback(event)
    }
  }
  script.onerror = function(event) {
    console.error(event.target.src + ' can not loaded')
    ;(errorCallback && typeof errorCallback === 'function') || errorCallback(event)
  }
}
```

### js 实现千位分隔符

```js
function commafy(num) {
  return (
    num &&
    num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
      return $1 + ','
    })
  )
}
console.log(commafy(1234567.9)) //1,234,567.90
```

### document.domain + iframe 跨域

此方案仅限主域相同，子域不同的跨域应用场景。

1.  父窗口：(http://www.domain.com/a.html)

```html
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
  document.domain = 'domain.com'
  var user = 'admin'
</script>
```

2.  子窗口：(http://child.domain.com/b.html)

```html
<script>
  document.domain = 'domain.com'
  // 获取父窗口中变量
  alert('get js data from parent ---> ' + window.parent.user)
</script>
```

### js 如何判断用户使用的设备类型及平台

1.  判断 pc 端还是移动端

```js
function IsPC() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}
```

2.  判断用户移动端使用的系统平台

```js
var u = navigator.userAgent
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
  //安卓手机
} else if (u.indexOf('iPhone') > -1) {
  //苹果手机
} else if (u.indexOf('Windows Phone') > -1) {
  //winphone手机
}
```

3.  判断用户是否在微信中打开

```js
function isWeiXin() {
  var ua = navigator.userAgent.toLowerCase()
  return ua.indexOf('micromessenger') !== -1
}
```

### 复制文字添加版权信息在剪切板

```js
/**
 * 复制文字添加版权信息在剪切板
 * @param {String} copyright 版权，网站名
 */
function addCopyright(copyright) {
  document.body.oncopy = function(e) {
    var body_element = document.getElementsByTagName('body')[0]
    var selection
    if (window.getSelection) {
      //DOM,FF,Webkit,Chrome,IE10
      selection = window.getSelection()
      alert('文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：' + document.location.href)
    } else if (document.getSelection) {
      //IE10
      selection = document.getSelection()
      alert('文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：' + document.location.href)
    } else if (document.selection) {
      //IE6+10-
      selection = document.selection.createRange().text
      alert('文字复制成功！若有文字残缺请用右键复制\n转载请注明出处：' + document.location.href)
    } else {
      selection = ''
      alert('浏览器兼容问题导致复制失败！')
    }
    //if the selection is short let's not annoy our users
    if (('' + selection).length < 30) return

    //create a div outside of the visible area
    //and fill it with the selected text
    var newdiv = document.createElement('div')
    newdiv.style.position = 'absolute'
    newdiv.style.left = '-99999px'
    body_element.appendChild(newdiv)
    newdiv.appendChild(selection.getRangeAt(0).cloneContents())

    //we need a <pre> tag workaround
    //otherwise the text inside "pre" loses all the line breaks!
    if (selection.getRangeAt(0).commonAncestorContainer.nodeName === 'PRE') {
      newdiv.innerHTML = '<pre>' + newdiv.innerHTML + '</pre>'
    }

    newdiv.innerHTML +=
      "<br /><br />原文: <a href='" +
      document.location.href +
      "'>" +
      document.location.href +
      '</a> &copy;&nbsp;' +
      copyright

    selection.selectAllChildren(newdiv)
    window.setTimeout(function() {
      body_element.removeChild(newdiv)
    }, 200)
  }
}
```

### javascript 取消文本选定

```js
if (document.selection) {
  document.selection.empty()
} else if (window.getSelection) {
  window.getSelection().removeAllRanges()
}
```

### JS 实现屏蔽网页右键复制及 ctrl+c 复制的方法

```js
//右键出现菜单事件
document.oncontextmenu = function() {
  return false
}
document.onkeydown = function() {
  if (event.ctrlKey && window.event.keyCode == 67) {
    return false
  }
}
document.body.oncopy = function() {
  return false
}
//不建议连选中文本都不行
document.onselectstart = function() {
  return false
}
```

### 快速排序

```js
function quickSort(array) {
  if (array.length <= 1) {
    return array
  }
  let [pivot, ...rest] = array
  let leftArr = []
  let rightArr = []
  rest.forEach(ele => {
    if (ele > pivot) {
      rightArr.push(ele)
    } else {
      leftArr.push(ele)
    }
  })
  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)]
}
```

### 统计数组中相同项的个数

```js
var cars = ['BMW', 'Benz', 'Benz', 'Tesla', 'BMW', 'Toyota']
var carsObj = cars.reduce(function(obj, name) {
  obj[name] = obj[name] ? ++obj[name] : 1
  return obj
}, {})
carsObj // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
```

### 删除不需要的属性

```js
let { _internal, tooBig, ...cleanObject } = { el1: '1', _internal: 'secret', tooBig: {}, el2: '2', el3: '3' }
console.log(cleanObject) // {el1: '1', el2: '2', el3: '3'}
```

### 错误捕获

```js
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage) // 异常信息
  console.log('scriptURI: ' + scriptURI) // 异常文件路径
  console.log('lineNo: ' + lineNo) // 异常行号
  console.log('columnNo: ' + columnNo) // 异常列号
  console.log('error: ' + error) // 异常堆栈信息
}

// 跨域之后window.onerror是无法捕获异常信息的，所以统一返回Script error.，解决方案便是script属性配置 crossorigin="anonymous" 并且服务器添加Access-Control-Allow-Origin。
;<script src="http://cdn.xxx.com/index.js" crossorigin="anonymous" />
```

### 安卓微信浏览器 location.reload()刷新无效

```js
/**
 * 安卓微信浏览器location.reload()刷新无效
 * 用location.href加时间戳重写location.reload方法
 */

/**
 * 加时间戳
 * @param {string} url URL
 */
function updateUrl(url) {
  const key = '_timestamp=' // 默认是"_timestamp"
  const reg = new RegExp(`${key}\\d+`) // 正则：_timestamp=1472286066028
  const timestamp = +new Date()
  if (url.indexOf(key) > -1) {
    // 有时间戳，直接更新
    return url.replace(reg, key + timestamp)
  } // 没有时间戳，加上时间戳
  if (url.indexOf('?') > -1) {
    const urlArr = url.split('?')
    if (urlArr[1]) {
      return `${urlArr[0]}?${key}${timestamp}&${urlArr[1]}`
    }
    return `${urlArr[0]}?${key}${timestamp}`
  }
  if (url.indexOf('#') > -1) {
    return `${url.split('#')[0]}?${key}${timestamp}${location.hash}`
  }
  return `${url}?${key}${timestamp}`
}

export default function reload() {
  location.href = updateUrl(location.href)
}
```

### 采用正则表达式获取地址栏参数

```js
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
```
