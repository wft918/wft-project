<!-- 右下 -->
<template>
  <div :id="id" style="width: 100%;height:100%;"></div>
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
        type: String,
        required:true  //声明这个参数是否必须传入
      },
      title: {
        type: String,
        default: '风险等级统计'
      },
      colorList: {
        type: Array,
        default:() => ['#008eea','#fac800','#ff7d00','#f00041']
      },
      data: {
        type: Array,
        default:() => ([{name:'低风险',value:10},{name:'一般风险',value:6},{name:'较大风险',value:3},{name:'重大风险',value:1}])
      },
      seriesCenter: {
        type: Array,
        default:() => ['60%','50%']
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
      window.removeEventListener('resize', this.selfAdaption)
    },
    methods: {
      drawPie() {
        this.charts = echarts.init(document.getElementById(this.id));
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: this.title,
            textStyle: {
              color:'#868a96',
              fontSize:fontChart(13)
            }
          },
          legend: {
            textStyle: {
              color:'#868a96',
              fontSize:fontChart(13)
            },
            itemWidth: fontChart(20),  // 设置宽度
            itemHeight: fontChart(10), // 设置高度
            x : '10%',
            y : 'center',
            orient : 'vertical',  //horizontal、vertical可选
          },
          color:this.colorList,
          series: [
            {
              // name: 'Nightingale Chart',
              type: 'pie',
              center: this.seriesCenter,
              label: {
                normal: {
                  show: true,
                  position:'inner', //outside、inside同inner、center 可选
                  formatter: '{c}',
                  fontSize:fontChart(13)
                },
              },
              data: this.data
            }
          ]
        };
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