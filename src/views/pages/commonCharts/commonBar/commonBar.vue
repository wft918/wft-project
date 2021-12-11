<!-- 常用的柱状图 -->
<template>
  <div class="commonBar">
    <!-- 左边 -->
    <div class="left">
      <div class="branch">
        <dv-border-box-1>
          <bar1 :id="'bar1'" :xValue="xValue" :yValue1="yValue1" :yValue2="yValue2"></bar1>
        </dv-border-box-1>
      </div>
      <div class="branch">
        <dv-border-box-2>
          <bar2 :id="'bar2'"></bar2>
        </dv-border-box-2>
      </div>
      <div class="branch"></div>
    </div>

    <!-- 中间 -->
    <div class="center">
      <div class="branch"></div>
      <div class="branch"></div>
      <div class="branch"></div>
    </div>

    <!-- 右边 -->
    <div class="right">
      <div class="branch"></div>
      <div class="branch"></div>
      <div class="branch"></div>
    </div>
  </div>
</template>
<script>
  // import dvBorderBox1 from '@/components/dv-border-box/dv-border-box-1'
  import bar1 from './charts/bar1'
  import bar2 from './charts/bar2'
  export default {
    data() {
      return {
        xValue:[],
        yValue1:[],
        yValue2:[]
      }
    },
    components: {
      // dvBorderBox1
      bar1,
      bar2
    },
    mounted() {
      setTimeout(() => {
        this.xValue = ['202106','202105','202104','202103','202102','202101']
        this.yValue1 = [1,4,5,2,1,6]
        this.yValue2 = [2,5,6,3,2,7]
      },3000)
    },
    methods: {

    }
  }
</script>
<style scoped>
  .commonBar {
    width: 100%;
    height: 100%;
    background-color: #000723;
    display: flex;
    justify-content: space-between;
  }
  .left,
  .center,
  .right {
    width: 32.5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .branch {
    width: 100%;
    height: 32%;
    background-color: #1c233a;
  }
</style>