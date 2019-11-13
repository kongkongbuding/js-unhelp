/**
 * 根据id、pid 构建树形结构
 * @param {*} d 
 */
const tree = d => {

  if (d.length === 0) return []

  let remainArr = [], levelArr = []
  let id = {}

  d.map(v => {

    id[v.id] = 1

  })

  d.map(v => {

    v.children = []

    if (id[v.pid] === void 0) {

      levelArr.push(v)

    } else {

      remainArr.push(v)

    }

  })

  let tree = repeatBuildLevel(levelArr, remainArr)

  return tree.lA

}

const repeatBuildLevel = (lA, rA) => {

  if (rA.length > 0 && lA.length > 0) {

    lA.map(v => {

      for (let len = rA.length, i = len - 1; i >= 0; i--) {

        if (v.id === rA[i].pid) {

          v.children.push(rA[i])
          rA.splice(i, 1)

        }

      }

    })

    let n = lA.length - 1

    while (n >= 0) {

      if (lA[n].children.length > 0) {

        let obj = repeatBuildLevel(lA[n].children, rA)

        lA[n].children = obj.lA
        rA = obj.rA

      }

      n--

    }

  }

  return {

    lA,
    rA

  }
  
}

export default tree
