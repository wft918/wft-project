<template>

  <!-- 有子级 -->
  <el-submenu v-if="menu.children && menu.children.length" :index="menu.id">
    <template slot="title">
      <!-- <i class="el-icon-location"></i> -->
      <span>{{menu.name}}</span>
    </template>
    <!-- 递归 -->
    <sub-menu v-for="(item,i) in menu.children" :key="item.id" :menu="item"></sub-menu>
  </el-submenu>


  <!-- 无子级 -->
  <el-menu-item v-else :index="menu.id" @click="gotoRouteHandle(menu)">
    <!-- <i class="el-icon-menu"></i> -->
    <span slot="title">{{menu.name}}</span>
  </el-menu-item>

</template>
<script>
  import subMenu from './left_submenu'
  export default {
    name:'sub-menu', //递归组件一定要有name
    data() {
      return {

      }
    },
    components: {
      subMenu
    },
    props: {
      menu: {
        type: Object
      }
    },
    methods: {
      gotoRouteHandle(menu) {
        if(menu.path) {
          this.$router.replace(menu.path)
        }
      }
    }
  }
</script>