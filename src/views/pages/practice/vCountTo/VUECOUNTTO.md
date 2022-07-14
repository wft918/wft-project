# vue-count-to 数字滚动组件

# NPM 官网
https://www.npmjs.com/package/vue-count-to

# 安装
npm install vue-count-to

# 组件内按需使用
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

# 效果
...

# 注意
vue-count-to组件最终编译出来就是个span标签；就像router-link编译出来为a标签一样
所以我们给数字滚动设置样式的时候，直接把它当作span标签就可以

vue-count-to只适用于vue2
vue3要使用vue3-count-to(但是经过测试发现，vue3-count-to还有问题。不报错，并且用不了)

# dataV中的数字翻牌器官网
http://datav.jiaminghi.com/guide/digitalFlop.html

这个也可以实现，这个就类似个组件库，包比较大，还有其他的一些效果
如果仅仅是实现这个数字滚动的话，还是使用vue-count-to方便一些
