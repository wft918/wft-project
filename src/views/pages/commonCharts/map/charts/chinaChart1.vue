<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>
<script>
import { fontChart } from "@/utils/echartPxToRem";
import { cityMap } from "@/utils/china-main-city-map.js";
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
  },
  computed: {
    cityname: () => process.env.VUE_APP_CITY_NAME,
  },
  // watch: {
  //   yValue() {
  //     this.LoadMap();
  //   },
  // },
  mounted() {
    this.LoadMap();
  },
  destroyed() {
    window.removeEventListener("resize", this.selfAdaption);
  },
  methods: {
    LoadMap() {
      this.charts = echarts.init(document.getElementById(this.id));
      const jsonCode = require("../../../../../assets/map/" + cityMap[this.cityname] + ".json");
      echarts.registerMap("china", jsonCode);
      let option = {
        // backgroundColor: 'rgb(1,30,64)', // 背景
        title: {
          show: false,
          //标题样式
          text: "ECharts 中国地图",
          x: "center",
          label: {
            fontSize: fontChart(18),
            color: "red",
          },
        },
        tooltip: {
          show: true,
          //这里设置提示框
          trigger: "item", //数据项图形触发
          // triggerOn: 'click', //mousemove、click、mousemove|click、none
          backgroundColor: "#fff", //提示框浮层的背景颜色。
          //字符串模板(地图): {a}（系列名称），{b}（区域名称），{c}（合并数值）,{d}（无）
          // formatter: "地区：{b}<br/>模拟数据：{c}",
          formatter: params => {
            return params
          }
        },
        visualMap: {
          //视觉映射组件
          show: false,
          top: "bottom",
          left: "left",
          min: 10,
          max: 500000,
          text: ["High", "Low"],
          realtime: false, //拖拽时，是否实时更新
          calculable: true, //是否显示拖拽用的手柄
          inRange: {
            color: ["red", "yellow", "blue"],
          },
        },
        series: [
          {
            name: "china",
            type: "map",
            map: "china",
            roam: false, //是否开启鼠标缩放和平移漫游
            zoom: 1, //地图缩放比例,默认为1
            itemStyle: {
              //地图区域的多边形 图形样式
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 84, 148, 1)", // 0% 处的颜色
                    // color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 84, 148, .8)", // 100% 处的颜色
                    // color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            //是图形在默认状态下的样式
            label: {
              normal: {
                show: false,
                formatter:"{b}",
                position:'right',
                color: "black",
              }
            },
            markPoint: { //图标标注 点标记
              label: {
                normal: {
                  show: true,
                  formatter: function(params) { //标签内容       如果只显示图片则隐藏
                    return params.name;
                  },
                },
              },
              itemStyle: {
                color: 'none'
              },
              data: [
                {
                  name: "四川移动",
                  coord: [
                    108.393982, 31.175037 //坐标，通过高德
                  ],
                  selected: false,
                  symbol: 'image://https://img1.baidu.com/it/u=777884207,2018784782&fm=26&fmt=auto&gp=0.jpg', // 标注图片地址路径
                  symbolSize: 20,
                }, 
                {
                  name: "河南电信",
                  coord: [
                    108.391429, 31.177332
                  ],
                  selected: false,
                  symbol: 'image://https://img1.baidu.com/it/u=777884207,2018784782&fm=26&fmt=auto&gp=0.jpg', // 标注图片地址路径
                  symbolSize: 20,
                }
              ]
            },
            emphasis: {
              //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
              label: { 
                show: true,
                color: '#fff'
              },
              itemStyle: {
                areaColor: "#f6ac13",
              },
            },
            top: "8%", //组件距离容器的距离
            // left: '10%',
            data: [
              //  数据的展示（颜色） 一般搭配视觉映射组件visualMap
              // { name: "北京", value: 275005 },
              // { name: "四川省", value: 480000 },
              // { name: "青海省", value: 400000 },
              // { name: "内蒙古自治区", value: 10000 },
            ],
          },
        ],
      };
      this.charts.setOption(option);
      this.charts.on('click', params => {
        console.log(params,'params--->>');
      })
      window.addEventListener("resize", this.selfAdaption);
    },
    // 自适应
    selfAdaption() {
      if (!this.charts) return;
      this.charts.resize();
      this.LoadMap();
    },
  },
};
</script>
<style scoped>
</style>
