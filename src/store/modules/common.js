export default {
  namespaced: true,
  state: {
    // 面包屑
    mainTabs:[]
  },
  mutations: {
    updatemainTabs(state,val) {
      if(val.constructor === Object) {
        if(state.mainTabs.every(item => item.path != val.path)) {
          state.mainTabs.push(val)
        }
      }else {
        state.mainTabs.splice(val,1)
      }
    }
  }
}