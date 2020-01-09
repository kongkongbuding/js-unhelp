(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.treeHelp = factory());
}(this, function () { 'use strict';

  /**
   * 根据id、pid 构建树形结构
   * @param {*} d 
   */
  var tree = function tree(d) {
    if (d.length === 0) return [];
    var remainArr = [],
        levelArr = [];
    var id = {};
    d.map(function (v) {
      id[v.id] = 1;
    });
    d.map(function (v) {
      v.children = [];

      if (id[v.pid] === void 0) {
        levelArr.push(v);
      } else {
        remainArr.push(v);
      }
    });
    var tree = repeatBuildLevel(levelArr, remainArr);
    return tree.lA;
  };

  var repeatBuildLevel = function repeatBuildLevel(lA, rA) {
    if (rA.length > 0 && lA.length > 0) {
      lA.map(function (v) {
        for (var len = rA.length, i = len - 1; i >= 0; i--) {
          if (v.id === rA[i].pid) {
            v.children.push(rA[i]);
            rA.splice(i, 1);
          }
        }
      });
      var n = lA.length - 1;

      while (n >= 0) {
        if (lA[n].children.length > 0) {
          var obj = repeatBuildLevel(lA[n].children, rA);
          lA[n].children = obj.lA;
          rA = obj.rA;
        }

        n--;
      }
    }

    return {
      lA: lA,
      rA: rA
    };
  };

  return tree;

}));
