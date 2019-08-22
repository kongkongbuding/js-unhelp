/**
 * 
 * @param {mouseEvent} event 
 * @param {dom} dom 
 */
const calcMousePosition = (event, dom) => {
  if (!event || !dom) return false
  let box = dom.getBoundingClientRect()
  let d = dom.ownerDocument.documentElement;
  let dx = box.left + window.pageXOffset - d.clientLeft;
  let dy = box.top + window.pageYOffset - d.clientTop;
  return {
    x: ((event.clientX - dx) / dom.clientWidth) * 2 - 1,
    y: -((event.clientY - dy) / dom.clientHeight) * 2 + 1
  }
}

export default {
  calcMousePosition
}
