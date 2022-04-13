<template>
  <div id="main">
    
    <!-- 要播放的大视频窗口 -->
    <div id="sourceBox">
      <Teleport v-if="isShow" :disabled="isTeleport" :to="'#targetBox'">
        <VideoModel :id="'VideoModel'" />
      </Teleport>
    </div>

    <!-- 模拟滚动 -->
    <div style="width: 100%;height: 2000px;"></div>

    <!-- 被传送的小视频窗口 -->
    <div id="targetBox"></div>

  </div>
</template>
<script>
import Teleport from '@/components/Teleport/Teleport.vue'
import VideoModel from '@/components/video-model/videoModel'
export default {
  data() {
    return {
      isShow: false,  // 控制 Teleport 组件挂载时机
      isTeleport: false  // 控制什么时候被传送
    }
  },
  provide() {
    return {
      parent: this
    }
  },
  components: { Teleport, VideoModel },
  mounted(){
    this.isShow = true  // 确保传送到的目标元素挂载在 Teleport 组件之前
    document.getElementById('main').addEventListener('scroll', this.intersectionObserver)
  },
  destroyed() {  // 离开页面移除监听
    document.getElementById('main').removeEventListener('scroll', this.intersectionObserver)
  },
  methods: {
    //  监听 sourceBox 是否在可视区域内
    intersectionObserver() {
      let main = document.getElementById('main')
      let sourceBox = document.getElementById('sourceBox')
      if(main.scrollTop >= sourceBox.getBoundingClientRect().height) {  // 传送
        console.log('传-->>')
        this.isTeleport = true
      }else {  // 不传
        this.isTeleport = false
      }
    },
    // 当不需要传送的时候，再挂载到原来的位置
    toSourceDom(dom) {
      document.getElementById('sourceBox').appendChild(dom)
    }
  }
}
</script>
<style scoped>
  #main {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: auto;
  }
  #sourceBox {
    position: absolute;
    width: 640px;
    height: 320px;
    left: 0;
    top: 0;
    border: 1px solid red;
    box-sizing: border-box;
  }
  #targetBox {
    position: fixed;
    right: 50px;
    bottom: 20px;
    width: 320px;
    height: 180px;
    border: 1px solid red;
    box-sizing: border-box;
  }
</style>
