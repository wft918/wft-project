<template>
  <div class="commonPie">
    <div>
      <div>
        <pie1 :id="'pie1'"></pie1>
      </div>
      <div>
        <pie2 :id="'pie2'"></pie2>
      </div>
      <div>
        <pie3 :id="'pie3'"></pie3>
      </div>
    </div>
    <div>
      <div>
        <Gauge />
      </div>
      <div>
        <Pie4 :id="'Pie4'" />
      </div>
      <div>
        <Pie5 :id="'Pie5'" />
      </div>
    </div>
    <div>
      <div>
        <!-- 3D 不同高度 圆环-->
        <Pie6 :id="'Pie6'" />
      </div>
      <div>
        <!-- 3D 饼图 - 但是好像同一页面只能存在一个3D（这个没显示出来） -->
        <Pie7 :id="'Pie7'" />
      </div>
      <div></div>
    </div>
  </div>
</template>
<script>
import pie1 from './charts/pie1'
import pie2 from './charts/pie2'
import pie3 from './charts/pie3'
import Gauge from './charts/gauge'
import Pie4 from './charts/pie4.vue'
import Pie5 from './charts/pie5.vue'
import Pie6 from './charts/pie6.vue'
import Pie7 from './charts/pie7.vue'
export default {
  data() {
    return {

    }
  },
  components: { pie1, pie2, pie3, Gauge, Pie4, Pie5, Pie6, Pie7 }
}
</script>
<style scoped>
  .commonPie {
    width: 100%;
    height: 100%;
    background-color: #000723;
    display: flex;
    justify-content: space-between;
  }
  .commonPie > div {
    width: 32.5%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .commonPie > div > div {
    width: 100%;
    height: 32%;
    background-color: #1c233a;
  }
</style>