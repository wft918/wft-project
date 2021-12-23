<doc>
  easy-player  --   视频组件

  v-for与ref一起使用   可能this.$refs取的时候  可能会出问题  可能要通过this.$refs[变量名][0] 这样来获取
</doc>
<template>
  <div style="width: 100%;height: 100%;">
    <easy-player
      style="width: 100%;height: 100%;"
      @error="restartPlayer"
      @ended="restartPlayer"
      :ref="'easyPlayer' + idx"
      :videoUrl="url"
      :aspect="aspect"
      :showEnterprise="false"
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
  export default {
    props: {
      url: {
        type: String,
        default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8'
      },
      aspect: {
        type: String,
        default: '16:9'
      },
      idx: {
        type: Number
      }
    },
    components: {
      EasyPlayer
    },
    methods: {
      restartPlayer(e) {
        console.log(e,'播放异常或播放结束或直播断流------->>>>>>>>>')
        let playerRefs = `easyPlayer${this.idx}`
        this.$refs[playerRefs].initPlayer()  //初始化播放器
        this.$emit('pullFlow',this.idx)
      },
    },
  }
</script>