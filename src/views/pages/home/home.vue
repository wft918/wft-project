<template>
  <div class="home">
    <div v-for="item in list" :key="item.age" style="font-family: ysbth;">{{item.name}}</div>
    <el-button @click="butClick">点击push</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[
        {
          name:'小红',
          age:13
        },
        {
          name:'小白',
          age:15
        },
        {
          name:'小黑',
          age:12
        },
      ],
      testList:[]
    }
  },
  mounted() {
    this.testList = this.$utils.deepClone(this.list)
  },
  methods: {
    butClick() {
      this.list.push({
        name:'哈哈哈',
        age:22
      })
      console.log(this.testList,'testlist----------------->')
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