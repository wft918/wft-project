<doc>
  视频组件
</doc>
<template>
  <video :id="id" style="width: 100%;height: 100%;" class="video-js vjs-default-skin" preload="auto">
    <!-- <source src="rtsp://8.140.174.140:8045/s1" type="application/x-mpegURL"> -->
    <!-- <source src="http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8" type="application/x-mpegURL"> -->

    <!-- 勿删 -->
    <source :src="url" :type="url.endsWith('m3u8')?'application/x-mpegURL':url.endsWith('mp4')?'video/mp4':''">

    <!-- <source :src="url"> -->
  </video>
</template>
<script>
  import videojs from 'video.js'
  import 'videojs-contrib-hls'
  import "@videojs/http-streaming"
  export default {
    props: {
      id: {
        type:String,
        default:'videojs'
      },
      url: {
        type:String,
        default:'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8'
      }
    },
    data() {
      return {
        player: null,
      }
    },
    watch: {
      'url': {
        handler(newValue) {
          console.log(newValue,'videojs ----->>  new  url')
          this.init()
        },
        deep:true,
        immediate:true
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 播放器初始化
        this.$nextTick(() => {
          this.player = videojs(this.id, {
            bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: false,
            errorDisplay: false,
            controlBar: {  //总控制条
              //这里可以自己控制各小组件的顺序和显示方式
              children: [
                { name: 'playToggle' }, // 播放按钮
                { name: 'currentTimeDisplay' }, // 当前已播放时间
                { name: 'progressControl' }, // 播放进度条
                { name: 'durationDisplay' }, // 总时间
                { name: 'audioTrackButton' },
                { // 倍数播放
                  name: 'playbackRateMenuButton',
                  'playbackRates': [0.5, 1, 1.5, 2, 2.5]
                },
                {
                  name: 'volumePanel', // 音量控制
                  // inline: false, // 不使用水平方式
                },
              ],
              PictureInPictureToggle: true,  //画中画
              FullscreenToggle: true // 全屏
            },
            controls: true, //是否显示控件
            loop:true, //循环播放
            muted: true //静音模式 、、 解决首次页面加载播放。
          }, function () {
            this.play() // 自动播放
          })
        })
      }
    },
    // 离开页面销毁视频播放器
    beforeDestroy() {
      if (this.player != null) {
        this.player.dispose() // dispose()会直接删除Dom元素
      }
    }
  }
</script>
<style scoped>
  /* 将videojs  视频铺满容器 */
  .video-js .vjs-tech {
    object-fit: fill;
  }
</style>