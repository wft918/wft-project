<template>
  <div class="mapContainer">
    <div class="map">
      <ChinaMap1 :id="'ChinaMap1'" />
    </div>
    <div class="map map2">
      <ChinaMap2 :id="'ChinaMap2'" />
    </div>
    <div class="map">
      <div class="cityHierarchy">
        <el-breadcrumb separator=">>">
          <el-breadcrumb-item v-for="item in cityParams" :key="item" @click.native="toMap(item)">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="eMap">
        <Emap :id="'Emap'" :cityName="cityName" @mapClick="nextMap" @mapContextmenu="backMap" />
      </div>
    </div>
    <div class="map"></div>
  </div>
</template>
<script>
import ChinaMap1 from './charts/chinaChart1.vue'
import ChinaMap2 from './charts/chinaChart2.vue'
import Emap from './charts/emap.vue'
export default {
  data() {
    return {
      cityName: '全国',
      cityParams: ['全国']
    }
  },
  components: {
    ChinaMap1,
    ChinaMap2,
    Emap
  },
  methods:{
    //  地图下钻
    nextMap(name) {
      // 先获取数据，数据获取到之后再更新cityName 完成下钻
      let toRegion = ['山东省', '济南市', '菏泽市']  // 这是可以进行下钻的地区
      let lastRegion = ['郓城县', '鄄城县']  // 这是最后一层的地区
      if(toRegion.indexOf(name) >= 0) {
        this.cityName = name
        this.cityParams.push(name)
      }
      if(lastRegion.indexOf(name) > 0) {// 这里注意，下钻到最后一级的时候就不要push了，这是为了上钻
        // 点击最后一层时候做些什么事
      }
    },
    // 地图上钻
    backMap() {
      if(this.cityParams.length > 1) {
        this.cityName = this.cityParams.pop()
      } else {
        this.cityName = '全国'
      }
    },
    // 点击上方面包屑
    toMap(name) {
      this.cityName = name
    }
  },
}
</script>
<style scoped>
.mapContainer {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /* align-content: ; */
}
.map {
  width: 48%;
  height: 48%;
  -webkit-box-shadow:0 0 10px #0CC;
  -moz-box-shadow:0 0 10px #0CC;
  box-shadow:0 0 10px #0CC;
}
.map2 {
  background: linear-gradient(to bottom , #1140ac, #0e2766, #0c2558);
}
.cityHierarchy {
  width: 100%;
  height: 35px;
}
.eMap {
  width: 100%;
  height: calc(100% - 35px);
}
</style>
