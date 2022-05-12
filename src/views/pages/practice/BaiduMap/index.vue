<template>
  <div class="BaiduMap">
    <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
  </div>
</template>
<script>
export default {
  data() {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods:{
    handler ({BMap, map}) {
      setTimeout(() => {
        console.log(BMap, map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }, 2000)
    }
  },
}
</script>
<style scoped>
.BaiduMap {
  width: 100%;
  height: 100%;
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
