
<doc>
  仪表盘组件
</doc>
<template style="height: 100%;width: 100%;">
  <div id="gauge" style="width: 100%; height: 100%"></div>
</template>
<script>
import { fontChart } from '@/utils/echartPxToRem'
import * as echarts from 'echarts'
export default {
  data() {
    return {
      charts: "",
    };
  },
  mounted() {
    this.init();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
  },
  methods: {
    init() {
      this.charts = echarts.init(document.getElementById("gauge"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} (%)",
        },
        series: [
          {
            type: "gauge",
            // 控制表盘大小
            radius: "85%",
            startAngle: fontChart(225), //开始角度
            //  endAngle: -20, //结束角度
            axisLine: {
              // 控制表格展开范围
              show: false,
              lineStyle: {
                width: fontChart(5),
                opacity: 0,
              },
            },
            title: { show: false },
            // 当前展示数值
            detail: {        // 仪表盘详情，用于显示数据。
              show: true,        // 是否显示详情,默认 true。
              offsetCenter: [0,"80%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              color: '#000',
              fontWeight: '700',
              fontSize: '12',
              formatter: "{value}%\n\n出勤率",  // 格式化函数或者字符串
            },
            // 整数刻度指示
            splitLine: {
              show: true,
              length: 20,
            },
            axisTick: {
              // 刻度格到中心的长度
              length: fontChart(10),
              // 刻度格之间的距离
              splitNumber: fontChart(5),
              lineStyle: {
                //   刻度颜色
                color: "#52B8DF",
                // 刻度宽度
                width: fontChart(3),
              },
            },
            // 刻度数值显示
            axisLabel: {
              show: true,
              distance: 0,
            },
            // 表针显示
            pointer: {
              show: true,
              length: "30%",
            },
            data: [
              {
                value: 100,
                name: "出勤率",
                nameTextStyle: {
                  fontSize: fontChart(13),
                },
                itemStyle: {
                  color: "#1990fd",
                },
              },
            ],
          },
        ],
      };
      this.charts.setOption(option, true);
      window.addEventListener("resize", this.selfAdaption);
    },
    // 自适应
    selfAdaption() {
      if(!this.charts) return
      this.charts.resize();
      this.init()
    },
  },
};
</script>
<style scoped>
</style>