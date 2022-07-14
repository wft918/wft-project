<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import { fabric } from "fabric";
export default {
  data() {
    return {
      fabricObj: null,
      image: require('@/assets/img/4.jpg')
    };
  },
  mounted() {
    console.log(fabric, "-->>");
    this.initFabric();
  },
  methods: {
    initFabric() {
      if (!this.fabricObj) {
        this.fabricObj = new fabric.Canvas("canvas");
        this.fabricObj.setWidth(650);
        this.fabricObj.setHeight(650);

        // 读取图片地址，设置画布背景
        fabric.Image.fromURL(this.image, (img) => {
          img.set({
            // 通过scale来设置图片大小，这里设置和画布一样大
            scaleX: this.fabricObj.width / img.width, // 这里也可以写0 - 1
            scaleY: this.fabricObj.height / img.height, // 这里也可以写0 - 1
          });
          // 设置背景
          this.fabricObj.setBackgroundImage(
            img,
            this.fabricObj.renderAll.bind(this.fabricObj)
          );
          this.fabricObj.renderAll();
        });
      }
    },
  },
};
</script>
<style scoped>
#canvas {
  border: 1px solid red;
}
</style>
