
// ° => 弧度
const degToRad = d => d * Math.PI / 180

// 弧度 => °
const radToDeg = r => r * 180 / Math.PI;

// 范围随机数
const rand = (min, max) => Math.random() * (max - min) + min

// 随机汉子
const randomChineseWord = () => eval('"\\u' + Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16) + '"')

// 模(%) , 正值
const eMod = (x, n) => x >= 0 ? (x % n) : ((n - (-x % n)) % n)

export default {

  degToRad,
  radToDeg,
  rand,
  randomChineseWord,
  eMod
  
}
