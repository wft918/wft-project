<template>
  <div style="width: 100%;height: 100%;overflow: auto;">
    <img v-for="item in imageList" :key="item" v-lazy="item" alt="" style="width: 100%;">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imageList:[
          require('@/assets/img/10.jpg'),
          require('@/assets/img/3.jpg'),
          require('@/assets/img/4.jpg'),
          require('@/assets/img/5.jpg'),
          require('@/assets/img/6.jpg'),
          require('@/assets/img/7.jpg'),
          require('@/assets/img/8.jpg'),
          require('@/assets/img/9.jpg'),
          require('@/assets/img/1.png')
        ]
      }
    }
  }
</script>