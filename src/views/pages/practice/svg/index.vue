<template>
  <div>
    <div id="svgTemplate" ref="svg"></div>
  </div>
</template>
<script>
import wftSvg from "@/assets/img/wft.svg";
import Vue from 'vue/dist/vue.esm.js'
import * as d3 from "d3"; //在vue文件里面引入d3
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
    //  svg 点击事件
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
    },
    //  svg 鼠标滚动事件
    window['havcZooming'] = (e) => {
      console.log(e, 'havcZooming----->>>')
      this.zoomimg();
    }
  },
  methods: {
    getSvg() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", wftSvg, true);
      xhr.send();
      xhr.addEventListener("load", () => {
        const resXML = xhr.responseXML  //  this.stringToXml(xhr.responseXML)
        this.svgDom = resXML.documentElement.cloneNode(true); // 克隆节点
        // console.log(this.svgDom, '----->>>')
        // 为 svg - dom 设置宽高边框样式
        this.svgDom.style.width = "100%";
        this.svgDom.style.height = "100vh";
        this.svgDom.style.border = "1px solid yellow";
        // 为svg添加鼠标滚动缩放事件
        this.svgDom.setAttribute("v-on:mousewheel", "this.havcZooming($event)");
        // svg - a
        let adomNodeAll = this.svgDom.getElementsByTagName("a");
        //  循环修改节点样式 添加事件
        for(let i = 0; i < adomNodeAll.length; i++) {
          adomNodeAll[i].style.cursor = 'pointer' // 修改节点样式
          let currNodeId = adomNodeAll[i].getAttribute('id')
          adomNodeAll[i].setAttribute("v-on:click", "this.handleClick($event, '"+ currNodeId +"')"); // 为每个节点绑定点击事件
          let currNode = this.svgDom.getElementById(currNodeId)
        }
        //  设置 id 属性
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
          // console.log(this.allDom[i].childNodes,'childNodes');
          let curraNodeId = this.allDom[i].id // 当前a标签节点的id,我们可以根据id获取对应节点数据并将其渲染对应的font标签上
          // console.log(curraNodeId, '当前a标签下的节点id----->>>')
          if(this.allDom[i].childNodes.length) { // 如果a标签下还有子元素
            //  修改节点数据(a 标签里面有 font 标签 即节点的数据)
            let fontDom = this.allDom[i].getElementsByTagName("font");
            if(fontDom.length) {
              // 可以根据 curraNodeId 获取该节点对应的数据并渲染到font标签上
              fontDom[0].innerHTML = 'self'
            }

            //  修改图片(a 标签中有 image 标签 , 即节点图片)
            let imageDom = this.allDom[i].getElementsByTagName("image");
            if(imageDom.length) {
              imageDom[0].attributes['xlink:href'].value = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAYAAAALHW+jAAADUElEQVQ4jY2VzW8bRRiHn9kZ7/o7thPbbVGT8NUIQSDtja+ey4EiJFSJSnBBoP4LqBd6QhyQuFW5cUKCAwgu7V/AASkUVDWQFiq3gbYhdrCdxPs5M2gXg8ohZN/L7L6jffTO+/72N8JaS564dPEiFW/DdrtdavU6SZygtUUIwWg85NbNdWK7IlQuGtDvDxjbHicebfH8i08z2hmxs9UnSiyjwRa/3d1EVY6TGyiVhw0trhLMtZtIY/B3HmCMRSkH1y3ilhs4eYGN5jKIEmEUE4UxxgoMkrRlQRggC3VmWyv5gZX6C0wmitFoTBgESOkgpYu2DqPRgCSpUy6fRImvX89HXIJ31gRxWp3WIARCOBgjiKMYbRwQ5f9UuABcBu4A4XS9PM1nYW2EcJzsmFiNMSk8xqJIkj5R9MO/wDPAdeACMA+40/XCNH/m7KcPbLniY4WTkkFYtA6JIx/pCOYaksnwS5tOeRH4HKgdcNg0/8UTKy3mmVB0BUkcopSHEG7WyyOdOnNNhxs/Xctk8z5QP6SDtdunupyvHENIRWwsjhXUGm1UsUqr3UFYn+0/dzPgK3lmsuZannvpXSwGaywCSa1ts36qgkK6mrX1rQzYzQPcivZQ7hHAADod0UO7MstZqzLgFnD8MOAskp+/W8VY8zdCuVidQtJnhUkCere+z4BXgPcOAz65s8+3N69grINyXBCSKA4QQKlUJYp8fr93PwN+CLz5P1NOY/eZ69u1XuKQaloVPDy3iDapFjVuweD7Y4JQZTrsAefSjw6CpfvD3szoxsaQPwYBnaNHWXrqBJ12m0QX+KW3zY/rmwi1cOkfYV8FloFVYBOIpuvqNH/1s7fKDWPKPL44y9lXT3P65WVOLc9z8tlFqhWHMCrSfeTcBw/b153pn3FgtJsl5lplZuoVUq8pepLZRoV2q8R2E2q1x1D2ta8Om0cWH3/0DRveJ5lLR1FMQTqZF6bvUMAk9wj8a/kNtqJuQ6GAUi46FbbVGSzFeZ6H60Iw+TW/H+6Ot3GjPjMztQzq+wGJtpkGq9UyjmPZ2x/nrzC7lKymWCpQb1TRsZ8WjCckUgqSJEJYm7/CzrE3CPdb7N0fM7w7IByE6DHEg4igP8STS8wvvM1fZW5twKdzQs0AAAAASUVORK5CYII='
            }
            
            //  设置支路的移动动画 (有 getTotalLength 即为线节点)
            if(this.allDom[i].childNodes[0].getTotalLength) {
              // 使不同长度线路动画速度一致
              let length = this.allDom[i].childNodes[0].getTotalLength()
              let duration = length / 50
              let animationString = duration.toFixed(0) + "s " + "linear infinite hacvRun";
              // console.log(length, "length");
              this.allDom[i].childNodes[0].style.strokeDashoffset = length;
              this.allDom[i].childNodes[0].style.animation = animationString;
            }
          }
        }
      });
    },
    zoomimg(x, y) {
      // 放大缩小
      // 缩放事件绑定给svg,缩放结果设置给svg内部的g标签
      if (!x) {
        x = 0;
      }
      if (!y) {
        y = 0;
      }
      const svg = d3.select("svg");
      const g = d3.select("#svgcanvas");
      // console.log(svg, g, "in havcZooming");
      //节点的缩放
      function zoomActions() {
        // console.log(d3.event, '----->>>') // undefind
        // g.attr("transform", d3.event.transform);
        g.attr("transform", d3.zoomTransform(svg.node()));
      }
      let zoomHandler = d3.zoom().on("zoom", zoomActions).scaleExtent([0.5, 40]);

      // zoomHandler(svg)
      svg.call(zoomHandler);
      svg.transition().duration(750).call(zoomHandler.transform, d3.zoomIdentity.translate(-x, -y).scale(2));
      // // 点击按钮定位
      // d3.select("#reset").on("click", function () {
      //   svg
      //     .transition()
      //     .duration(750)
      //     .call(zoomHandler.transform, d3.zoomIdentity);
      // });
      // d3.select('#pos1').on('click',function(){
      //   svg.transition().duration(750).call(zoomHandler.transform, d3.zoomIdentity.translate(-10,-1500).scale(2));
      // });
      // d3.select('#pos2').on('click',function(){
      //   svg.transition().duration(750).call(zoomHandler.transform, d3.zoomIdentity.translate(-1200,-10).scale(2));
      // });
    },
    stringToXml(xmlString) {
      let xmlDoc = null
      if (typeof xmlString == "string") {
        //FF
        if (document.implementation.createDocument) {
          var parser = new DOMParser();
          xmlDoc = parser.parseFromString(xmlString, "text/xml");
        } else if (window.ActiveXObject) {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(xmlString);
        }
      }else {
        xmlDoc = xmlString;
      }
      return xmlDoc;
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
