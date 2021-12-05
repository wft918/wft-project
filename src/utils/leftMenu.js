export default [
  {
    name:'首页',
    id:'1',
    children:[],
    path:'/home',
    component: () => import('@/views/pages/home/home')
  },
  {
    name:'练习',
    id:'2',
    children:[
      {
        name:'图片懒加载',
        id:'21',
        children:[],
        path:'/practice/lazyLoad',
        component: () => import('@/views/pages/practice/photoLazyLoad/photoLazyLoad')
      },
      {
        name:'VueDraggableResizable2',
        id:'22',
        children:[],
        path:'/practice/VueDraggableResizable2',
        component: () => import('@/views/pages/practice/draggableResizable/draggableResizable')
      },
      {
        name:'easyplayer',
        id:'23',
        children:[],
        path:'/practice/easyPlayer',
        component: () => import('@/views/pages/practice/easyPlayer/easyPlayer')
      },
      {
        name:'videojs',
        id:'24',
        children:[],
        path:'/practice/videojs',
        component: () => import('@/views/pages/practice/videojs/videoModel')
      },
      {
        name:'拖拽',
        id:'25',
        children:[],
        path:'/practice/dragtest',
        component: () => import('@/views/pages/practice/dragTest/dragTest')
      }
    ]
  },
  {
    name:'导航3',
    id:'3',
    children:[]
  }
]