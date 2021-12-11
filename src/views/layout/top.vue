<template>
  <div style="width: 100%;height: 100%;">

    <!-- 右边 -->
    <div style="height: 100%;float: right;display: flex;">
      <!-- 时间 -->
      <div style="height: 100%;display: flex;align-items: center;margin-right: .104167rem;font-size: .15625rem;">
        <div class="time">{{currentTime}}</div>
      </div>
      <!-- 日期--周 -->
      <div style="height: 100%;display: flex;flex-direction: column;justify-content: center;text-align: center;">
        <div class="date">{{currentDate}}</div>
        <div class="week" style="margin-top: .026042rem;">{{currentWeek}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentTime: '00:00:00',
        interVal: null
      }
    },
    computed: {
      currentDate() {
        return this.get_date(0)
      },
      currentWeek() {
        return this.get_week(this.currentDate)
      }
    },
    mounted() {
      this.getCurrentTime()
    },
    destroyed() {
      clearInterval(this.interVal)
    },
    methods: {
      // 轮询获取当前时间24H制
      getCurrentTime() {
        this.interVal = setInterval(() => {
          this.currentTime = new Date().toLocaleTimeString('chinese', { hour12: false })
        },1000)
      },
      /**
       * 获取指定时间的日期
       * @params 正是今天之后的日期、负是今天前的日期
       * @return 2020-08-22
       * */
      get_date(num) {
        var date1 = new Date();
        //今天时间
        var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + num);
        //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
        var time2 = this.addZero(date2.getFullYear()) + "-" + this.addZero((date2.getMonth() + 1)) + "-" + this.addZero(date2.getDate());
        return time2;
      },
      addZero(num) {//补0
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },
      /**
       * 根据指定时间的日期-获取
       * @params 2020-8-22
       * @return 周六
       * */
      get_week(datestr) {
        var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weekArray[new Date(datestr).getDay()];
        return week;
      },
    }
  }
</script>
<style scoped lang="scss">
  .time {
    font-family: 'ysbth';
    /* 字体倾斜 */
    font-style: oblique;
    background-image: -webkit-linear-gradient(left,green,yellow,pink, blue, red 25%,green 35%,blue 50%,yellow 60%, red 75%, pink 85%,blue 100%);
    /* //颜色填充 透明 */
    -webkit-text-fill-color: transparent;
    /* 背景颜色绘制区域 */
    -webkit-background-clip: text;
    /* 流动 15秒 循环 直线 */
    animation: stream 15s infinite linear;
    background-size: 200% 100%;
  }
  /* 匀速流动 */
  @keyframes stream {       
    0%  {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
  }

  .date,
  .week {
    font-size: .083333rem;
    font-family: 'ysbth';
    color: #8c888b;
    /* 字体倾斜 */
    font-style: oblique;
    background: -webkit-linear-gradient(45deg, #70f7fe, #fbd7c6, #fdefac, #392bf3, #bed5f5);
    -moz-linear-gradient: (45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
    -ms-linear-gradient: (45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
    /*设置字体颜色透明*/
    color: transparent;
    /*背景裁剪为文本形式*/
    -webkit-background-clip: text;
    /*动态10s展示*/
    animation: ran 20s linear infinite;
  }
  @keyframes ran {
      from {
          backgroud-position: 0 0;
      }
      to {
          background-position: 10.416667rem 0;
      }
  }
</style>