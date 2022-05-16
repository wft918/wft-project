<template>
  <div class="mapContainer">
    <div class="map">
      <ChinaMap :id="'ChinaMap'" />
    </div>
    <div class="map"></div>
    <div class="map"></div>
    <div class="map"></div>
  </div>
</template>
<script>
import ChinaMap from './charts/chinaChart.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    ChinaMap
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
</style>
