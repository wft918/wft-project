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
        charts:''
      }
    },
    props: {
      id: {
        type: String
      },
      text: {
        type: String,
        default: '这个是头'
      },
      value: {
        type: Number,
        default: 50
      },
      totalNum: {
        type: Number,
        default: 150
      }
    },
    mounted() {
      this.drawPie()
    },
    watch: {
      value() {
        this.drawPie()
      }
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      drawPie() {
        // 基于准备好的dom，初始化echarts实例
        this.charts = echarts.init(document.getElementById(this.id));

        // 指定图表的配置项和数据
        var option = {
          color: ['#414f5b', '#1890ff'],
          series: [
            {
              name: '任务进度',
              type: 'pie',
              radius: ['65%', '95%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: this.totalNum - this.value,
                label: {
                  normal: {
                    show: false,
                  }
                }
              }, {   // 数据值
                value: this.value,
                // 数据项名称
                // name: this.name,
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  // 是显示标签
                  show: true,
                  position: 'center',
                  fontSize: fontChart(10),
                  color: '#fff',
                  lineHeight: fontChart(15),
                  formatter: `{b| ${this.text}}` + '\n\n' + `{c| 打钻进尺}` + '\n\n' + `{a| ${this.value} }` + '\n\n' + `{d| 米}`, //  \n换行  两个就换两行   a、b、c、d后面不能有空格！
                  rich: {
                    a: {
                      color: '#1890ff',
                      fontSize: fontChart(35),
                      fontWeight: 600,
                    },
                    b: {
                      color: '#fff',
                      fontSize: fontChart(25),
                      fontWeight: 600,
                    },
                    c: {
                      color: '#fff',
                      fontSize: fontChart(25),
                      fontWeight: 600,
                    },
                    d: {
                      color: '#fff',
                      fontSize: fontChart(25),
                      fontWeight: 600,
                    }
                  }
                },
              }]
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        this.charts.setOption(option);
        window.addEventListener('resize', this.selfAdaption)
      },
      // 自适应
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
        this.drawPie()
      }
    },
  }
</script>