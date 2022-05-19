<template>
  <div :id="id" style="width: 100%;height: 100%;"></div>
</template>
<script>
  import * as echarts from 'echarts'
  import { fontChart } from '@/utils/echartPxToRem.js'
  export default {
    data() {
      return {
        charts: ''
      }
    },
    props: {
      id: {
        type:String,
        required:true  //声明这个参数是否必须传入
      },
      colorList: {
        type: Array,
        default: () => ['#1760bc', '#029bff']
      },
      alert: {   //标记线
        type:Number,
        default: 300
      },
      early: {   //标记线
        type:Number,
        default: 200
      },
      xValue: {
        type: Array,
        default: () => ['2021-09-15', '2021-09-16', '2021-09-17', '2021-09-18', '2021-09-19', '2021-09-20', '2021-09-21']
      },
      yValue1: {
        type: Array,
        default: () => [320, 332, 301, 334, 390, 330, 320]
      },
      yValue2: {
        type: Array,
        default: () => [120, 132, 101, 134, 90, 230, 210]
      }
    },
    watch: {
      yValue2(newValue) {
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
          colorList:this.colorList,
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['深层位移', '浅层位移'],
            textStyle: {
              fontSize: fontChart(13),
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '6%',
            right: '8%',
            bottom: '3%',
            width: 'auto',
            height: 'auto',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            offset:fontChart(0),//x轴文字距离x轴的偏移量
            axisTick: {
              show:false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#0f5681'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            // max: 60,
            type: 'value',
            name: 'mm', //单位
            nameTextStyle: {
              fontSize:fontChart(12),
              align:'right'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: fontChart(13),      //更改坐标轴文字大小
                align:'right'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#0f5681',
                type: 'dotted'
              }
            },
          },
          series: [
            {
              name: '深层位移',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#1760bc'
              },
              label: {
                show:true,
                position: 'top',
                textStyle: {
                  color:'#fff',
                  fontSize:fontChart(13)
                }
              },
              data: this.yValue1,
              markLine: {
                symbol: ["none", "none"], //去掉箭头,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      type: "dashed", //线条样式
                    },
                    label: {
                      show: true,
                      position: "end", // 文字显示的位置
                    },
                  },
                },
                data: [
                  {
                    name: "警戒值",
                    // type: "min",
                    // valueDim: "close",
                    yAxis: this.alert, // 标记线x轴的值  警戒线
                    itemStyle: {
                      color:'#93101f'
                    }
                  },
                  {
                    name: "预警值",
                    // type: "max",
                    // valueDim: "close",
                    yAxis: this.early, // 第二条标记线x轴的值  预警线
                    itemStyle: {
                      color:'#c36f30'
                    }
                  },
                ]
              }
            },
            {
              name: '浅层位移',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#02bfff',
              },
              label: {
                show:true,
                position: 'top',
                textStyle: {
                  color:'#fff',
                  fontSize:fontChart(13)
                }
              },
              data: this.yValue2
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if (!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    },
  }
</script>