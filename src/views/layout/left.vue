<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <sub-menu v-for="(menu,index) in menuList" :key="menu.id" :menu="menu"></sub-menu>
    </el-menu>
  </div>
</template>
<script>
import subMenu from './left_submenu'
import menuData from '@/utils/leftMenu'
export default {
  data() {
    return {
      
    }
  },
  components: {
    subMenu
  },
  computed: {
    menuList() {
      return menuData
    }
  },
  mounted() {
    
  },
  methods: {

  }
}
</script>