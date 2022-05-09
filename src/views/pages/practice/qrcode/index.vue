<template>
  <div style="width: 100%;height: 100%;">
    <QrCode :id="'QrCode'" :text="codeUrl" />
  </div>
</template>
<script>
import QrCode from './qrCode.vue'
export default {
  data() {
    return {
      codeUrl: 'http://jindo.dev.naver.com/collie'  // 后端返回的二维码地址
    }
  },
  components: { QrCode },
  mounted(){
    setTimeout(() => {
      this.codeUrl = 'http://naver.com'
    }, 2000)
  },
}
</script>
