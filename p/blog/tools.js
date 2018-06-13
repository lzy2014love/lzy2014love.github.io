(function () {

  /**
 * 通过定义一个和Storage对象部分一致的对象（docCookies），简化document.cookie 的获取方法。
 */
  var docCookies = {
    getItem: function (sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },
    // (name, value[, end[, path[, domain[, secure]]]])
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {return false;}
      var sExpires = '';
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
            break;
          case String:
            sExpires = '; expires=' + vEnd;
            break;
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '');
      return true;
    },
    // removeItem(name[, path], domain)
    removeItem: function (sKey, sPath, sDomain) {
      if (!sKey || !this.hasItem(sKey)) {return false;}
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '');
      return true;
    },
    hasItem: function (sKey) {
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    }
  };

  /**
   * 获取flag天后的日期
   * @param {string} dateString 日期字符串 '2018-03-15' 
   * @param {number} flag 往后的天数 
   * @returns {string} 日期字符串
   */
  function getDay(dateString, flag) {
    var dateObj = new Date(dateString);
    var LSTRYear = dateObj.getFullYear();
    var LSTRMonth = dateObj.getMonth();
    var LSTRDate = dateObj.getDate();
    var uom = new Date(LSTRYear, LSTRMonth, LSTRDate);
    uom.setDate(uom.getDate() + flag);
    var LINT_MM = uom.getMonth();
    LINT_MM++;
    var LSTR_MM = LINT_MM > 9 ? LINT_MM : ('0' + LINT_MM);
    var LINT_DD = uom.getDate();
    var LSTR_DD = LINT_DD > 9 ? LINT_DD : ('0' + LINT_DD);
    uom = uom.getFullYear() + '-' + LSTR_MM + '-' + LSTR_DD;
    return uom;
  }

  /**
   * 根据日期字符串获取星期几
   * @param {string} dateString 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
   * @param {0 | 1} type 返回格式，0：'周X', 1：'星期X'
   * @returns {string} 星期几
   */
  function getWeek(dateString, type) {
    var date;
    var weeks = [['周日', '周一', '周二', '周三', '周四', '周五', '周六'], ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']];
    if (dateString === undefined) {
      date = new Date();
    } else {
      date = new Date(dateString);
    }
    return weeks[type || 0][date.getDay()];
  }

  /**
 * 跨浏览器事件处理工具。只支持冒泡。不支持捕获
 */
  var eventUtil = {
    target: function (event) {
      return event.target || event.srcElement;
    },
    // 返回注册成功的监听器，IE中需要使用返回值来移除监听器
    on: function (elem, type, handler) {
      if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
        return handler;
      } else if (elem.attachEvent) {
        var wrapper = function () {
          var event = window.event;
          event.target = event.srcElement;
          handler.call(elem, event);
        };
        elem.attachEvent('on' + type, wrapper);
        return wrapper;
      }
    },
    off: function (elem, type, handler) {
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
      } else if (elem.detachEvent) {
        elem.detachEvent('on' + type, handler);
      }
    },
    preventDefault: function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else if ('returnValue' in event) {
        event.returnValue = false;
      }
    },
    stopPropagation: function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else if ('cancelBubble' in event) {
        event.cancelBubble = true;
      }
    },
    // 指定的 Unicode 编码中的序号值来返回一个字符串。
    getChar: function (event) {
      if (event.which === null) {
        return String.fromCharCode(event.keyCode); // IE
      } else if (event.which !== 0 && event.charCode !== 0) {
        return String.fromCharCode(event.which); // the rest
      } else {
        return null; // special key
      }
    }
  };


  /**
 * 解析query string转换为对象，一个key有多个值时生成数组
 * @param {string} queryString 需要解析的query字符串，开头可以是?，
 * 按照application/x-www-form-urlencoded编码
 * @return {object} 参数解析后的对象
 */
  function parseQuery(queryString) {
    var result = {};
    // 如果不是字符串返回空对象
    if (typeof queryString !== 'string') {
      return result;
    }
    // 去掉字符串开头可能带的?
    if (queryString.charAt(0) === '?') {
      queryString = queryString.substring(1);
    }
    var pairs = queryString.split('&');
    var pair;
    var key, value;
    var i, len;

    for (i = 0, len = pairs.length; i < len; ++i) {
      pair = pairs[i].split('=');
      // application/x-www-form-urlencoded编码会将' '转换为+
      key = decodeURIComponent(pair[0]).replace(/\+/g, ' ');
      value = decodeURIComponent(pair[1]).replace(/\+/g, ' ');

      if (!(key in result)) { // 如果是新key，直接添加
        result[key] = value;
      } else if (isArray(result[key])) {// 如果key已经出现一次以上，直接向数组添加value
        result[key].push(value);
      } else {// key第二次出现，将结果改为数组
        var arr = [result[key]];
        arr.push(value);
        result[key] = arr;
      }
    }

    return result;
  }

  /**
   * 判断输入参数是否为数组
   * @param {*} arg 任何类型
   * @returns {boolean} 是否为数组
   */
  function isArray(arg) {
    if (Array.isArray) {
      return Array.isArray(arg)
    }
    if (arg && typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
  }

})();

