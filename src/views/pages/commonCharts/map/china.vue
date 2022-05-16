<template>
  <div class="mapContainer">
    <div class="map">
      <ChinaMap1 :id="'ChinaMap1'" />
    </div>
    <div class="map map2">
      <ChinaMap2 :id="'ChinaMap2'" />
    </div>
    <div class="map"></div>
    <div class="map"></div>
  </div>
</template>
<script>
import ChinaMap1 from './charts/chinaChart1.vue'
import ChinaMap2 from './charts/chinaChart2.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    ChinaMap1,
    ChinaMap2
  },
  methods:{

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
</style>
