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
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
  import pie1 from './charts/pie1'
  import pie2 from './charts/pie2'
  import pie3 from './charts/pie3'
  export default {
    data() {
      return {

      }
    },
    components: { pie1,pie2,pie3 }
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