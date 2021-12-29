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
        charts:''
      }
    },
    props: {
      id: {
        type: String,
        required:true  //声明这个参数是否必须传入
      },
      xValue: {
        type: Array,
        default: () => ['202101','202102','202103','202104','202105','202106']
      },
      yValue1: {
        type: Array,
        default: () => [12,23,34,22,14,19]
      },
      yValue2: {
        type: Array,
        default: () => [22,13,34,12,24,29]
      }
    },
    watch: {
      yValue2(newValue) {
        console.log(newValue,'yValue2新值------>>>>>')
        this.drawBar()
      }
    },
    mounted() {
      this.drawBar()
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      drawBar() {
        this.charts = echarts.init(document.getElementById(this.id))
        let option = {
          title: {
            show:false,
            text: 'Waterfall Chart',
            subtext: 'Living Expenses in Shenzhen'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            show:true,
            // data: ['月度隐患', '未闭合隐患'],
            textStyle: {
              fontSize: fontChart(13),
              color: '#7e8390'
            },
            itemStyle: {
              borderType: 'dashed',
              borderColor: '#0182d6',
              borderWidth: 1
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.xValue,
            offset: fontChart(10),
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
              rotate: fontChart(12),
              align: 'center',
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: fontChart(13)      //更改坐标轴文字大小
              },
            }
          },
          yAxis: {
            type: 'value',
            name: '个',
            offset:fontChart(10),//x轴文字距离x轴的偏移量
            nameTextStyle: {
              color:'rgba(255, 255, 255, 0.8)',
              fontSize:fontChart(12),
              align:'right', //水平对齐方式
              verticalAlign:'bottom'  //垂直对齐方式
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#7e8390',  //更改坐标轴文字颜色
                fontSize: fontChart(13),      //更改坐标轴文字大小
                align:'left'
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
              name: '月度隐患',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: '#0384d8'
              },
              label: {
                show: true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue1
            },
            {
              name: '未闭合隐患',
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: 'transparent',
                borderType: 'dashed',
                borderColor: '#0182d6'
              },
              label: {
                show: true,
                position: 'top',
                color:'rgba(255, 255, 255, 0.8)',
                fontSize:fontChart(13)
              },
              data: this.yValue2
            }
          ]
        }
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawBar()
      }
    }
  }
</script>