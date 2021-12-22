<template>
  <div style="width: 100%;height: 100%;">
    <easy-player @error="easyPlayError" style="width: 100%;height: 100%;" :videoUrl="url" fluent autoplay loop muted stretch></easy-player>
  </div>
</template>
<script>
  import EasyPlayer from '@easydarwin/easyplayer'
  export default {
    data() {
      return {

      }
    },
    props: {
      url: {
        type:String,
        default: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8'
      },
      index: {
        type: Number
      }
    },
    watch: {
      'url': {
        handler(newUrl) {
          console.log(newUrl,'新的播放地址--->>>')
        },
        deep: true,
        immediate: true
      },
      'index': {
        handler(newIndex) {
          console.log(newIndex,'播放器的下标--->>>')
        },
        deep: true,
        immediate: true
      }
    },
    components: {
      EasyPlayer
    },
    methods: {
      // 播放器抛出错误
      easyPlayError() {
        this.$emit('playError',this.index)
      }
    }
  }
</script>