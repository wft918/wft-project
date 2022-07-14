<!-- 实现鼠标经过,产品图片的局部放大功能 -->
<template>
  <div style="width: 100%;height: 100%;">
    <div class="summary" ref="box">
      <div class="gallery">
        <div class="main-img">
          <div id="box">
            <div @mouseenter="mouseEnter" @mouseleave="mouseLeave" @mousemove="mouseMove">
              <!-- <img :src="mainImg" alt="主图">	 -->
              <img id="small" src="@/assets/img/9.jpg" alt="主图" ref="smallBox">
              <b id="shadow" ref="shadowBox"></b>
            </div>
            <div id="showDetails" ref="showDetailsBox">
              <img src="@/assets/img/9.jpg" alt="放大图">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      mouseEnter() {
        this.$refs.shadowBox.style.display = "block";
        this.$refs.showDetailsBox.style.display = "block";
      },
      mouseLeave() {
        this.$refs.shadowBox.style.display = "none";
        this.$refs.showDetailsBox.style.display = "none";
      },
      mouseMove(ev) {
        const box = this.$refs.box;
        const smallBox = this.$refs.smallBox;
        const mask = this.$refs.shadowBox;
        const bigImg = this.$refs.showDetailsBox.firstChild;

        let x = ev.pageX - box.offsetLeft;//被绑定元素到父元素的差值
        let y = ev.pageY - box.offsetTop;
        x = x - mask.offsetWidth / 2;
        y = y - mask.offsetHeight / 2;

        if (x < 0) {
          x = 0
        }
        if (x > smallBox.offsetWidth - mask.offsetWidth) {
          x = smallBox.offsetWidth - mask.offsetWidth;
        }

        if (y < 0) {
          y = 0
        }
        if (y > smallBox.offsetHeight - mask.offsetHeight) {
          y = smallBox.offsetHeight - mask.offsetHeight
        }

        mask.style.left = x + "px";//小图片移动多少
        mask.style.top = y + "px";

        bigImg.style.left = -bigImg.offsetWidth / smallBox.offsetWidth * x + "px"; //图片成比例缩放原理
        bigImg.style.top = -bigImg.offsetHeight / smallBox.offsetHeight * y + "px";
      },
    }
  }
</script>
<style scoped lang="scss">
  .main-img {
    width: 500px;
    height: 500px;
    border: 1px solid #E5E5E5;
    position: relative;

    #box {
      /* 父级开始定位 */
      position: relative;

      #small {
        width: 500px;
        height: 500px;
      }

      #shadow {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #000;
        opacity: 0.3;
        /* 高亮区域宽高与小图宽高、放大图区域宽高成比例 */
        width: 250px;
        height: 250px;
      }

      #showDetails {
        width: 500px;
        height: 500px;
        display: none;
        position: absolute;
        top: 0px;
        left: 510px;
        overflow: hidden;
        border: #ededed 1px solid;
        background-color: #FFFFFF;

        img {
          position: absolute; //放大图定位移动
        }
      }
    }
  }
  #box > div:nth-of-type(1) {
    cursor: pointer;
  }
</style>