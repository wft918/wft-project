import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'
import http from '@/utils/request1'
import utils from '@/utils'
import VueLazyLoad from 'vue-lazyload'
import '@/assets/font/font.css'
import 'video.js/dist/video-js.css'
// 可拖拽缩放组件全局注册 -- VueDraggableResizable
import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)


Vue.use(ElementUI);

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/img/2.jpg'),
  loading: require('./assets/img/2.jpg'),
  attempt: 2,
})

Vue.config.productionTip = false;

Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$events = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
