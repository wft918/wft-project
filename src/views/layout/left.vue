<template>
  <div style="width: 100%;height: 100%;background-color: #4891f7;overflow: auto;">
    <el-menu class="el-menu-vertical-demo" background-color="#4891f7" text-color="#fff" active-text-color="#fff" :default-active="'11'" :unique-opened="true">
      <sub-menu v-for="(menu,index) in menuList" :key="menu.id" :menu="menu"></sub-menu>
    </el-menu>
  </div>
</template>
<script>
import subMenu from './left_submenu'
import { menuListMixin } from '@/mixins/menuList'
export default {
  data() {
    return {
      
    }
  },
  mixins:[menuListMixin],
  components: {
    subMenu
  },
  mounted() {
    
  },
  methods: {

  }
}
</script>

<style scoped>
  /* 箭头颜色 */
  /deep/ .el-submenu__title i {
    color: #fff!important;
  }
  /* 箭头大小 */
  /deep/ .el-submenu__icon-arrow {
    margin-top: -0.036458rem;
    font-size: .0625rem;
  }
  /deep/ .el-menu-item:hover {
    background-color: #1d76f6!important;
  }
  /deep/ .el-submenu__title:hover {
    background-color: #1d76f6!important;
  }
  /deep/ .el-submenu__title {
    height: .291667rem;
    font-size: .072917rem;
    line-height: .291667rem;
    padding: 0 .104167rem!important;
  }
  /deep/ .el-menu-item {
    height: .291667rem;
    font-size: .072917rem;
    line-height: .291667rem;
    padding: 0 .234375rem!important;
  }

  /deep/ .el-submenu .el-menu-item {
    min-width: 1.041667rem;
  }
</style>