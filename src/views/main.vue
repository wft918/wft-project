<template>
  <div class="main">
    <div class="top">
      <top></top>
    </div>
    <div class="bottom">
      <div class="left">
        <left></left>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import top from './layout/top'
import left from './layout/left'
export default {
  data() {
    return {

    }
  },
  components: {
    top,
    left
  },
  mounted() {

  }
};
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }

  .top {
    width: 100%;
    height: 7%;
    background: #b3c0d1;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .bottom {
    width: 100%;
    height: 93%;
    display: flex;
  }

  .left {
    width: 12%;
    height: 100%;
    background-color: #d3dce6;
  }
  
  .right {
    width: 88%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f5f7fa;
  }
</style>
