export default [
  {
    name:'首页',
    id:'1',
    children:[
      {
        name:'首页',
        id:'11',
        children:[],
        path:'/home',
        component: () => import('@/views/pages/home/home')
      }
    ]
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
      },
      {
        name:'局部放大',
        id:'26',
        children:[],
        path:'/practice/localAmplification',
        component: () => import('@/views/pages/practice/localAmplification/localAmplification')
      },
      {
        name:'增删改查',
        id:'27',
        children:[],
        path:'/practice/curd',
        component: () => import('@/views/pages/practice/crud/crudList')
      },
    ]
  },
  {
    name:'图表',
    id:'3',
    children:[
      {
        name:'柱状图',
        id:'31',
        children:[],
        path:'/commonCharts/commonBar',
        component: () => import('@/views/pages/commonCharts/commonBar/commonBar')
      },
      {
        name:'折线图',
        id:'32',
        children:[],
        path:'/commonCharts/commonLine',
        component: () => import('@/views/pages/commonCharts/commonLine/commonLine')
      },
      {
        name:'饼图',
        id:'33',
        children:[],
        path:'/commonCharts/commonPie',
        component: () => import('@/views/pages/commonCharts/commonPie/commonPie')
      }
    ]
  }
]