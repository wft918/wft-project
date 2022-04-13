<template>
  <div id="main">
    
    <!-- 要播放的大视频窗口 -->
    <div id="sourceBox">
      <Teleport v-if="isShow" :disabled="isTeleport" :to="'#targetBox'">
        <div>
          <div>1234</div>
        </div>
      </Teleport>
    </div>

    <div style="width: 100%;height: 2000px;"></div>

    <!-- 被传送的小视频窗口 -->
    <div id="targetBox"></div>

  </div>
</template>
<script>
import Teleport from './Teleport.vue'
export default {
  data() {
    return {
      isShow: false,
      isTeleport: true,
      // teleportNode: null
    }
  },
  components: { Teleport },
  mounted(){
    this.isShow = true
    document.getElementById('main').addEventListener('scroll', this.intersectionObserver)
  },
  methods: {
    intersectionObserver() {
      let main = document.getElementById('main')
      let sourceBox = document.getElementById('sourceBox')
      if(main.scrollTop >= sourceBox.getBoundingClientRect().height) {  // 传送
        console.log('传-->>')
        this.isTeleport = true
      }else {  // 不传
        this.isTeleport = false
      }
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
    right: 20px;
    bottom: 20px;
    width: 320px;
    height: 180px;
    border: 1px solid red;
    box-sizing: border-box;
  }
</style>
