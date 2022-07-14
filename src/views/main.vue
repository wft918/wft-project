<template>
  <div class="main">
    <div class="top">
      <Top />
    </div>
    <div class="bottom">
      <div class="left">
        <Left />
      </div>
      <div class="right">
        <div class="breadcrumb">
          <Breadcrumb />
        </div>
        <div class="content-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/utils/flexible'
import Top from './layout/top'
import Left from './layout/left'
import Breadcrumb from './layout/breadcrumb'
export default {
  data() {
    return {

    }
  },
  components: {
    Top,
    Left,
    Breadcrumb
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
    padding: 0 .104167rem;
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
    padding: .104167rem;
    box-sizing: border-box;
    background-color: #f5f7fa;
  }

  .breadcrumb {
    width: 100%;
    height: .213542rem;
    border-bottom: 1px solid #dcdfe6;
    box-sizing: border-box;
    background-color: #fff;
  }

  .content-main {
    width: 100%;
    height: calc(100% - .213542rem);
    padding: .052083rem;
    box-sizing: border-box;
    background-color: #fff;
  }
</style>
