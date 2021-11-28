<template>
  <div style="width: 100%;height: 100%;">
    <easy-player style="width: 100%;height: 100%;" :videoUrl="url" fluent autoplay loop muted stretch></easy-player>
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
      }
    },
    components: {
      EasyPlayer
    }
  }
</script>