export default [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/main'),
    redirect: {name:'home'},
    children:[
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/pages/home/home')
      },
      {
        path: 'lazyLoad',
        name: 'lazyLoad',
        meta: {
          title: '图片懒加载'
        },
        component: () => import('@/views/pages/photoLazyLoad/photoLazyLoad')
      },
    ]
  },
]