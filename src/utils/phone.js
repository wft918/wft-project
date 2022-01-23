
/**
 *  移动端开发   适配方案
 *  暂时还没用过
 */
(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  recalc = function () {
    //  js获取当前设备的大小：document.documentElement.clientWidth;
    var clientWidth = docEl.clientWidth; // 获取设备的宽度
    if(!clientWidth) return;
    if(clientWidth >= 750) {  // 宽度大于等于  平板 或者 桌面
      docEl.style.fontSize = '100px'; // 根元素
    } else {  // 移动端的适配
      // 设置：html根元素的大小    100设计稿的html大小  750设计稿(根据设计稿变化
      //测试设计稿大小：测量的值px  px转rem   测量的px/100=?rem  直接在css里面写
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
    }
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document,window)