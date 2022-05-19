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
    };
  },
  props: {
    id: {
      type: String,
      required: true, //声明这个参数是否必须传入
    },
    xValue: {
      type: Array,
      default: () => [
        "08:10",
        "08:20",
        "08:30",
        "08:40",
        "08:50",
        "09:10",
        "09:20",
        "09:30",
        "09:40",
        "09:50",
        "10:00",
        "10:10",
        "10:20",
        "10:30",
        "10:40",
        "10:50",
        "11:00",
        "11:10",
        "11:20",
        "11:30",
        "11:40",
        "11:50",
        "12:00",
        "13:00"
      ],
    },
    yValue1: {
      type: Array,
      default: () => [1600, 1600, 1600, 1600, 1600, 1600, 1600, 1115, 1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1600,1600,1600],
    },
    yValue2: {
      type: Array,
      default: () => [1300, 1300, 1300, 1300, 1300, 1300, 1300, 1115, 1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1300,1300,1300],
    },
    yValue3: {
      type: Array,
      default: () => [1135, 1135, 1135, 1135, 1135, 1135, 1135, 1115, 1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1135,1135,1135],
    },
    yValue4: {
      type: Array,
      default: () => [900, 900, 900, 900, 900, 900, 900, 1115, 1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,1115,900,900,900],
    },
  },
  watch: {
    yValue2() {
      this.drawLine();
    },
  },
  mounted() {
    this.drawLine();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
  },
  methods: {
    drawLine() {
      this.charts = echarts.init(document.getElementById(this.id));
      let option = {
        backgroundColor: "#03060F",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#ffcb00",
            },
          }
        },
        legend: {
          // data: ["今年", "去年"],
          textStyle: {
            fontSize: fontChart(12),
            color: "rgba(255, 255, 255, 0.8)",
          },
          icon: 'roundRect',
          itemWidth: fontChart(18),
          itemHeight: fontChart(12),
          // borderRadius: 0,
          top: "2%",
          right: "2%",
          // bottom: '15%'
        },
        grid: {
          bottom: '10%',
          left: '10%',
          right: '4%',
          top: '20%'
        },
        xAxis: {
          axisLine: {
            show: false,
            lineStyle: {
              color: "#15faff",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              //改变刻度字体样式
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: fontChart(13)
            },
          },
          data: this.xValue,
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#274452",
            }
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#293a4c",
            },
          },
          axisLabel: {
            // formatter: "{value} %",
            textStyle: {
              //改变刻度字体样式
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: fontChart(13)
            },
          },
        },
        series: [
          {
            name: "监测",
            type: "line",
            // smooth: true, // 设置拆线平滑
            symbol: "circle",
            symbolSize: fontChart(13),
            itemStyle: {
              color: "#2fece6",
            },
            data: this.yValue1,
          },
          {
            name: "预测",
            type: "line",
            // smooth: true,
            symbol: "circle",
            symbolSize: fontChart(13),
            itemStyle: {
              color: "#f4715c",
            },
            data: this.yValue2,
          },
          {
            name: "最优",
            type: "line",
            // smooth: true,
            symbol: "circle",
            symbolSize: fontChart(13),
            itemStyle: {
              color: "#7c2826",
            },
            data: this.yValue3,
          },
          {
            name: "设计",
            type: "line",
            // smooth: true,
            symbol: "circle",
            symbolSize: fontChart(13),
            itemStyle: {
              color: "#ecff29",
            },
            data: this.yValue4,
          }
        ]
      };
      this.charts.setOption(option);
      window.addEventListener("resize", this.selfAdaption);
    },
    // 自适应
    selfAdaption() {
      if (!this.charts) return;
      this.charts.resize();
      this.drawLine();
    },
  },
};
</script>