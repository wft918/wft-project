import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'
import http from '@/utils/request1'


Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$http = http
Vue.prototype.$events = new Vue()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
