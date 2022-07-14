<template>
  <div class="global">
    <div class="preview">
      <el-button type="success" @click="isShow = true">开始预览</el-button>
    </div>
    <div class="pdfContainer" v-if="isShow">
      <div class="button">
        <el-button type="success" @click="prev()">上一页</el-button>
        <el-button type="success" @click="next()">下一页</el-button>
        <el-button type="success" @click="scaleD()">放大</el-button>
        <el-button type="success" @click="scaleX()">缩小</el-button>
        <el-button type="success" @click="clockwise()">顺时针</el-button>
        <el-button type="success" @click="antiClockwise()">逆时针</el-button>
      </div>
      <div class="pdf">
        <pdf
          ref="pdf"
          :src="src"
          :page="currentPage"
          :rotate="pageRotate"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        ></pdf>
      </div>
      <div class="page">
        <span class="pageNum">{{ currentPage }}</span>
        <span class="pageNum">/</span>
        <span class="pageNum">{{ pageCount }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Pdf from "vue-pdf";
export default {
  data() {
    return {
      src: "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",  // pdf的路径 实际项目后端返回
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      scale: 100,  //  开始的时候默认和容器一样大即宽高都是100%
      pageRotate: 0,  // 旋转角度
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
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.$refs.pdf.$el.style.height = parseInt(this.scale) + "%";
    },
    //  上一页
    prev() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    // 下一页
    next() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    //放大
    scaleD() {
      if(this.scale == 100) return this.$message.warning('已经是最大喽~~')
      this.scale += 10;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.$refs.pdf.$el.style.height = parseInt(this.scale) + "%";
    },
    //缩小
    scaleX() {
      if(this.scale == 40) return this.$message.warning('已经是最小喽~~')
      this.scale += -10;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.$refs.pdf.$el.style.height = parseInt(this.scale) + "%";
    },
    // 顺时针
    clockwise() {
      this.pageRotate += 90;
    },
    // 逆时针
    antiClockwise() {
      this.pageRotate -= 90;
    },
  },
};
</script>
<style scoped>
.global {
  width: 100%;
  height: 100%;
}
.preview {
  width: 100%;
  height: 50px;
}

.pdfContainer {
  width: 100%;
  height: calc(100% - 50px);
}
.pdfContainer .button {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.pdfContainer .pdf {
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
.pdfContainer .page {
  width: 100%;
  height: 50px;
}

.pageNum {
  font-size: 28px;
}
</style>
