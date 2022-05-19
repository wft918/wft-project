<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>
<script>
import * as echarts from "echarts";
import { fontChart } from "@/utils/echartPxToRem.js";
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
      default: () => ['实际电功率', '预测电功率', '最优电功率']
    },
    yValue1: {
      typr: Array,
      default: () => [16000, 16000, 16000]
    },
    yValue2: {
      type: Array,
      default: () => [10000, 18000, 12000]
    },
    yValue3: {
      type: Array,
      default: () => [6000, 14000, 13000]
    },
    yValue4: {
      type: Array,
      default: () => [4000, 7000, 7000]
    }
  },
  watch: {
    yValue() {
      this.drawBar();
    },
  },
  mounted() {
    this.drawBar();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
  },
  methods: {
    drawBar() {
      this.charts = echarts.init(document.getElementById(this.id));
      let option = {
        backgroundColor: "#080b30",
        title: {
          show: false,
          text: "汪琦玲-拉动时间轴演示",
          textStyle: {
            align: "center",
            color: "#fff",
            fontSize: 20,
          },
          top: "5%",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "10%",
          top: "16%",
          containLabel: true,
        },
        legend: {
          // data: ["1", "2", "3"],
          right: fontChart(10),
          top: fontChart(12),
          textStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: fontChart(14)
          },
          icon: 'circle',
          itemWidth: fontChart(12),
          itemHeight: fontChart(10),
          // itemGap: 35
        },
        xAxis: {
          type: "category",
          data: this.xValue,
          axisLine: {
            lineStyle: {
              color: "#274452",
            }
          },
          axisTick: {
            show: false,
            alignWithLabel: true
          },
          axisLabel: {
            show: true,
            // interval: 0,
            // rotate: fontChart(12),
            color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
            fontSize: fontChart(14),     //更改坐标轴文字大小
            align:"center"
          }
        },
        yAxis: {
          type: "value",
          // max: "1200",
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
            show: true,
            lineStyle: {
              color: "#293a4c",
              type: 'dashed'
            }
          },
          axisLabel: {
            show: true,
            // interval: 0,
            // rotate: fontChart(12),
            color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
            fontSize: fontChart(14),     //更改坐标轴文字大小
          }
        },
        dataZoom: [
          {
            show: false,
            height: 12,
            xAxisIndex: [0],
            bottom: "8%",
            start: 10,
            end: 90,
            handleIcon: "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5",
            },
            textStyle: {
              color: "#fff",
            },
            borderColor: "#90979c",
          },
          {
            type: "inside",
            show: true,
            height: 15,
            start: 1,
            end: 35,
          },
        ],
        series: [
          {
            name: "冷机",
            type: "bar",
            barWidth: "6%",
            itemStyle: {
              color: '#0968f5',
              barBorderRadius: 12,
            },
            data: this.yValue1,
          },
          {
            name: "冷却塔",
            type: "bar",
            barWidth: "6%",
            itemStyle: {
              color: '#f27359',
              barBorderRadius: 11,
            },
            data: this.yValue2,
          },
          {
            name: "冷冻泵",
            type: "bar",
            barWidth: "6%",
            itemStyle: {
              color: '#f6ea90',
              barBorderRadius: 11,
            },
            data: this.yValue3,
          },
          {
            name: "冷却泵",
            type: "bar",
            barWidth: "6%",
            itemStyle: {
              color: '#4dd5fd',
              barBorderRadius: 11
            },
            barGap:"100%", //不同系列的柱间距离，为百分比
            // barCategoryGap: '20%', //同一系列的柱间距离，默认为类目间距的20%，可设固定值
            data: this.yValue4,
          },
        ],
      };
      this.charts.setOption(option);
      window.addEventListener("resize", this.selfAdaption);
    },
    // 自适应
    selfAdaption() {
      if (!this.charts) return;
      this.charts.resize();
      this.drawBar();
    },
  },
};
</script>