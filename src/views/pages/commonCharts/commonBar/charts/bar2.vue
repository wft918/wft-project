<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script>
  import { fontChart } from '@/utils/echartPxToRem'
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        charts: ''
      }
    },
    props: {
      id: {
        type: String
      },
      xValue: {
        type: Array,
        default: () => ['202101', '202102', '202103', '202104', '202105', '202106']
      },
      yValue: {
        type: Array,
        default: () => [12, 23, 34, 22, 14, 19]
      }
    },
    watch: {
      yValue(newValue) {
        this.drawBar()
      }
    },
    mounted() {
      this.drawBar()
    },
    destroyed() {
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawBar() {
        this.charts = echarts.init(document.getElementById(this.id))
        let option = {
          color: ['#acff02', '#fac800', '#ff7d00', '#0fb42c'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
              type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          legend: {
            show: false,
            top: fontChart(15),
            right: 0,
            x: 'center',
            y: 'top',
            // data: '',
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(12)
            },
            itemWidth: fontChart(12),
            itemHeight: fontChart(12)
          },
          xAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#0092D5'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              }
            },
            data: this.xValue
          },
          yAxis: {
            name: "(万吨)",
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(13),
              align: 'right'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: '#0092D5',
                opacity: 0.3
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            },
          },
          grid: {
            top: '25%',
            bottom: '10%',
            left: '12%',
            right: '2%'
          },
          series: [
            {
              name: '总计',
              barWidth: fontChart(15),
              type: 'bar',
              data: this.yValue,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    // position: 'insideLeft', //在上方显示
                    offset: [8, 0],
                    textStyle: { //数值样式
                      color: '#fff',
                      fontSize: fontChart(13)
                    }
                  },
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "#0069F5" // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: "#35C3FF" // 100% 处的颜色
                  }], false)
                }
              }
            }
          ]
        };
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if (!this.charts) return
        this.charts.resize()
        this.drawBar(this.id)
      }
    }
  }
</script>