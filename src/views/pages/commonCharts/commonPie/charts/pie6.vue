<template>
  <div :id="id" style="height: 100%; width: 100%"></div>
</template>
<script>
import highcharts from "highcharts";
import { fontChart } from "@/utils/echartPxToRem";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    dataList: {
      type: Array,
      default: () => ([
        {
          name: "红草莓",
          y: 10254,
          h: 0,
          bfb: 0
        },
        {
          name: "白草莓",
          y: 6894,
          h: 0,
          bfb: 0
        },
        {
          name: "红颜草莓",
          y: 7667,
          h: 0,
          bfb: 0
        },
        {
          name: "甜宝草莓",
          y: 4287,
          h: 0,
          bfb: 0
        },
        {
          name: "红颜草莓",
          y: 8687,
          h: 0,
          bfb: 0
        },
        {
          name: "甜宝草莓",
          y: 16112,
          h: 0,
          bfb: 0
        }
      ])
    }
  },
  watch: {
    dataList() {
      // this.$nextTick(() => {
      this.initOption();
      // });
    },
  },
  data() {
    return {};
  },
  mounted() {
    // this.$nextTick(() => {
    this.initOption();
    // });
    window.addEventListener("resize", this.initOption);
  },
  destroyed() {
    window.removeEventListener("resize", this.initOption);
  },
  methods: {
    initOption() {
      let quantity = 0; // 总数
      this.dataList.forEach((item) => {
        quantity += item.y;
      });
      this.dataList.forEach((item) => {
        item.bfb = parseInt((item.y / quantity) * 100);
        item.h = item.bfb * 0.8 >= 40 ? 40 : item.bfb * 0.8
        // item.h = parseInt(0.86 * item.bfb); // 最高高度60，根据比例渲染高度
        // console.log(this.dataList, "dataList----->>>");
      });
      // 修改3d饼图绘制过程
      var each = highcharts.each,
        round = Math.round,
        cos = Math.cos,
        sin = Math.sin,
        deg2rad = Math.deg2rad;
      highcharts.wrap(
        highcharts.seriesTypes.pie.prototype,
        "translate",
        function (proceed) {
          proceed.apply(this, [].slice.call(arguments, 1));
          // Do not do this if the chart is not 3D
          if (!this.chart.is3d()) {
            return;
          }
          var series = this,
            chart = series.chart,
            options = chart.options,
            seriesOptions = series.options,
            depth = seriesOptions.depth || 0,
            options3d = options.chart.options3d,
            alpha = options3d.alpha,
            beta = options3d.beta,
            z = seriesOptions.stacking
              ? (seriesOptions.stack || 0) * depth
              : series._i * depth;
          z += depth / 2;
          if (seriesOptions.grouping !== false) {
            z = 0;
          }
          each(series.data, function (point) {
            var shapeArgs = point.shapeArgs,
              angle;
            point.shapeType = "arc3d";
            var ran = point.options.h;
            shapeArgs.z = z;
            shapeArgs.depth = depth * 0.75 + ran;
            shapeArgs.alpha = alpha;
            shapeArgs.beta = beta;
            shapeArgs.center = series.center;
            shapeArgs.ran = ran;
            angle = (shapeArgs.end + shapeArgs.start) / 2;
            point.slicedTranslation = {
              translateX: round(
                cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
              ),
              translateY: round(
                sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
              ),
            };
          });
        }
      );
      (function (H) {
        H.wrap(
          highcharts.SVGRenderer.prototype,
          "arc3dPath",
          function (proceed) {
            // Run original proceed method
            var ret = proceed.apply(this, [].slice.call(arguments, 1));
            ret.zTop = (ret.zOut + 0.5) / 100;
            return ret;
          }
        );
      })(highcharts);
      highcharts.chart(this.id, {
        // accessibility: {
        //   keyboardNavigation: {
        //     enabled: true,
        //     focusBorder: {
        //       enabled: true,
        //       hideBrowserFocusOutline: true,
        //       margin: 2,
        //       style: {
        //         borderRadius: 3,
        //         color: "#335cad",
        //         lineWidth: 2,
        //       }
        //     }
        //   }
        // },
        chart: {
          animation: false,
          backgroundColor: "none",
          type: "pie", //饼图
          margin: [0, 0, 0, 0],
          options3d: {
            enabled: true, //使用3d功能
            alpha: 58, //延y轴向内的倾斜角度
            beta: 0,
          },
          events: {
            load: function () {
              var each = highcharts.each,
                points = this.series[0].points;
              each(points, function (p, i) {
                p.graphic.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side1.attr({
                  translateY: -p.shapeArgs.ran,
                });
                p.graphic.side2.attr({
                  translateY: -p.shapeArgs.ran,
                });
              });
            },
          },
        },
        legend: {
          enabled: true, // 关闭图例
          align: "right", //水平方向位置
          verticalAlign: "top", //垂直方向位置
          layout: "vertical",
          x: fontChart(-40),
          y: fontChart(30),
          symbolWidth: fontChart(10),
          symbolHeight: fontChart(10),
          symbolRadius: "50%", // 修改成圆
          itemMarginBottom: fontChart(8),
          useHTML: true,
          //labelFormat: '{name}&nbsp;&nbsp;&nbsp;&nbsp;{y}',
          labelFormatter: function () {
            return (
              '<div style="width: .3125rem;display: inline-block">' +
              this.name +
              ':&nbsp;&nbsp;</div><div style="color: #00d7da;display: inline-block">' +
              this.y +
              "</div>"
            );
          },
          itemStyle: {
            color: "#f4f4f6",
            fontSize: fontChart(12),
          },
        },
        title: {
          // enabled: false,
          text: "",
        },
        subtitle: {
          text: "",
        },
        plotOptions: {
          pie: {
            allowPointSelect: false, // 禁用点击
            cursor: "pointer",
            depth: fontChart(15),
            showInLegend: true,
            size: "75%", // 外圈直径大小
            innerSize: fontChart(95), // 内圈直径大小
            center: ["30%", "50%"],
            colors: [
              "rgb(235,147,39)",
              "rgb(234,219,54)",
              "rgb(12,214,137)",
              "rgb(25,234,219)",
              "rgb(13,145,239)",
              "rgb(167,67,234)",
            ],
            dataLabels: {
              useHTML: true,
              enabled: true, //是否显示饼图的线形tip
              distance: 5,
              borderColor: '#007acc',
              align: "center",
              // verticalAlign: 'top',
              position: "right",
              format: "{point.bfb}%",
              // formatter: (point,b) => {
              //   console.log(point,'ponit-->>')
              //   console.log(b,'ponit-->>')
              // },
              color: "#ffffff",
              style: {
                textOutline: "none",
                fontSize: fontChart(13),
              },
            },
          },
        },
        credits: {
          enabled: false, // 禁用版权信息
        },
        series: [
          {
            type: "pie",
            name: "数量",
            data: this.dataList,
          }
        ]
      })
    }
  }
}
</script>
