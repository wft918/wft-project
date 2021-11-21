
// 深拷贝
export function deepClone(sourceObj) {
  const targetObj = sourceObj.constructor === Array ? [] : {}   // [] -> Array(基类)  {} -> Object
  for(let key in sourceObj) {
    if(sourceObj.hasOwnProperty(key)) {  //判断是否是自身含有的属性
      if(sourceObj[key] && typeof sourceObj[key] === 'object') {  //引用数据类型
        targetObj[key] = deepClone(sourceObj[key])  //递归
      }else {  //基本数据类型
        targetObj[key] = sourceObj[key]
      }
    }
  }
  return targetObj
}



export default {deepClone}