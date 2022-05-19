<template>
  <div>
    <div class="svgTemplate" id="svgTemplate"></div>
  </div>
</template>
<script>
import wftSvg from "@/assets/img/wft.svg";
export default {
  data() {
    return {
      svgDom: null,
    };
  },
  mounted() {
    this.getSvg();
  },
  methods: {
    getSvg() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", wftSvg, true);
      xhr.send();
      xhr.addEventListener("load", () => {
        this.svgDom = xhr.responseXML.documentElement.cloneNode(true);
        console.log(this.svgDom);
        this.svgDom.style.width = "100%";
        this.svgDom.style.height = "100%";
        this.svgDom.style.border = "1px solid yellow";
        // var oSerializer = new XMLSerializer();
        // var sXML = oSerializer.serializeToString(this.svgDom);
        document.getElementById("svgTemplate").appendChild(this.svgDom);
        //  搜索指定元素的后代
        let btnTakePhotoDom = this.svgDom.getElementsByTagName("a");
        for (let i = 0; i < btnTakePhotoDom.length; i++) {
          console.log(btnTakePhotoDom[i], typeof btnTakePhotoDom[i]);
        }
      });
    },
  },
};
</script>
<style scoped>
.svgTemplate {
  width: 100%;
  height: 100%;
}
</style>
