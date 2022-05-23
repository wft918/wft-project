<template>
  <div>
    <div id="svgTemplate" ref="svg">
    
    </div>
  </div>
</template>
<script>
import wftSvg from "@/assets/img/wft.svg";
import Vue from 'vue/dist/vue.esm.js'
export default {
  data() {
    return {
      svgDom: null,
      allDom: null
    };
  },
  created() {
    this.getSvg();
  },
  mounted() {
    window['handleClick'] = function(e,currNodeId) {
      let tag = e.srcElement || e.target;
      console.log(e, '----->>>')
      console.log(currNodeId, '----->>>')
      // if(tag.innerHTML) {
      //   tag.innerHTML = 'wft'
      // }
      // if(tag.id) {
      //   console.log(tag.id, '----->>>')
      // }
    }
  },
  methods: {
    getSvg() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", wftSvg, true);
      xhr.send();
      xhr.addEventListener("load", () => {
        const resXML = xhr.responseXML
        this.svgDom = resXML.documentElement.cloneNode(true);
        // console.log(this.svgDom, '----->>>')
        this.svgDom.style.width = "90%";
        this.svgDom.style.height = "100%";
        this.svgDom.style.border = "1px solid yellow";
        // this.svgDom.setAttribute("v-on:mousewheel", "this.havcZooming($event)");  // 为svg添加鼠标滚动缩放事件
        // svg - a
        let adomNodeAll = this.svgDom.getElementsByTagName("a");
        for(let i = 0; i < adomNodeAll.length; i++) {
          adomNodeAll[i].style.cursor = 'pointer' // 修改节点样式
          let currNodeId = adomNodeAll[i].getAttribute('id')
          adomNodeAll[i].setAttribute("v-on:click", "this.handleClick($event, '"+ currNodeId +"')"); // 为每个节点绑定点击事件
          let currNode = this.svgDom.getElementById(currNodeId)
        }
        let gtag = this.svgDom.getElementsByTagName("g");
        gtag[0].setAttribute("id", "svgcanvas");
        /* 将svgDom对象转换成vue的虚拟dom */
        var oSerializer = new XMLSerializer();
        var sXML = oSerializer.serializeToString(this.svgDom);
        var Profile = Vue.extend({
            template: "<div>" + sXML + '</div>'
        });
        // 创建实例，并挂载到元素上
        new Profile().$mount('#svgTemplate');
        // document.getElementById('svgTemplate').appendChild(this.svgDom)
        //  svg - g
        let svgcanvasDom = document.getElementById("svgcanvas");
        this.allDom = svgcanvasDom.getElementsByTagName("a");
        for(let i = 0; i < this.allDom.length; i++) {
          if(this.allDom[i].childNodes.length) {
            // console.log(this.allDom[i].childNodes[0], '----->>>')
            if(this.allDom[i].childNodes[0].attributes['xlink:href']) {
              this.allDom[i].childNodes[0].attributes['xlink:href'].value = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAADUElEQVQ4jY2VzW8bRRiHn9kZ7/o7thPbbVGT8NUIQSDtja+ey4EiJFSJSnBBoP4LqBd6QhyQuFW5cUKCAwgu7V/AASkUVDWQFiq3gbYhdrCdxPs5M2gXg8ohZN/L7L6jffTO+/72N8JaS564dPEiFW/DdrtdavU6SZygtUUIwWg85NbNdWK7IlQuGtDvDxjbHicebfH8i08z2hmxs9UnSiyjwRa/3d1EVY6TGyiVhw0trhLMtZtIY/B3HmCMRSkH1y3ilhs4eYGN5jKIEmEUE4UxxgoMkrRlQRggC3VmWyv5gZX6C0wmitFoTBgESOkgpYu2DqPRgCSpUy6fRImvX89HXIJ31gRxWp3WIARCOBgjiKMYbRwQ5f9UuABcBu4A4XS9PM1nYW2EcJzsmFiNMSk8xqJIkj5R9MO/wDPAdeACMA+40/XCNH/m7KcPbLniY4WTkkFYtA6JIx/pCOYaksnwS5tOeRH4HKgdcNg0/8UTKy3mmVB0BUkcopSHEG7WyyOdOnNNhxs/Xctk8z5QP6SDtdunupyvHENIRWwsjhXUGm1UsUqr3UFYn+0/dzPgK3lmsuZannvpXSwGaywCSa1ts36qgkK6mrX1rQzYzQPcivZQ7hHAADod0UO7MstZqzLgFnD8MOAskp+/W8VY8zdCuVidQtJnhUkCere+z4BXgPcOAz65s8+3N69grINyXBCSKA4QQKlUJYp8fr93PwN+CLz5P1NOY/eZ69u1XuKQaloVPDy3iDapFjVuweD7Y4JQZTrsAefSjw6CpfvD3szoxsaQPwYBnaNHWXrqBJ12m0QX+KW3zY/rmwi1cOkfYV8FloFVYBOIpuvqNH/1s7fKDWPKPL44y9lXT3P65WVOLc9z8tlFqhWHMCrSfeTcBw/b153pn3FgtJsl5lplZuoVUq8pepLZRoV2q8R2E2q1x1D2ta8Om0cWH3/0DRveJ5lLR1FMQTqZF6bvUMAk9wj8a/kNtqJuQ6GAUi46FbbVGSzFeZ6H60Iw+TW/H+6Ot3GjPjMztQzq+wGJtpkGq9UyjmPZ2x/nrzC7lKymWCpQb1TRsZ8WjCckUgqSJEJYm7/CzrE3CPdb7N0fM7w7IByE6DHEg4igP8STS8wvvM1fZW5twKdzQs0AAAAASUVORK5CYII="
            }
          }
          // console.log(this.allDom[i].id, '----->>>')
          let child = document.getElementById(this.allDom[i].id);
          if(child.childNodes.length) {
            if(child.childNodes[0].getTotalLength) {
              let length = child.childNodes[0].getTotalLength()
              let duration = length / 50
              let animationString = duration.toFixed(0) + "s " + "linear infinite hacvRun";
              // console.log(length, "length");
              child.childNodes[0].style.strokeDashoffset = length;
              child.childNodes[0].style.animation = animationString;
            }
          }
        }
      });
    }
  }
};
</script>
<style scoped>
/* #svgTemplate {
  width: 100%;
  height: 80%;
} */
/* .svgTemplate img {
  width: 100%;
  height: 100%;
} */

</style>
<style>
/* .water {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear 1;
}

.no-water {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

.first-run {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear 1;
}

.runing {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: run 10s linear infinite;
}

.runwater {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: run 10s linear infinite;
} */

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes run {
  from {
    stroke-dasharray: 10, 5;
  }
  to {
    stroke-dasharray: 40, 5;
  }
}

@keyframes hacvRun {
  from {
    stroke-width: 6;
    /* stroke-dashoffset: 0; */
    stroke-dasharray: 10, 8;
  }
  to {
    stroke-width: 6;
    stroke-dashoffset: 0;
    stroke-dasharray: 10, 8;
  }
}
</style>
