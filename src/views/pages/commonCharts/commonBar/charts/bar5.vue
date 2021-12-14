<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
  </div>
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
        type: String,
      },
      xValue: {
        type: Array,
        default: () => ['区域1','区域2','区域3','区域4','区域5','区域6','区域7','区域8']
      },
      yValue: {
        type: Array,
        default: () => [5,7,3,4,6,8,6,5]
      },
      yname: {
        type: String,
        default: '人'
      },
      xname: {
        type: String,
        default: '区域'
      }
    },
    watch: {
      yValue() {
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show: false,
            data: ['违章指挥'],
            textStyle: {
              fontSize: fontChart(12),
              color: '#7e8390'
            },
            // itemStyle: {
            //   borderType: 'dashed',
            //   borderColor: '#0182d6',
            //   borderWidth: 1
            // }
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '10%',
            top: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            name: this.xname,
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(13)
            },
            data: this.xValue,
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#0f5681'
              }
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: fontChart(10),
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(14)     //更改坐标轴文字大小
              }
            }
          },
          yAxis: {
            type: 'value',
            name: this.yname,
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: fontChart(13)
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.8)',  //更改坐标轴文字颜色
                fontSize: fontChart(14)      //更改坐标轴文字大小
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
              // name: '违章指挥',
              type: 'bar',
              barWidth: '30%',
              label: {
                show: true,
                position: 'top'
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true,//是否显示 
                    position: 'top',//显示位置
                    textStyle: {
                      color: '#fff',
                      fontSize: fontChart(13)
                    },
                    formatter: (params) => {//核心部分 formatter 可以为字符串也可以是回调 
                      if (params.value) {//如果当前值存在则拼接
                        // console.log(params,'echarts---->')
                        // return params.value + '/' //拼接上限
                        return params.value //拼接上限
                      } else {//否则返回个空
                        return '';
                      }
                    }
                  },
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#32befe' },
                      { offset: 1, color: '#016cf4' }
                    ]
                  )
                },
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#32befe' },
                    { offset: 1, color: '#016cf4' }
                  ]
                )
              },
              data: this.yValue
            },
          ]
        }
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
<style scoped>

</style>