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
        <dv-border-box-3>
          <bar2 :id="'bar2'"></bar2>
        </dv-border-box-3>
      </div>
      <div class="branch">
        <dv-border-box-2>
          <bar3 :id="'bar3'"></bar3>
        </dv-border-box-2>
      </div>
    </div>

    <!-- 中间 -->
    <div class="center">
      <div class="branch">
        <dv-border-box-4>
          <bar4 :id="'bar4'"></bar4>
        </dv-border-box-4>
      </div>
      <div class="branch">
        <dv-border-box-4 :reverse="true">
          <bar5 :id="'bar5'"></bar5>
        </dv-border-box-4>
      </div>
      <div class="branch">
        <Bar6 :id="'Bar6'" />
      </div>
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
  import bar3 from './charts/bar3'
  import bar4 from './charts/bar4'
  import bar5 from './charts/bar5'
  import Bar6 from './charts/bar6'
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
      bar2,
      bar3,
      bar4,
      bar5,
      Bar6
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