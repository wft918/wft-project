<template>
  <div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
    <div id="container">
      <div id="top"></div>
      <div id="resize"></div>
      <div id="bottom"></div>
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
      this.dragTest()
    },
    methods: {
      dragTest() {
        let container = document.getElementById('container')
        let containerSize = document.getElementById('container').getBoundingClientRect()
        let top = document.getElementById('top')
        let bottom = document.getElementById('bottom')
        let resize = document.getElementById('resize')

        resize.onmousedown = () => {  //鼠标按下
          resize.style.backgroundColor = 'blue'
          container.onmousemove = (event) => { //鼠标在容器移动
            event = event || window.event
            top.style.height = event.clientY - containerSize.top + 'px'
            resize.style.top = top.style.height
            bottom.style.height = containerSize.bottom - event.clientY - 2 + 'px'
          }
          container.onmouseup = () => { //鼠标抬起
            container.onmousemove = null
            container.onmouseup = null
            resize.style.backgroundColor = 'red'
          }
        }
      }
    }
  }
</script>
<style scoped>
  #container {
    width: 600px;
    height: 600px;
    border: 1px solid red;
    box-sizing: border-box;
    position: relative;
  }
  #top {
    width: 100%;
    height: 198px;
  }
  #resize {
    width: 100%;
    height: 2px;
    background-color: red;
    position: absolute;
    top:199px;
    cursor: s-resize;
    z-index: 99;
  }
  #bottom {
    width: 100%;
    height: 400px;
  }
</style>