<template>
  <div style="width: 100%;height: 100%;">
    <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#4891f7" text-color="#fff" active-text-color="#fff" :default-active="'1'" :unique-opened="true">
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
  /deep/ .el-submenu__title i {
    color: #fff!important;
  }
  /deep/ .el-menu-item:hover {
    background-color: #1d76f6!important;
  }
  /deep/ .el-submenu__title:hover {
    background-color: #1d76f6!important;
  }
</style>