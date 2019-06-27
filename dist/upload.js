(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.upload = factory());
}(this, function () { 'use strict';

  /**
   * 文件上传
   * @param {} opt 
   */
  function upload (opt) {
    var url = opt.url,
        data = opt.data,
        onprogress = opt.onprogress,
        success = opt.success,
        error = opt.error,
        file = opt.file,
        headers = opt.headers;
    var isIE = 'ActiveXObject' in window ? /MSIE (\d+)/.test(navigator.userAgent) ? RegExp.$1 : 11 : false;
    var ie = isIE && isIE < 10 && typeof XDomainRequest !== 'undefined';
    var xhr = ie ? new XDomainRequest() : new XMLHttpRequest();

    if (xhr.upload) {
      xhr.upload.onprogress = function (v) {
        if (v.total > 0) {
          v.percent = v.loaded / v.total * 100;
        }

        v.totalText = v.total < 1048576 ? Math.round(v.total / 1024) + 'KB' : (v.total / 1048576).toFixed(2) + 'MB';
        v.loadedText = v.loaded < 1048576 ? Math.round(v.loaded / 1024) + 'KB' : (v.loaded / 1048576).toFixed(2) + 'MB';
        v.percent = v.total ? (v.loaded / v.total * 100).toFixed(1) : 0;
        onprogress(v);
      };
    }

    var formData = new FormData();

    if (data) {
      Object.keys(data).forEach(function (key) {
        formData.append(key, data[key]);
      });
    }

    formData.append('file', file);

    xhr.onload = function () {
      if (xhr.status < 200 || xhr.status >= 300) {
        return error(xhr);
      }

      var text = xhr.responseText || xhr.response;

      if (text) {
        try {
          text = JSON.parse(text);
        } catch (e) {}
      }

      success(text);
    };

    xhr.onerror = function (e) {
      error(xhr);
    };

    xhr.open('POST', url, true);

    for (var p in headers) {
      if (headers.hasOwnProperty(p) && headers[p] !== null) {
        xhr.setRequestHeader(p, headers[p]);
      }
    }

    xhr.send(formData);
    return xhr;
  }

  return upload;

}));
