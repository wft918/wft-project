<template>
  <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
    <div style="width: 4.427083rem;height: 2.864583rem;border: 1px solid red;padding: 10px 0 0 10px;box-sizing: border-box;">
      <vue-draggable-resizable :w="400" :h="400" :min-width="200" :min-height="200" @dragging="onDrag" @resizing="onResize" :parent="true">
        <bar :id="'testBar'" :resizeNum="resizeNum"></bar>
      </vue-draggable-resizable>
    </div>
  </div>
</template>
<script>
  import bar from './charts/bar'
  export default {
    data() {
      return {
        resizeNum:0
      }
    },
    components: {
      bar
    },
    methods: {
      // 组件调整大小时调用
      onResize(x, y, width, height) {
        // console.log(x,'onResizeX---->>')
        // console.log(y,'onResizeY---->>')
        // console.log(width,'onResizewidth---->>')
        // console.log(height,'onResizeheight---->>')
        this.resizeNum++
        // this.x = x
        // this.y = y
        // this.width = width
        // this.height = height
      },
      // 拖动组件时调用
      onDrag(x, y) {
        // console.log(x,'onDragX--------->>')
        // console.log(y,'onDragY--------->>')
        // this.x = x
        // this.y = y
      }
    }
  }
</script>
<style scoped>

</style>