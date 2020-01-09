(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.downloadHelp = factory());
}(this, function () { 'use strict';

  /**
   * 文件下载
   * @param {地址或数据} data 
   * @param {名称} strFileName 
   * @param {[类型?]} strMimeType 
   */
  let download = function (data, strFileName, strMimeType) {

    let self = window,
      defaultMime = 'application/octet-stream',
      mimeType = strMimeType || defaultMime,
      payload = data,
      url = !strMimeType && payload,
      anchor = document.createElement('a'),
      toString = function(a) {
        return String(a)
      },
      myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
      fileName = strFileName || 'download',
      blob,
      reader;

    myBlob = myBlob.call ? myBlob.bind(self) : Blob;

    if (String(this) === 'true') {

      payload = [payload, mimeType];
      mimeType = payload[0];
      payload = payload[1];
      
    }

    if (url && url.length < 2048) {

      fileName =
        strFileName ||
        url
          .split('/')
          .pop()
          .split('?')[0];

      anchor.href = url;

      let ajax = new XMLHttpRequest();

      ajax.open('GET', url, true);
      ajax.responseType = 'blob';
      ajax.onload = function(e) {
        download(e.target.response, fileName, defaultMime);
      };

      setTimeout(function() {

        ajax.send();

      }, 0);

      return ajax

    }

    if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) {

      if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {

        payload = dataUrlToBlob(payload);
        mimeType = payload.type || defaultMime;

      } else {

        return navigator.msSaveBlob
          ? navigator.msSaveBlob(dataUrlToBlob(payload), fileName)
          : saver(payload)

      }

    } else {

      if (/([\x80-\xff])/.test(payload)) {

        let i = 0,
          tempUiArr = new Uint8Array(payload.length),
          mx = tempUiArr.length;

        for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);

        payload = new myBlob([tempUiArr], { type: mimeType });

      }

    }

    blob =
      payload instanceof myBlob
        ? payload
        : new myBlob([payload], { type: mimeType });

    function dataUrlToBlob(strUrl) {

      let parts = strUrl.split(/[:;,]/),
        type = parts[1],
        indexDecoder = strUrl.indexOf('charset') > 0 ? 3 : 2,
        decoder = parts[indexDecoder] == 'base64' ? atob : decodeURIComponent,
        binData = decoder(parts.pop()),
        mx = binData.length,
        i = 0,
        uiArr = new Uint8Array(mx);

      for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

      return new myBlob([uiArr], { type: type })

    }

    function saver(url, winMode) {

      if ('download' in anchor) {

        anchor.href = url;
        anchor.setAttribute('download', fileName);
        anchor.className = 'download-js-link';
        anchor.innerHTML = 'downloading...';
        anchor.style.display = 'none';
        anchor.addEventListener('click', function(e) {
          e.stopPropagation();
          try {
            this.removeEventListener('click', arguments.callee);
          } catch (e) {}
        });
        document.body.appendChild(anchor);

        setTimeout(function() {

          anchor.click();
          document.body.removeChild(anchor);

          if (winMode === true) {

            setTimeout(function() {

              self.URL.revokeObjectURL(anchor.href);

            }, 250);

          }

        }, 66);

        return true

      }

      if (
        /(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)
      ) {

        if (/^data:/.test(url))
          url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);

        if (!window.open(url)) {
          if (
            confirm(
              'Displaying New Document\n\nUse Save As... to download, then click back to return to this page.'
            )
          ) {

            location.href = url;

          }
        }

        return true

      }

      let f = document.createElement('iframe');

      document.body.appendChild(f);

      if (!winMode && /^data:/.test(url)) {

        url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);

      }

      f.src = url;

      setTimeout(function() {

        document.body.removeChild(f);

      }, 333);

    }

    if (navigator.msSaveBlob) {

      return navigator.msSaveBlob(blob, fileName)

    }

    if (self.URL) {

      saver(self.URL.createObjectURL(blob), true);

    } else {

      if (typeof blob === 'string' || blob.constructor === toString) {

        try {

          return saver('data:' + mimeType + ';base64,' + self.btoa(blob))

        } catch (y) {

          return saver('data:' + mimeType + ',' + encodeURIComponent(blob))

        }

      }

      reader = new FileReader();

      reader.onload = function(e) {

        saver(this.result);
        
      };

      reader.readAsDataURL(blob);

    }

    return true
    
  };

  return download;

}));
