export default [
  {
    path: "/",
    name: "main",
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
        path: 'practice/lazyLoad',
        name: 'lazyLoad',
        meta: {
          title: '图片懒加载'
        },
        component: () => import('@/views/pages/practice/photoLazyLoad/photoLazyLoad')
      },
      {
        path: 'practice/easyPlayer',
        name: 'easyplayer',
        meta: {
          title: 'easyplayer'
        },
        component: () => import('@/views/pages/practice/easyPlayer/easyPlayer')
      },
      {
        path: 'practice/videojs',
        name: 'videojs',
        meta: {
          title: 'videojs'
        },
        component: () => import('@/views/pages/practice/videojs/videoModel')
      },
    ]
  },
]