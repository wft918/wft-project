<template>
  <div>
    <h1>鼠标绘制多边形</h1>
    <button id="poly" title="Draw Polygon" @click="start">Draw Polygon</button>
    <label style="color:blue"
      ><b>Press double click to close shape and stop</b></label
    >
    <canvas id="label-canvas" class="canvas" width="500" height="500"></canvas>
  </div>
</template>
<script>
import { fabric } from "fabric";
export default {
  data() {
    return {
      roof: null,
      roofPoints: [],
      lines: [],
      lineCounter: 0,
      drawingObject: {},
      drawingObject: {
        type: "",
        background: "",
        border: ""
      },
      fabricObj: null,
      mouseFrom: {},
      canvas: null,
      Point: {}
    };
  },
  computed: {},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.fabricObj = new fabric.Canvas("label-canvas");
        this.fabricEvent();
        this.start()
      }, 500);
    });
  },
  methods: {
    start() {
      if (this.drawingObject.type == "roof") {
        this.drawingObject.type = "";
        this.lines.forEach(function(value, index, ar) {
          this.fabricObj.remove(value);
        });
        this.makeRoof();
        this.fabricObj.add(this.roof);
        this.fabricObj.renderAll();
      } else {
        this.drawingObject.type = "roof"; // roof type
      }
    },
    fabricEvent() {
      this.fabricObj.on({
        "mouse:down": e => {
          if (this.drawingObject.type == "roof") {
            this.fabricObj.selection = false;
            this.mouseFrom.x = e.pointer.x;
            this.mouseFrom.y = e.pointer.y
            let a = {}
              a["x"] = this.mouseFrom.x;
              a["y"] = this.mouseFrom.y;
            this.roofPoints.push(a);
            var points = [a.x, a.y, a.x, a.y];
            this.lines.push(
              new fabric.Line(points, {
                strokeWidth: 3,
                selectable: false,
                stroke: "red"
              })
            );
            this.fabricObj.add(this.lines[this.lineCounter]);
            this.lineCounter++;
          }
        },
        "mouse:move": e => {
          if (
            this.lines[0] !== null &&
            this.lines[0] !== undefined &&
            this.drawingObject.type == "roof"
          ) {
            this.x = e.pointer.x;
            this.y = e.pointer.y;
            this.lines[this.lineCounter - 1].set({
              x2: this.x,
              y2: this.y
            });
            this.fabricObj.renderAll();
          }
        },
        "mouse:dblclick": e => {
          this.lines.forEach(item => this.fabricObj.remove(item));
          // canvas.remove(lines[lineCounter - 1]);
          this.makeRoof();
          console.log(this.roof)
          console.log(this.roofPoints,'roofPoints所有坐标')
          this.fabricObj.add(this.roof);
          this.fabricObj.renderAll();

          console.log("double click");
          //clear arrays
          this.roofPoints = [];
          this.lines = [];
          this.lineCounter = 0;
        }
      });
    },
    makeRoof() {
      let left = this.findLeftPaddingForRoof(this.roofPoints);
      let top = this.findTopPaddingForRoof(this.roofPoints);
      let a = {}

      a["x"] = this.roofPoints[0].x;
      a["y"] = this.roofPoints[0].y;
      this.roofPoints.push(a);
      this.roof = new fabric.Polyline(this.roofPoints, {
        fill: "rgba(0,0,0,0)",
        strokeWidth:2,
        stroke: "red",
        left:left,
        top:top
      });
       
    },
    findTopPaddingForRoof(roofPoints) {
      var result = 999999;
      for (var f = 0; f < this.lineCounter; f++) {
        if (roofPoints[f].y < result) {
          result = roofPoints[f].y;
        }
      }
      return Math.abs(result);
    },
    findLeftPaddingForRoof(roofPoints) {
      var result = 999999;
      for (var i = 0; i < this.lineCounter; i++) {
        if (roofPoints[i].x < result) {
          result = roofPoints[i].x;
        }
      }
      return Math.abs(result);
    }
  }
};
</script>
<style scoped>
.canvas {
  border: 1px solid black;
}
</style>