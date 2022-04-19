<template>
  <div class="pdf">
    <div>
      <button type="button" @click="changePdfPage(0)">上一页</button>
      <button type="button" @click="changePdfPage(1)">下一页</button>
    </div>
    <p>{{ currentPage }} / {{ pageCount }}</p>
    <div>
      <button type="button" @click="scaleD()">放大</button>
      <button type="button" @click="scaleX()">缩小</button>
    </div>
    <div>
      <button type="button" @click="clock()">顺时针</button>
      <button type="button" @click="counterClock()">逆时针</button>
      <button type="button" @click="isShow = true">展示</button>
    </div>
    <pdf
      v-if="isShow"
      ref="pdf"
      :src="src"
      :page="currentPage"
      :rotate="pageRotate"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      @loaded="loadPdfHandler"
    ></pdf>
  </div>
</template>
<script>
import Pdf from "vue-pdf";
export default {
  data() {
    return {
      src: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      scale: 100,
      pageRotate: 0,
      isShow: false
    };
  },
  components: { Pdf },
  mounted() {
    console.log(Pdf, "Pdf----->>>");
  },
  methods: {
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    //放大
    scaleD() {
      this.scale += 5;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
    },
    //缩小
    scaleX() {
      // if (this.scale === 100) {
      //   return;
      // }
      this.scale += -5;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
    },
    // 顺时针
    clock() {
      this.pageRotate += 90;
    },
    // 逆时针
    counterClock() {
      this.pageRotate -= 90;
    },
  },
};
</script>
<style scoped>
.pdf {
  width: 40%;
  height: 100%;
  margin: 50px 0 0 50px;
  border: 1px solid red;
}
</style>
