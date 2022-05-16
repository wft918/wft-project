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
    LoadMap(cityname = this.cityname) {
      this.charts = echarts.init(document.getElementById(this.id));
      const jsonCode = require("../../../../../assets/map/" + cityMap[cityname] + ".json");
      echarts.registerMap("china", jsonCode);
      let option = {
        // backgroundColor: "black",
        geo: {
          map: "china",
          aspectScale: 0.8,
          layoutCenter: ["50%", "50%"],
          layoutSize: "120%",
          itemStyle: {
            areaColor: {
              type: "linear-gradient",
              x: 0,
              y: 1200,
              x2: 1000,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#152E6E", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#0673AD", // 50% 处的颜色
                },
              ],
              global: true, // 缺省为 false
            },
            shadowColor: "#229ffc",
            shadowOffsetX: -2,
            shadowOffsetY: 8,
            opacity: 0.5,
          },
          emphasis: {
            label: { show: false },
            areaColor: "red",
          },
          regions: [
            {
              name: "南海诸岛",
              itemStyle: {
                areaColor: "rgba(0, 10, 52, 1)",
                borderColor: "rgba(0, 10, 52, 1)",
                opacity: 0,
                label: {
                  show: false,
                  color: "#009cc9",
                },
              },
              label: {
                show: false,
                color: "#FFFFFF",
                fontSize: 12,
              },
            },
          ],
        },
        series: [
          {
            type: "map",
            selectedMode: "multiple",
            map: "china",
            aspectScale: 0.8,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: "120%",
            zoom: 1, //当前视角的缩放比例
            // roam: true, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            label: {
              show: false,
              color: "#FFFFFF",
              fontSize: 16,
            },
            itemStyle: {
              areaColor: "#004b85",
              borderColor: "#1cccff",
              borderWidth: 1.8,
            },
            emphasis: {
              //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
              label: { 
                show: true,
                color: '#fff'
              },
              itemStyle: {
                areaColor: "#198895",
              },
            },
            data: [
              {
                name: "内蒙古",
                // itemStyle: {
                //   areaColor: "#56b1da",
                // },
                value: [110.3467, 41.4899],
              },
            ],
          },
          {
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            legendHoverLink: true,
            symbolSize: [28, 28],
            // legendHoverLink: true,
            label: {
              show: true,
              offset: [0, -25], //偏移设置
              fontSize: fontChart(15),
              lineHeight: fontChart(13),
              borderWidth: 1,
              backgroundColor: "rgba(20, 43, 61, .9)",
              borderColor: "#8f7136",
              padding: fontChart(8),
              formatter(value) {
                // console.log(value,'value-->>');
                // return value.data.name + '：' + value.data.value[2] + '人'
                // return `{name|${value.data.name}}\nph值：{pt|${value.data.ph}}\n溶解氧：{pt|${value.data.rjy}}\n{date|更新时间：${value.data.upDate}}`;
                return `{name|${value.data.name}}`
              },
              rich: {
                name: {
                  fontWeight: "bold",
                  fontSize: fontChart(13),
                  color: "#fff",
                },
                pt: {
                  fontSize: 14,
                  color: "#2BD8FB",
                },
                date: {
                  color: "rgb(255,255,255,0.8)",
                },
              },
              color: "#fff",
            },
            itemStyle: {
              color: "#D8BC37", //标志颜色
              shadowBlur: 2,
              shadowColor: "D8BC37"
            },
            data: [  // 数据
              {
                name: '水质-露营基地',
                value: [121.645189, 29.750277],
                ph: 7.7,
                rjy: 9.32,
                upDate: '11-09 11:45',
              },
              {
                name: '山东省',
                value: [117.00, 36.40],
                ph: 7.7,
                rjy: 9.32,
                upDate: '11-09 11:45',
              },
            ],
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            // hoverAnimation: true,
            zlevel: 1,
          },
        ],
      };
      this.charts.setOption(option);
      // console.log(this.charts._chartsViews);  // ...
      this.charts.on("click", (params) => {
        console.log(params, "params--->>");
        if (this.charts._chartsViews.length > 0) {
          this.charts.clear();
        }
        this.LoadMap(params.name)
      });
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
