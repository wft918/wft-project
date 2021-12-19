<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: .416667rem;display: flex;justify-content: center;align-items: center;">
      <el-button-group>
        <el-button type="primary" @click="setPlayerLength(1)">单屏</el-button>
        <el-button type="primary" @click="setPlayerLength(4)">四分屏</el-button>
        <el-button type="primary" @click="setPlayerLength(9)">九分屏</el-button>
        <el-button type="primary" @click="setPlayerLength(16)">十六分屏</el-button>
        <el-button type="primary" @click="videoFullscreen"><i class="el-icon-rank"></i></el-button>
      </el-button-group>
    </div>
    <div style="width: 100%;height: calc(100% - .416667rem);padding: 0 8%;">
      <div ref="videoContent" style="width: 100%;height: 100%;display: flex;justify-content: space-between;flex-wrap: wrap;align-content: space-between;">
        <div v-for="(item,index) in players" :key="item.id" :class="{'alone':players.length == 1,'fourScreen':players.length == 4,'nineScreen':players.length == 9,'sixteenScreen':players.length == 16}">
          <easy-player></easy-player>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import easyPlayer from '@/components/easy-player/easyPlayer'
  export default {
    data() {
      return {
        players: [],
      }
    },
    components: {
      easyPlayer
    },
    mounted() {
      this.setPlayerLength(4)
    },
    methods: {
      setPlayerLength(length) {
        if(length == this.players.length) return
        this.players = []
        for(let i = 0; i < length; i++) {
          this.players.push({
            url:'',
            id:i
          })
        }
      },
      // 全屏展示
      videoFullscreen() {
        this.$fullscreen.enter(this.$refs.videoContent, {
          wrap: false
        })
      }
    }
  }
</script>
<style scoped>
  .alone {
    width: 100%;
    height: 100%;
  }

  .fourScreen {
    width: 49.5%;
    height: 49.5%;
  }

  .nineScreen {
    width: 32.5%;
    height: 32.5%;
  }

  .sixteenScreen {
    width: 24.5%;
    height: 24.5%;
  }
</style>