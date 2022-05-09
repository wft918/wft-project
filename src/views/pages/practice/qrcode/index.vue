<template>
  <div style="width: 100%;height: 100%;">
    <div id="qrcode" ref="qrcode"></div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      qrcode: ''
    }
  },
  mounted(){
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      // this.$refs.qrcode.innerHTML = ''; //清除二维码方法一
      // this.qrcode.clear(); // 清除二维码方法二
      let text = 'http://jindo.dev.naver.com/collie';  // 后端返回的二维码地址
      this.qrcode = new QRCode(this.$refs.qrcode, {
        text: text, //页面地址 ,如果页面需要参数传递请注意哈希模式#
        width: '128', // 二维码宽度 （不支持100%）
        height: '128', // 二维码高度 （不支持100%）
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      })
      setTimeout(() => {
        this.qrcode.makeCode("http://naver.com"); // make another code.
      }, 3000)
    }
  }
}
</script>
