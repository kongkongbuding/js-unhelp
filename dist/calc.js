(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.calc = factory());
}(this, function () { 'use strict';

  /**
   * 计算两点距离
   * @param {{x:number, y: number}} p1 
   * @param {{x:number, y: number}} p2 
   */
  var dist = function dist(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };
  /**
   * 点在面内
   * @param {*} point 
   * @param {*} polygon 
   */


  var hitArea = function hitArea(point, polygon) {
    var x = point[0];
    var y = point[1];
    var inside = false;

    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      var xi = polygon[i][0];
      var yi = polygon[i][1];
      var xj = polygon[j][0];
      var yj = polygon[j][1];
      var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };
  /**
   * @ 点在线上
   * @param lp 点坐标
   * @param _l_ll 线数据
   * @param _l_d 命中误差
   * @param loop 是否封闭
   * @param returnI 查询击中线段序列
   */


  var hitLine = function hitLine(lp, _l_ll, _l_d, loop, returnI) {
    var hit = false;
    var index = -1;
    if (_l_ll.length < 2) return hit;
    if (!!loop) _l_ll.push(_l_ll[0]);

    for (var i = 0, _l_len = _l_ll.length - 1; i < _l_len; i++) {
      var _l_a = _l_ll[i];
      var _l_b = _l_ll[i + 1];

      if (lp.x < Math.max(_l_a.x, _l_b.x) + _l_d && lp.x > Math.min(_l_a.x, _l_b.x) - _l_d && lp.y < Math.max(_l_a.y, _l_b.y) + _l_d && lp.y > Math.min(_l_a.y, _l_b.y) - _l_d) {
        if (_l_a.x == _l_b.x) {
          if (Math.abs(lp.x - _l_a.x) <= _l_d) {
            hit = true;
            index = i + 1;
            break;
          }
        } else if (_l_a.y == _l_b.y) {
          if (Math.abs(lp.y - _l_a.y) <= _l_d) {
            hit = true;
            index = i + 1;
            break;
          }
        } else {
          var _la = _l_b.y - _l_a.y,
              _lb = _l_a.x - _l_b.x,
              _lc = _l_a.y * _l_b.x - _l_a.x * _l_b.y,
              _l_calc_d = Math.abs((_la * lp.x + _lb * lp.y + _lc) / Math.sqrt(Math.pow(_la, 2) + Math.pow(_lb, 2)));

          if (_l_calc_d <= _l_d) {
            hit = true;
            index = i + 1;
            break;
          }
        }
      }
    }

    if (!!returnI) return {
      hit: hit,
      index: index
    };
    return hit;
  };
  /**
   * @ 点在旋转矩形内
   * @param _trotate 旋转角度
   * @param _x x轴长度
   * @param _y y轴长度
   * @param _tx 中心点x
   * @param _ty 中心点y
   * @param lp 点击位置
   */


  var hitRect = function hitRect(_trotate, _x, _y, _tx, _ty, lp) {
    var _xy = Math.atan(_y / _x),
        _cgm = Math.abs((Math.atan((lp.y - _ty) / (lp.x - _tx)) - _trotate + Math.PI / 4) % Math.PI - Math.PI / 4) % Math.PI,
        __tML = _cgm > _xy && _cgm < Math.PI - _xy ? _y / Math.cos(Math.PI / 2 - _cgm) : Math.abs(_x / Math.cos(_cgm)),
        __tL = dist({
      x: lp.x,
      y: lp.y
    }, {
      x: _tx,
      y: _ty
    });

    return __tL < __tML;
  };
  /**
   * 阶乘 不能用for
   */


  var factorial = function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  };
  /**
   * 组合排序
   * @param {number} n 
   * @param {number} k 
   */


  var C = function C(n, k) {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };
  /**
   * 基函数
   */


  var BEZ = function BEZ(n, k, t) {
    return C(n, k) * Math.pow(t, k) * Math.pow(1 - t, n - k);
  };
  /**
   * bezier
   */


  var PBezier = function PBezier(arr, l, t) {
    var px = 0,
        py = 0,
        n = l - 1;

    for (var i = 0, b; i < l; i++) {
      b = BEZ(n, i, t);
      px += arr[i].x * b;
      py += arr[i].y * b;
    }

    return [px, py];
  };
  /**
   * 最大差值
   * @param {array} v 
   */


  var getMaxProfit = function getMaxProfit(v) {
    if (v.length < 2) return 0;
    var mP = v[0],
        max = 0,
        i = 0,
        len = v.length;

    for (; i < len; i++) {
      mP = Math.min(mP, v[i]), max = Math.max(max, v[i] - mP);
    }

    return max;
  };

  var calc = {
    dist: dist,
    hitArea: hitArea,
    hitLine: hitLine,
    hitRect: hitRect,
    factorial: factorial,
    PBezier: PBezier,
    getMaxProfit: getMaxProfit
  };

  return calc;

}));
