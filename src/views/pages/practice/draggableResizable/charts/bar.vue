<template>
  <div :id="id" style="width: 100%;height: 100%;"></div>
</template>
<script>
  import * as echarts from 'echarts';
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
        default: () => ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yValue: {
        type: Array,
        default: () => [5, 20, 36, 10, 10, 20]
      },
      resizeNum: {
        type:Number
      }
    },
    watch: {
      'resizeNum': { //当父容器开始拖拽的时候  能够自适应
        handler(newVal) {
          if(this.charts) {
            // console.log(newVal,'变了-----')
            this.charts.resize()
          }
        },
        deep:true,
        immediate:true
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.drawBar()
      })
    },
    destroyed() {
      window.removeEventListener('resize',this.selfAdaption)
    },
    methods: {
      drawBar() {
        this.charts = echarts.init(document.getElementById(this.id));
        let option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        }
        this.charts.setOption(option)
        window.addEventListener('resize',this.selfAdaption)
      },
      selfAdaption() {
        if(!this.charts) return
        this.charts.resize()
      }
    }
  }
</script>