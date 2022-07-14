<template>
  <div class="vue-count-to">
    <div class="count-to">
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
      <div>
        <CountTo :startVal='startVal' :endVal='endVal' :duration='duration' />
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
  data() {
    return {
      startVal: 0,
      endVal: 100,
      duration: 3000,
      timer: null
    }
  },
  components: {
    CountTo
  },
  mounted(){
    this.timer = setInterval(() => {
      this.endVal = this.endVal * 2
    }, 4000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
}
</script>
<style scoped>
.vue-count-to {
  width: 100%;
  height: 100%;
}
.count-to {
  width: 300px;
  height: 300px;
  margin: 100px 0 0 100px;
  border: 1px solid red;
}
.count-to span {
  font-size: 30px;
  font-weight: 700;
  font-family: 'YJSZ';
}
.count-to > div:nth-of-type(1) > span {
  color: red;
}
.count-to > div:nth-of-type(2) > span {
  color: blue;
}
.count-to > div:nth-of-type(3) > span {
  color: pink;
}
.count-to > div:nth-of-type(4) > span {
  color: yellow;
}
.count-to > div:nth-of-type(5) > span {
  color: green;
}
.count-to > div:nth-of-type(6) > span {
  color: orange;
}
.count-to > div:nth-of-type(7) > span {
  color: cyan;
}
.count-to > div:nth-of-type(8) > span {
  color: purple;
}
</style>
