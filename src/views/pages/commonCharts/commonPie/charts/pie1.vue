<template>
  <div style="width: 100%;height: 100%;">
    <div :id="id" style="width: 100%;height:100%;"></div>
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
      data: {
        type: Array,
        default: () => ([{ value: 1048, name: 'Search Engine' }, { value: 735, name: 'Direct' }, { value: 580, name: 'Email' }, { value: 484, name: 'Union Ads' }, { value: 300, name: 'Video Ads' }])
      }
    },
    watch: {
      data() {
        this.drawPie()
      }
    },
    mounted() {
      this.drawPie()
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      drawPie() {
        this.charts = echarts.init(document.getElementById(this.id));
        let option = {
          title: {
            show:true,
            text: 'Referer of a Website',
            subtext: 'Fake Data',
            left: 'center',
            textStyle: {//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: fontChart(18),
              color:'#fff'
            },
            subtextStyle: {//副标题文本样式{"color": "#aaa"}
              fontSize: fontChart(12),
              color:'#fff'
            },
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',  //horizontal   vertical
            left: 'left',
            align:'left',
            top:'middle',
            itemWidth: fontChart(20),  // 设置宽度
            itemHeight: fontChart(10), // 设置高度
            textStyle: {
              color:'#fff',
              fontSize:fontChart(12)
            }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: this.data,
              label: {
                normal: {
                  show: true,
                  position:'outside',  //outside、inside同inner、center 可选
                  formatter: '{c}',
                  fontSize:fontChart(13)
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: fontChart(10),
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.charts.setOption(option)
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawPie()
      }
    }
  }
</script>