<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>
<script>
import { fontChart } from "@/utils/echartPxToRem";
import * as echarts from "echarts";
export default {
  data() {
    return {
      charts: "",
      timer: null,
    };
  },
  props: {
    id: {
      type: String,
      required: true, //声明这个参数是否必须传入
    },
    dataList: {
      type: Array,
      default: () => ([
        {
          name: "平平果蔬种植基地",
          value: 2,
        },
        {
          name: "馥羽草莓基地",
          value: 8,
        },
        {
          name: "红梅家庭农场",
          value: 4,
        },
        {
          name: "三郭城家庭农场",
          value: 8,
        },
        {
          name: "嘉祺农业基地",
          value: 4,
        },
      ])
    }
  },
  watch: {
    dataList() {
      this.drawBar();
    },
  },
  mounted() {
    this.drawBar();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    drawBar() {
      this.charts = echarts.init(document.getElementById(this.id));
      let angle = 0;
      let data = [];
      let data2 = [];
      var color = [
        "#2A8BFD",
        "#BAFF7F",
        "#00FAC1",
        "#00CAFF",
        "#FDE056",
        "#4ED33C",
        "#FF8A26",
        "#FF5252",
        "#9689FF",
        "#CB00FF",
      ];
      let lefts = ['6%', '6%', '70%', '70%', '70%']
      let tops = ['25%', '55%', '10%', '40%', '70%']
      let legendData = [];
      let total = 0
      this.dataList.forEach(item => {
        total += item.value
      })
      for (let i = 0; i < this.dataList.length; i++) {
        let bfb = parseInt((this.dataList[i].value / total) * 100) + '%'
        legendData.push({
          show: true,
          icon: "circle", //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          left: lefts[i],
          top: tops[i],
          itemWidth: fontChart(10),
          itemHeight: fontChart(10),
          itemStyle: {
            color: color[i],
          },
          formatter: `{aa| `+ this.dataList[i].name +` }` + `\n\n` + `{bb| ` +bfb+ `}`,  // 也可以是个函数return
          x: "left",
          textStyle: {
            // color: "#BAFF7F",
            rich: {
              aa: {
                color: "#ffffff",
              },
              bb: {
                color: color[i]
              }
            }
          },
          data: [this.dataList[i].name],
        });
        data.push(
          {
            value: this.dataList[i].value,
            name: this.dataList[i].name,
            itemStyle: {
              normal: {
                borderWidth: 8,
                shadowBlur: 20,
                borderRadius: 20,
                borderColor: color[i],
                shadowColor: color[i],
              },
            },
          },
          {
            value: 1.5,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          }
        );
        data2.push(
          {
            value: this.dataList[i].value,
            name: this.dataList[i].name,
          },
          {
            value: 5,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
                opacity: 0.2,
              },
            },
          }
        );
      }
      let option = {
        // backgroundColor: "#061740",
        // color: color,
        legend: legendData,
        series: [
          {
            //外线1
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#4EE9E6",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //内线1
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#4EE9E6",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //外线2
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#4EE9E6",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //外线2
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              return {
                type: "arc",
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: "#4EE9E6",
                  fill: "transparent",
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //绿点1
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              let point = this.getCirlPoint(x0, y0, r, 90 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#66FFFF", //粉
                  fill: "#66FFFF",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //绿点2
            name: "", //绿点
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              let point = this.getCirlPoint(x0, y0, r, 270 + -angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#66FFFF", //粉
                  fill: "#66FFFF",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //绿点3
            name: "",
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
              let point = this.getCirlPoint(x0, y0, r, 90 + angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#66FFFF", //粉
                  fill: "#66FFFF",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            //绿点4
            name: "", //绿点
            type: "custom",
            coordinateSystem: "none",
            renderItem: (params, api) => {
              let x0 = api.getWidth() / 2;
              let y0 = api.getHeight() / 2;
              let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
              let point = this.getCirlPoint(x0, y0, r, 270 + angle);
              return {
                type: "circle",
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: "#66FFFF", //粉
                  fill: "#66FFFF",
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: ["98%", "95%"],
            hoverAnimation: false,
            center: ["50%", "50%"],
            top: "center",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: data,
          },
          {
            type: "pie",
            top: "center",
            startAngle: 90,
            clockwise: false,
            center: ["50%", "50%"],
            legendHoverLink: false,
            hoverAnimation: false,
            radius: ["94%", "55%"],
            itemStyle: {
              opacity: 0.15,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: data2,
          },
          {
            name: "",
            type: "pie",
            clockWise: false,
            center: ["50%", "50%"],
            radius: ["39%", "38%"],
            hoverAnimation: false,
            top: "center",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
            },
            data: data,
          },
        ],
      };
      this.charts.setOption(option, true);
      if(this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        angle = angle + 3;
        this.charts.setOption(option, true);
      }, 100);
      window.addEventListener("resize", this.selfAdaption);
    },
    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    getCirlPoint(x0, y0, r, angle) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1,
      };
    },
    // 自适应
    selfAdaption() {
      if (!this.charts) return;
      this.charts.resize();
      clearInterval(this.timer);
      this.drawBar();
    },
  },
};
</script>