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
        name:'VueDraggableResizable',
        id:'22',
        children:[],
        path:'/practice/VueDraggableResizable',
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
      {
        name:'穿梭框',
        id:'28',
        children:[],
        path:'/practice/shuttleTable',
        component: () => import('@/views/pages/practice/shuttleTable/shuttleTable')
      },
      {
        name:'B站视频播放效果',
        id:'29',
        children:[],
        path:'/practice/BZ-video',
        component: () => import('@/views/pages/practice/BZ-video/index')
      },
      {
        name:'PDF预览demo',
        id:'291',
        children:[],
        path:'/practice/pdf-preview',
        component: () => import('@/views/pages/practice/pdf-preview/index')
      },
      {
        name:'树形穿梭框',
        id:'292',
        children:[],
        path:'/practice/el-tree-transfer',
        component: () => import('@/views/pages/practice/el-tree-transfer/index')
      }
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
  },
  {
    name: '画布',
    id: '4',
    children: [
      {
        name: 'Fabric',
        id: '41',
        children: [],
        path: '/canvas/fabricStudy',
        component: () => import('@/views/pages/canvas/fabricStudy/fabricStudy')
      },
      {
        name: 'drawPolygon',
        id: '42',
        children: [],
        path: '/canvas/drawPolygon',
        component: () => import('@/views/pages/canvas/drawPolygon/drawPolygon')
      }
    ]
  }
]