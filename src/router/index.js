import Vue from "vue";
import VueRouter from "vue-router";
import pageRouter from './page'
import viewsRouter from './views'

Vue.use(VueRouter);



const router = new VueRouter({
  mode:'hash',
  routes:[...pageRouter,...viewsRouter],
});


//解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
const VueRouterReplace = VueRouter.prototype.replace
  VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
const VueRouterPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// router.beforeEach((to,from,next) => {
//   let token = localStorage.getItem('token')
//   if(!token) {
//     if(to.path != '/login') {
//       next({ path: '/login' })
//     }else {
//       next()
//     }
//   }else {
//     next()
//   }
// })


export default router;
