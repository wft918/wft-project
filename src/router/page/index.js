export default [
  {
    path: "*",
    name: "404",
    meta: {
      title:'404'
    },
    component: () => import('@/page/404'),
  },
  {
    path: "/lock",
    name: "lock",
    meta: {
      title:'锁屏页'
    },
    component: () => import('@/page/lock'),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title:'登录页'
    },
    component: () => import('@/page/login'),
  },
  {
    path: "/offineNetwork",
    name: "offineNetwork",
    meta: {
      title:'断网'
    },
    component: () => import('@/page/offineNetwork'),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title:'注册页面'
    },
    component: () => import('@/page/register'),
  },
]