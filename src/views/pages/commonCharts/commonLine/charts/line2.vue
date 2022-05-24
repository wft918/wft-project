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
      required: true,
    },
    xValue: {
      type: Array,
      default: () => ["1.00", "2:00", "3.00", "4.00", "5.00", "6.00", "7.00", "8.00", "9.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00"],
    },
    yValue: {
      type: Array,
      default: () => [30, 50, 100, 120, 170, 200, 240, 280, 290, 340, 350, 330, 280, 210, 180, 170, 120],
    },
    lineColor: {
      type: String,
      default: "#38cf8f"
    },
    offsetColor0: {
      type: String,
      default: "rgba(51, 192, 132, 1)"
    },
    offsetColor0_5: {
      type: String,
      default: "rgba(51, 192, 132, .5)"
    },
    offsetColor1: {
      type: String,
      default: "rgba(51, 192, 132, .1)"
    },
  },
  watch: {
    yValue() {
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
        // backgroundColor: "rbg(40,46,72)",
        grid: {
          left: "8%",
          right: "5%",
          top: "20%",
          bottom: "2%",
          containLabel: true,
        },
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: "rgba(50, 216, 205, 1)",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: 0,
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: "#A1A7B3",
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            data: this.xValue,
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位(ppm)",
            nameTextStyle: {
              color: "#fff",
              fontSize: fontChart(13),
              align: "right"
            },
            padding: fontChart(5),
            // max: 1000,
            splitLine: {
              show: false,
              lineStyle: {
                color: "#A1A7B3",
                type: "dashed",
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: fontChart(10),
              textStyle: {
                color: "#A1A7B3",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            // name: "今日",
            type: "line",
            smooth: true,
            stack: "总量",
            symbolSize: 5,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: "#23D0C4",
                lineStyle: {
                  color: this.lineColor,
                  width: 2,
                },
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: this.offsetColor0,
                    },
                    {
                      offset: 0.5,
                      color: this.offsetColor0_5,
                    },
                    {
                      offset: 1,
                      color: this.offsetColor1,
                    },
                  ],
                  false
                ),
              },
            },
            data: this.yValue,
          },
        ],
      }
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