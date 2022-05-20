<!-- 常用的折线图 -->
<template>
  <div class="commonLine">
    <div class="lt">
      <div class="branch">
        <Line1 :id="'Line1'" />
      </div>
      <div class="branch"></div>
      <div class="branch"></div>
    </div>
    <div class="cen">
      <div class="branch"></div>
      <div class="branch"></div>
      <div class="branch"></div>
    </div>
    <div class="rt">
      <div class="branch"></div>
      <div class="branch"></div>
      <div class="branch"></div>
    </div>
  </div>
</template>
<script>
import Line1 from './charts/line1.vue'
export default {
  data() {
    return {};
  },
  components: {
    Line1
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.commonLine {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #000723;
}
.lt,
.cen,
.rt {
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.branch {
  width: 100%;
  height: 32.8%;
  background-color: #1c233a;
}
</style>