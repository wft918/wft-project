import Vue from "vue";
import VueRouter from "vue-router";
import pageRouter from './page'
import viewsRouter from './views'

Vue.use(VueRouter);



const router = new VueRouter({
  mode:'hash',
  routes:[...pageRouter,...viewsRouter],
});

export default router;
