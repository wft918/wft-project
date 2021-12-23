<template>
  <div class="home">
        <div
          v-for="(item,index) in 3"
          :key="item"
          :ref="'div' + index"
          :data-index="index"
          :id="'div' + index">
          test{{item}}
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:' '
    }
  },
  components: {
    
  },
  mounted() {
    // 这里通过id的方式去获取data- 正常获取
    for(let i = 0; i < 3; i++) {
      let ids = document.getElementById(`div${i}`)
      console.log(ids.dataset)
    }

    /*
     * 这里通过ref的方式来获取，出现一点点小问题
     * 正常给一个 dom 元素绑定 ref ，我们通过this.$refs可以正常拿到dom元素；给组件绑定ref，我们可以通过this.$refs去调用组件的方法等等
     * 但是这里，ref 和 v-for 一起使用的时候却一直拿不到，打印发现拿到是个数组，第一项才是我们要的dom元素，我也不知道为啥，就直接采用了下标的方式取的
     * 
     * 官方解释：当 ref 和 v-for 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。
     */
    for(let i = 0; i < 3; i++) {
      let divRefs = `div${i}`
      console.log(this.$refs[divRefs][0].dataset)
    }
  },
  methods: {
    butClick() {
      
    }
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>