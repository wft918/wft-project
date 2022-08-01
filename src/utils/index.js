
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

export class SessionUtils {
  static get(key) {
    return JSON.parse(window.sessionStorage.getItem(key))
  }
  static set(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }
  static remove(key) {
    window.sessionStorage.removeItem(key)
  }
}

export class FindArrsById {
  constructor(id, tree) {
    this.id = id
    this.flatArr = this.flatTreeAndSetLevel.call(this, tree)
    this.parentAreas = this.getParentAreas.call(this, this.id, this.flatArr)
    this.getParentValuesByKey.bind(this)
  }

  flatTreeAndSetLevel(tree, level = 0) {
    const list = []
    tree.forEach(item => {
      const o = JSON.parse(JSON.stringify(item))
      if(o.children) delete o.children
      o.level = level
      list.push(o)
      if(item.children && item.children.length) {
        list.push(...this.flatTree(item.children, level + 1))
      }
    })
    return list
  }

  getParentAreas(pid, list) {
    const target = []
    const o = list.find(item => item.id == pid) || {}
    if(JSON.stringify(o) !== '{}') target.push(o)
    if(o.parentId) target.push(...this.getParentAreas(o.parentId, list))
    return target
  }

  getParentValuesByKey(key) {
    return this.parentAreas.map(item => item[key]).reverse()
  }
}

export default { deepClone }