(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.canvas = factory());
}(this, function () { 'use strict';

  /**
   * canvas 转 png 图片
   * @param {canvas} canvas 
   * @param {name:名称, bgc:背景色} param1 
   */
  var saveCanvas = function saveCanvas(canvas, _ref) {
    var _ref$name = _ref.name,
        name = _ref$name === void 0 ? Math.random() : _ref$name,
        _ref$bgc = _ref.bgc,
        bgc = _ref$bgc === void 0 ? '#fff' : _ref$bgc;
    if (!canvas) return;

    var _can = document.createElement('canvas'),
        h = canvas.offsetHeight,
        w = canvas.offsetWidth;

    _can.height = h;
    _can.width = w;

    var _ctx = _can.getContext('2d');

    _ctx.fillStyle = bgc;

    _ctx.fillRect(0, 0, w, h);

    var pattern = _ctx.createPattern(canvas, 'repeat');

    _ctx.fillStyle = pattern;

    _ctx.fillRect(0, 0, w, h);

    _can.toBlob(function (blob) {
      saveAs(blob, name + '.png');
    });
  };
  /**
   * 设置样式
   * @param {canvas.getContext('2d')} ctx 
   * @param {样式} style 
   */


  var setStyle = function setStyle(ctx, style) {
    if (style == void 0) return;

    for (var p in style) {
      if (p.charAt(0) !== '_') {
        ctx[p] = style[p];
      }
    }

    var _dash = !!style['_dash'] ? style['_dash'] : [];

    ctx.setLineDash(_dash);
    if (!style['_fillType'] || !!style['_fillType'] && style['_fillType'] == 'entity') return; // 特殊填充样式

    var newCanvas = document.createElement('canvas'),
        imgCtx = newCanvas.getContext('2d'),
        pattern,
        def;
    newCanvas.height = newCanvas.width = 10;
    imgCtx.strokeStyle = style.fillStyle || '#000090';

    switch (style['_fillType']) {
      case 'vertical':
        // 垂直线
        imgCtx.moveTo(5, 0);
        imgCtx.lineTo(5, 10);
        break;

      case 'horizontal':
        // 水平线
        imgCtx.moveTo(0, 5);
        imgCtx.lineTo(10, 5);
        break;

      case 'cross':
        // 十字
        imgCtx.moveTo(0, 5);
        imgCtx.lineTo(10, 5);
        imgCtx.moveTo(5, 0);
        imgCtx.lineTo(5, 10);
        break;

      case 'diagonal':
        // 斜线
        imgCtx.moveTo(0, 0);
        imgCtx.lineTo(10, 10);
        break;

      case 'backDiagonal':
        // 反斜线
        imgCtx.moveTo(10, 0);
        imgCtx.lineTo(0, 10);
        break;

      default:
        def = true;
        break;
    }

    imgCtx.stroke();
    if (def) return;
    pattern = ctx.createPattern(newCanvas, 'repeat');
    ctx.fillStyle = pattern || style.fillStyle;
  }; // 两点 绘制椭圆 { x, y }

  /**
   * 椭圆绘制
   * @param {canvas.getContext('2d')} ctx 
   * @param {[{x, y}, {x, y}]} p 
   * @param {绘制样式} style 
   */


  var drawEllipse = function drawEllipse(ctx, p, style) {
    setStyle(style);
    var k = 0.5522848,
        x = p[0].x,
        y = p[0].y,
        a = Math.abs(p[1].x - x),
        b = Math.abs(p[1].y - y),
        ox = a * k,
        oy = b * k;
    ctx.beginPath();
    ctx.moveTo(x - a, y);
    ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
    ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
    ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
    ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };
  /**
   * 线尾部箭头绘制
   * @param {canvas.getContext('2d')} ctx 
   * @param {线数组} p 
   * @param {绘制样式} style 
   */


  var drawJt = function drawJt(ctx, p, style) {
    setStyle(style);
    var e = p[p.length - 1],
        b = p[p.length - 2],
        theta = 30,
        headlen = 10,
        angle = Math.atan2(b.y - e.y, b.x - e.x) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.beginPath();
    ctx.moveTo(e.x, e.y);
    ctx.lineTo(e.x + topX, e.y + topY);
    ctx.lineTo(e.x + botX, e.y + botY);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = d.style.lineWidth;
    ctx.setLineDash([]);
    ctx.fill('evenodd');
    ctx.stroke();
  };
  /**
   * 文字绘制
   * @param {canvas.getContext('2d')} ctx 
   * @param {x, y, text: 文字, h: 高度/字体大小} p 
   * @param {绘制样式} style 
   */


  var drawText = function drawText(ctx, p, style) {
    setStyle(style);
    var rotate = style.rotate * Math.PI / 180 || 0;
    !!rotate && ctx.save();

    if (style.vertical) {
      var textArr = p.text.split(''),
          w = 0,
          h = textArr.length * (p.h + 4),
          dar = textArr.map(function (child, c) {
        var tY = p.y + c * (p.h + 4),
            tw = ctx.measureText(child).width;
        w = Math.max(w, tw);
        return [child, p.x, tY, tw];
      });

      if (!!rotate) {
        ctx.translate(p.x + w / 2, p.y + h / 2 - p.h);
        ctx.rotate(rotate);
        dar.map(function (c) {
          ctx.fillText(c[0], -c[3] / 2, c[2] - p.y - h / 2 + p.h);
          !!p.underline && ctx.fillRect(-c[3] / 2, c[2] - p.y - h / 2 + p.h, c[3], 1);
        });
      } else {
        dar.map(function (c) {
          ctx.fillText(c[0], c[1], c[2]);
          !!p.underline && ctx.fillRect(c[1], c[2], c[3], 1);
        });
      }

      !!rotate && ctx.restore();
      return;
    }

    var tw = ctx.measureText(p.text).width;

    if (!!rotate) {
      ctx.translate(p.x + tw / 2, p.y - p.h / 2);
      ctx.rotate(rotate);
      ctx.fillText(p.text, -tw / 2, p.h / 2);
      !!p.underline && ctx.fillRect(-tw / 2, p.h / 2, tw, 1);
    } else {
      ctx.fillText(p.text, p.x, p.y);
      !!p.underline && ctx.fillRect(p.x, p.y, tw, 1);
    }

    !!rotate && ctx.restore();
  };
  /**
   * 点色值处理
   * @param {canvas} canvas 
   * @param {function: 色值处理规则fun([r, g, b, a])} rule 
   */


  var dealPointColor = function dealPointColor(canvas, rule) {
    var ctx = canvas.getContext('2d');
    var d = ctx.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0, len = d.data.length; i < len; i += 4) {
      var deal = rule([d[i], d[i + 1], d[i + 2], d[i + 3]]);
      d[i] = deal[0];
      d[i + 1] = deal[1];
      d[i + 2] = deal[2];
      d[i + 1] = deal[3];
    }

    ctx.putImageData(d, 0, 0);
  };

  var canvas = {
    saveCanvas: saveCanvas,
    setStyle: setStyle,
    drawEllipse: drawEllipse,
    drawJt: drawJt,
    drawText: drawText,
    dealPointColor: dealPointColor
  };

  return canvas;

}));
