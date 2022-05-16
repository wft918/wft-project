<!-- 双圆 -->
<template>
  <div style="width: 100%; height: 100%">
    <div :id="id" style="width: 100%; height: 100%"></div>
  </div>
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
    value: {
      type: Number,
      default: 14251,
    },
  },
  watch: {
    data() {
      this.drawPie();
    },
  },
  mounted() {
    this.drawPie();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
  },
  methods: {
    drawPie() {
      this.charts = echarts.init(document.getElementById(this.id));
      // 指定图表的配置项和数据
      var option = {
        title: {
          //   总数样式
          text: "节能减排",
          subtext: this.value,
          x: "center",
          y: "41%",
          //   节能减排字体
          textStyle: {
            fontWeight: "600",
            fontSize: 18,
            color: "red",
          },
          //   数量样式
          subtextStyle: {
            fontSize: 20,
            color: "orange",
          },
        },
        // 鼠标移动到图上时的提示消息
        tooltip: {
          show: false,
          trigger: "item",
          //   formatter可以为函数，自定义提示信息
          //   formatter: "{b}：{c}个<br/>占比：({d}%)"
          formatter: function (item) {
            return (
              `<p>  ` +
              item.name +
              ` : 共 ` +
              item.value +
              ` 个 </p> <br>  <p> 占比 ` +
              item.rate +
              ` % </p>`
            );
          },
        },
        series: [
          {
            itemStyle: {
              normal: {},
            },
            type: "pie",
            stillShowZeroSum: true,
            radius: ["60%", "70%"],
            label: {
              normal: {
                position: "inner",
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                name: "节能诊断",
                value: this.value,
                itemStyle: {
                  normal: { color: "#13d2ee" },
                },
              },
            ],
          },
          // 内层圆线
          {
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["55%", "52%"],
            center: ["50%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              normal: {
                position: "center",
              },
            },
            data: [
              {
                value: 1,
                itemStyle: {
                  normal: {
                    color: "rgba(32, 143, 173, 1)",
                  }
                }
              }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.charts.setOption(option);
      window.addEventListener("resize", this.selfAdaption);
    },
    // 自适应
    selfAdaption() {
      if (!this.charts) return;
      this.charts.resize();
      this.drawPie();
    },
  },
};
</script>