(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.jsUnhelp = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var O = Object.prototype.toString;
  var UA = navigator.userAgent; // 字符串

  var isString = function isString(v) {
    return typeof v === 'string';
  }; // 数组


  var isArray = function isArray(v) {
    return O.call(v) === '[object Array]';
  }; // 对象


  var isObject = function isObject(v) {
    return O.call(v) === '[object Object]';
  }; // undefied


  var isUndefined = function isUndefined(v) {
    return typeof v === 'undefined';
  }; // boolean


  var isBoolean = function isBoolean(v) {
    return typeof v === 'boolean';
  }; // null


  var isNull = function isNull(v) {
    return !v && _typeof(v) === "object";
  }; // 方法


  var isFunction = function isFunction(v) {
    return O.call(v) === '[object Function]';
  }; // date


  var isDate = function isDate(v) {
    return O.call(v) === '[object Date]';
  }; // isFile


  var isFile = function isFile(v) {
    return O.call(v) === '[object File]';
  }; // 数字


  var isNumber = function isNumber(v) {
    return !isNaN(parseFloat(v)) && isFinite(v);
  }; // symbol


  var isSymbol = function isSymbol(v) {
    return _typeof(v) === 'symbol' || 'Symbol' in window && v instanceof window.Symbol;
  }; // buffer


  var isBuffer = function isBuffer(v) {
    return v && _typeof(v) === 'object' && typeof v.copy === 'function' && typeof v.fill === 'function' && typeof v.readUInt8 === 'function';
  }; // isFormData


  var isFormData = function isFormData(v) {
    return typeof FormData !== 'undefined' && v instanceof FormData;
  }; // 手机


  var isPhone = function isPhone(v) {
    return /^0*1\d{10}$/.test(v);
  }; // 邮箱


  var isEmail = function isEmail(v) {
    return /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test(v);
  }; // 正则


  var isRegExp = function isRegExp(v) {
    return O.call(v) === '[object RegExp]';
  }; // 真


  var isTrue = function isTrue(v) {
    return v === true;
  }; // 假


  var isFalse = function isFalse(v) {
    return v === false;
  }; // ie


  var isIE = function isIE() {
    if ('ActiveXObject' in window) return /MSIE (\d+)/.test(UA) ? RegExp.$1 : 11;
    return false;
  }; // android


  var isAndroid = function isAndroid() {
    return UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1;
  }; // ios


  var isIOS = function isIOS() {
    return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(UA);
  };

  var check = {
    isString: isString,
    isArray: isArray,
    isObject: isObject,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isNull: isNull,
    isFunction: isFunction,
    isDate: isDate,
    isFile: isFile,
    isNumber: isNumber,
    isSymbol: isSymbol,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isPhone: isPhone,
    isEmail: isEmail,
    isRegExp: isRegExp,
    isTrue: isTrue,
    isFalse: isFalse,
    isIE: isIE,
    isAndroid: isAndroid,
    isIOS: isIOS
  };

  // 颜色 rgba => #******
  var color10to16 = function color10to16(v) {
    var c = v.match(/^rgb[a]?\((\s?[0-9]*),(\s?[0-9]*),(\s?[0-9]*),?(\s?[0-9]?\.?[0-9]?)?\)$/i);

    var r = function r(k) {
      var m = parseInt(k).toString(16).toUpperCase();
      return m.length < 2 ? '0' + m : m;
    };

    return {
      color: '#' + r(c[1]) + r(c[2]) + r(c[3]),
      c: c,
      o: c[4] || 1
    };
  }; // 颜色 #****** => rgba


  var color16to10 = function color16to10(v) {
    return 'rgba(' + v.match(/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/i).splice(1, 3).map(function (c) {
      return parseInt(c, 16);
    }).join(',') + ',1)';
  };

  var color = {
    color10to16: color10to16,
    color16to10: color16to10
  };

  // 去空
  var trim = function trim(v) {
    return v.replace(/^\s+|\s+$/g, '');
  };

  var trimLeft = function trimLeft(v) {
    return v.replace(/^\s*/g, '');
  };

  var trimRight = function trimRight(v) {
    return v.replace(/\s*$/, '');
  }; // 补位


  var padLeft = function padLeft(s, len, v) {
    return new Array(Math.max(0, len - s.length + 1)).join(v, '').substr(0, Math.max(len - s.length, 0)) + s;
  };

  var padRight = function padRight(s, len, v) {
    return s + new Array(Math.max(0, len - s.length + 1)).join(v, '').substr(0, Math.max(len - s.length, 0));
  }; // 翻转字符串


  var reverseString = function reverseString(v) {
    return v.split('').reverse().join('');
  }; // 随机字符串


  var randomString = function randomString(n) {
    var tmp = '',
        i = 0;

    for (; i < n; i++) {
      tmp += String.fromCharCode(Math.round(Math.random() * 26) + 97);
    }

    return tmp;
  };

  var string = {
    trim: trim,
    trimLeft: trimLeft,
    trimRight: trimRight,
    padLeft: padLeft,
    padRight: padRight,
    reverseString: reverseString,
    randomString: randomString
  };

  var trim$1 = string.trim;
  /**
   * 获取 url 参数
   */

  var getParams = function getParams() {
    var e = {},
        t = location.hash.slice(1) || '/',
        n = t.split('?')[1];
    if (!n) return e;
    n = n.split('&');

    for (var r = 0, len = n.length, f = void 0; r < len; r++) {
      f = n[r].split('='), e[f[0]] = f[1];
    }

    return e;
  };
  /**
   * 获取 cookie
   * @param {cookie key} name 
   * @param {[? 赋值]} value 
   */


  var cookie = function cookie(name, value) {
    if (!(value === void 0)) return document.cookie = name + '=' + value, true;
    var cookie = document.cookie.split(';'),
        e = {};

    for (var i = 0, len = cookie.length, kv = void 0; i < len; i++) {
      kv = cookie[i].split('='), kv[0] && kv[1] && (e[trim$1(kv[0])] = trim$1(kv[1]));
    }

    if (!(name === void 0)) return e[name];
    return e;
  }; // 获取 translate3
  // const getTranslate = v =>
  //   v.match(/^translate3?d?\(-?(\d+)px,\s*-?(\d+)px(.*)\)$/i)

  /**
   * 获取dom实际属性
   * @param {*} dom 
   * @param {String} v styleKey 
   */


  var getStyle = function getStyle(dom, v) {
    return document.defaultView.getComputedStyle(dom, null)[v];
  };

  var get = {
    getParams: getParams,
    cookie: cookie,
    // getTranslate,
    getStyle: getStyle
  };

  // ${*} 替换  // 参考es6 字符串模板
  var templateFmt = function templateFmt(str, data) {
    var t_str, t_key;

    while (str.includes('${')) {
      var a = str.indexOf('${'),
          b = str.indexOf('}');
      t_str = str.substring(a, b + 1);
      t_key = str.substring(a + 2, b);
      str = str.replace(t_str, data[t_key]);
    }

    return str;
  }; // string to html


  var stringToHtml = function stringToHtml(v) {
    var replaceList = function replaceList(str, re) {
      function _replace(a, b) {
        var arr = str.split(a);
        str = arr.join(b);
      }

      str = str || '';

      for (var key in re) {
        _replace(key, re[key]);
      }

      return str;
    };

    return replaceList(v, {
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
      '<': '&lt;',
      '>': '&gt;',
      ' ': '&nbsp;',
      '\t': '&#09;',
      '(': '&#40;',
      ')': '&#41;',
      '*': '&#42;',
      '+': '&#43;',
      ',': '&#44;',
      '-': '&#45;',
      '.': '&#46;',
      '/': '&#47;',
      '?': '&#63;',
      '\\': '&#92;',
      '\n': '<br>'
    });
  };

  var html = {
    templateFmt: templateFmt,
    stringToHtml: stringToHtml
  };

  // base64 => FormData  使用 blob > ie9
  var base64ToFormData = function base64ToFormData(base64String) {
    var bytes = window.atob(base64String.split(',')[1]),
        bff = new ArrayBuffer(bytes.length),
        ut = new Uint8Array(bff);

    for (var i = 0, len = bytes.length; i < len; i++) {
      ut[i] = bytes.charCodeAt(i);
    }

    var type = '';

    try {
      type = base64String.split(';')[0].split(':')[1];
    } catch (err) {
      type = 'image/png';
    }

    var blob = new Blob([bff], {
      type: type
    }),
        fd = new FormData();
    fd.append('file', blob, Date.now() + '.' + type.split('/')[1]);
    return fd;
  };

  var img = {
    base64ToFormData: base64ToFormData
  };

  var isArray$1 = check.isArray,
      isObject$1 = check.isObject,
      isString$1 = check.isString; // 清空冻结

  var emptyObject = function emptyObject() {
    return Object.freeze({});
  }; // 深层拷贝


  var newSpace = function newSpace(d, f) {
    if (f !== void 0) return JSON.parse(JSON.stringify(d));

    if (isArray$1(d)) {
      if (d.length == 0 || d.length > 0 && !isArray$1(d[0]) && !isObject$1(d[0])) return Object.assign([], d, []);
      return d.map(function (v) {
        return newSpace(v);
      });
    }

    if (isObject$1(d)) {
      var nd = new Object();

      for (var p in d) {
        nd[p] = newSpace(d[p]);
      }

      return nd;
    }

    return d;
  }; // 深层 string -> json 转换 (string to json)


  var deepParse = function deepParse(d) {
    if (isArray$1(d)) {
      for (var i = 0; d[i]; i++) {
        d[i] = deepParse(d[i]);
      }

      return d;
    }

    if (isObject$1(d)) {
      for (var p in d) {
        d[p] = deepParse(d[p]);
      }

      return d;
    }

    if (isString$1(d)) {
      try {
        d = JSON.parse(d);
      } catch (e) {}

      if (isString$1(d)) return d;
      return deepParse(d);
    }

    return d;
  }; // 循环


  function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') return;
    if (_typeof(obj) !== 'object') obj = [obj];

    if (isArray$1(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }

      return;
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  } // array 去重


  var unRepeat = function unRepeat(arr) {
    if ('Set' in window) return _toConsumableArray(new Set(arr));
    var list = Array.prototype.concat.apply([], arr);
    return list.filter(function (item, i) {
      return i == list.indexOf(item);
    });
  }; // 混入


  var merge = function merge(v) {
    var ret = {};

    function assignValue(val, key) {
      if (_typeof(ret[key]) === 'object' && _typeof(val) === 'object') {
        ret[key] = merge(ret[key], val);
      } else {
        ret[key] = val;
      }
    }

    for (var i = 0, l = v.length; i < l; i++) {
      forEach(v[i], assignValue);
    }

    return ret;
  }; // 转object


  var toObject = function toObject(v) {
    if (v === null || v === undefined) throw TypeError();
    return Object(v);
  };

  var json = {
    emptyObject: emptyObject,
    newSpace: newSpace,
    deepParse: deepParse,
    forEach: forEach,
    unRepeat: unRepeat,
    merge: merge,
    toObject: toObject
  };

  // xxx°xx.xx' => xxx.xx
  var stringToLatlng = function stringToLatlng(v) {
    return v.match(/^(\d*)°(\d*\.\d{2})[′'][NEWS]?$/i).splice(1, 2).map(function (c, i) {
      return i ? (parseFloat(c) / 60).toString().split('.')[1] : c;
    }).join('.');
  }; // xxx.xx => xx°xx'xx"


  var latlngToString = function latlngToString(v) {
    var f = Math.abs(v),
        f1 = Math.floor(f),
        f2 = Math.floor((f - f1) * 60),
        f3 = Math.round((f - f1) * 3600 % 60);
    return f1 + '°' + f2 + "'" + f3 + '"';
  };
  /**
   * [lng, lat] => [lat, lng]
   * @param {经纬度数组} latlngs 
   * @param {数组层级} deep 
   */


  var fmtLatLng = function fmtLatLng(latlngs, deep) {
    if (!deep) return [latlngs[1], latlngs[0]];
    deep--;

    for (var i = 0, len = latlngs.length; i < len; i++) {
      latlngs[i] = fmtLatLng(latlngs[i], deep);
    }

    return latlngs;
  };

  var latlng = {
    stringToLatlng: stringToLatlng,
    latlngToString: latlngToString,
    fmtLatLng: fmtLatLng
  };

  var isNumber$1 = check.isNumber; // 转为数字

  var toNumber = function toNumber(v) {
    var n = parseFloat(v);
    return isNumber$1(n) ? v : n;
  }; // 转int


  var toInteger = function toInteger(n) {
    n = Number(n);
    if (isNaN(n)) return 0;
    if (n === 0 || n === Infinity || n === -Infinity) return n;
    return (n < 0 ? -1 : 1) * floor(abs(n));
  }; // 强制转为数字


  var toAbsNum = function toAbsNum(v) {
    v = v.toString().replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    if (v === '') v = 0;
    return +v;
  };

  var number = {
    toNumber: toNumber,
    toInteger: toInteger,
    toAbsNum: toAbsNum
  };

  var isString$2 = check.isString; // 排序 v(array|string) order(asc|desc) by(对象数组排序key)

  var sort = function sort(v, _ref) {
    var _ref$order = _ref.order,
        order = _ref$order === void 0 ? 'asc' : _ref$order,
        by = _ref.by;
    if (isString$2(v)) v = v.split('');
    var f = [2, 0];
    if (order.toLowerCase() === 'desc') f.reverse();
    v.sort(function (a, b) {
      var m = a[by] === void 0 ? a : a[by],
          n = b[by] === void 0 ? b : b[by],
          c = m > n ? f[0] : f[1];
      return c - 1;
    });
    return v;
  }; // 归并排序


  var mergeSort = function mergeSort(arr, order, by) {
    var len = arr.length;

    if (len < 2) {
      return arr;
    }

    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return mergeValue(mergeSort(left, order, by), mergeSort(right, order, by), order, by);
  };

  function mergeValue(left, right, order, by) {
    var result = [];

    while (left.length && right.length) {
      var l = left[0];
      var r = right[0];

      if (by !== void 0) {
        l = l[by];
        r = r[by];
      }

      if (order && l <= r || !order && l >= r) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    while (left.length) {
      result.push(left.shift());
    }

    while (right.length) {
      result.push(right.shift());
    }

    return result;
  }

  var sort$1 = {
    sort: sort,
    mergeSort: mergeSort
  };

  // webapi 时间格式化
  var webapiTime = function webapiTime(v) {
    return new Date(v.replace(/^(\d{4})-(\d{2})-(\d{2})[ T](.*)$/, '$1/$2/$3 $4'));
  };

  var time = {
    webapiTime: webapiTime
  };

  // setImmediate
  var setImmediate = function setImmediate(callback) {
    var params = [].slice.call(arguments, 1);
    return window.setTimeout(function () {
      callback.apply(null, params);
    }, 0);
  }; // clearImmediate


  var clearImmediate = function clearImmediate(handle) {
    window.clearTimeout(handle);
  }; // encodeURIComponent


  var encode = function encode(v) {
    return encodeURIComponent(v);
  }; // decodeURIComponent


  var decode = function decode(v) {
    return decodeURIComponent(v);
  };

  var window$1 = {
    setImmediate: setImmediate,
    clearImmediate: clearImmediate,
    encode: encode,
    decode: decode
  };

  /**
   * 
   * @param {mouseEvent} event 
   * @param {dom} dom 
   */
  var calcMousePosition = function calcMousePosition(event, dom) {
    if (!event || !dom) return false;
    var box = dom.getBoundingClientRect();
    var d = dom.ownerDocument.documentElement;
    var dx = box.left + window.pageXOffset - d.clientLeft;
    var dy = box.top + window.pageYOffset - d.clientTop; // return {
    //   x: ((event.clientX - dx) / dom.clientWidth) * 2 - 1,
    //   y: -((event.clientY - dy) / dom.clientHeight) * 2 + 1
    // }

    return {
      x: event.clientX - dx,
      y: event.clientY - dy
    };
  };

  var mouse = {
    calcMousePosition: calcMousePosition
  };

  var index = _objectSpread({}, check, color, get, html, img, json, latlng, number, sort$1, string, time, window$1, mouse);

  return index;

}));
