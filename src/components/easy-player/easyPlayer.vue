<doc>
  easy-player  --   视频组件

  v-for与ref一起使用   可能this.$refs取的时候  可能会出问题  可能要通过this.$refs[变量名][0] 这样来获取
</doc>
<template>
  <div style="width: 100%;height: 100%;" class="aaa">
    <easy-player
      style="width: 100%;height: 100%;"
      @error="restartPlayer"
      @ended="restartPlayer"
      @play="videoPlay"
      :ref="'easyPlayer' + idx"
      :videoUrl="url"
      :aspect="aspect"
      :showEnterprise="false"
      :debug="true"
      fluent
      autoplay
      loop
      muted
      stretch>
    </easy-player>
  </div>
</template>
<script>
  import EasyPlayer from '@easydarwin/easyplayer'
  let map = {}
  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      aspect: {
        type: String,
        default: '16:9'
      },
      idx: {
        type: Number
      }
    },
    destroyed() {
      if(JSON.stringify(map) !== '{}') {
        for(let key in map) {
          if(map.hasOwnProperty(key)) {
            if(map[key]) clearInterval(map[key])
          }
        }
        map = {}
      }
    },
    components: {
      EasyPlayer
    },
    methods: {
      restartPlayer(e) {
        console.log(e,'播放异常或播放结束或直播断流------->>>>>>>>>')
        let interVal = `interVal${this.idx}`
        map[interVal] = null
        let playerRefs = `easyPlayer${this.idx}`
        this.$refs[playerRefs].initPlayer()  //初始化播放器
        this.$emit('pullFlow',this.idx)
        map[interVal] = setInterval(() => {
          this.$refs[playerRefs].initPlayer()  //初始化播放器
          this.$emit('pullFlow',this.idx)
        },3000)
      },
      // 播放事件
      videoPlay(a) {
        // console.log(a,'视频播放------>>')
        if(JSON.stringify(map) !== '{}') {
          for(let key in map) {
            if(map.hasOwnProperty(key)) {
              if(map[key]) clearInterval(map[key])
            }
          }
        }
      },
    },
  }
</script>
<style scoped>
  /* 阻止单击双击视频全屏或者跳转官网 */
  /* /deep/ .vjs-tech {
    pointer-events: none!important;
  } */

  /* /deep/ .video-js.vjs-fullscreen::backdrop,:not(:root):fullscreen::backdrop {
    position: fixed!important;
    top: 0!important;
    left: 0!important;
    width: 50%!important;
    height: 50%!important;
    right: 50%!important;
    bottom: 50%!important;
    background-color: transparent!important;
  }


  /deep/ .video-js.vjs-fullscreen .vjs-tech {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%!important;
    height: 50%!important;
    transform: translateX(-50%)!important;
  }

  /deep/ .video-js {
    background-color: transparent!important;
  } */
</style>