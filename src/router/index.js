import Vue from "vue";
import VueRouter from "vue-router";
import pageRouter from './page'
import viewsRouter from './views'
import menuList from '@/utils/leftMenu'

Vue.use(VueRouter);

const _import = require('./import-' + process.env.NODE_ENV)


const router = new VueRouter({
  mode:'hash',
  routes:[...pageRouter,...viewsRouter],
});

function flatTree(tree) {
  const list = []
  tree.forEach(item => {
    if(item.children && item.children.length) {
      list.push(...flatTree(item.children))
    } else {
      list.push(item)
    }
  })
  return list
}

export const flatMenuRoutes = flatTree(menuList)

for(let i = 0; i < flatMenuRoutes.length; i++) {
  if(!flatMenuRoutes[i].path) continue
  const o = {}
  o.path = flatMenuRoutes[i].path.replace('/', '')
  let names = o.path.split('/')
  o.name = names.length >= 2 ? names[names.length - 2] : names[names.length - 1]
  o.meta = { title: flatMenuRoutes[i].name }
  o.component = _import(flatMenuRoutes[i].path)
  router.addRoute('main', o)
}


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
