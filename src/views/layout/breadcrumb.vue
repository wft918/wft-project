<!-- 面包屑组件 -->
<template>
  <div style="width:100%;height: 100%;overflow-x: auto;overflow-y: hidden;">
    <el-tabs v-model="currentNamePath" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
      <el-tab-pane :label="'首页'" :name="'/home'"></el-tab-pane>
      <el-tab-pane v-for="(mainTab,index) in mainTabs" :key="mainTab.path" :label="mainTab.meta.title" :name="mainTab.path" closable></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        breadcrumbList:[],
        currentNamePath:'/home'
      }
    },
    mounted() {

    },
    computed: {
      mainTabs: {
        get() {
          return this.$store.state.common.mainTabs
        },
        set(val) {
          this.$store.commit('common/updatemainTabs',val)
        }
      }
    },
    watch: {
      '$route': {
        handler(to,from) {
          if(to.path != '/home') {
            this.mainTabs = to
          }
          this.currentNamePath = to.path
        },
        deep:true,
        immediate:false  //第一次是否要监听到
      }
    },
    methods: {
      // 点击页签
      tabClick() {
        this.$router.replace({ path: this.currentNamePath })
      },
      // 移除页签
      tabRemove(namePath) {
        let mainTabPathList = this.mainTabs.map(item => item.path)
        let idx = mainTabPathList.indexOf(namePath)
        this.mainTabs = idx
        if(namePath === this.$route.path) {   //删除的是当前页面  考虑路由跳转问题   不一样不需要考虑
          if(!this.mainTabs.length) {  //删除之后没有长度
            this.$router.replace({ path: '/home' })
          }else if(idx === this.mainTabs.length) {  //删除的是最后一个
            this.$router.replace({path: this.mainTabs[idx - 1].path})
          }else {
            this.$router.replace({path: this.mainTabs[idx].path})
          }
        }
      }
    }
  }
</script>

<style scoped>
  /* 取消标签页的magin */
  /deep/ .el-tabs__header {
    margin: 0!important;
  }
  /* 设置tab标签页 */
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    height: .213542rem;
    text-align: center;
    line-height: .213542rem;
  }
  /* 设置tab标签页 */
  /deep/ .el-tabs__item {
    height: .208333rem;
    line-height: .208333rem;
    font-size: .083333rem;
    font-family: 'ysbth';
  }
</style>