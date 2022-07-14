export default [
  {
    name:'首页',
    id:'1',
    children:[
      {
        name:'首页',
        id:'11',
        children:[],
        path:'/home/index'
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
        path:'/practice/photoLazyLoad/index'
      },
      {
        name:'VueDraggableResizable',
        id:'22',
        children:[],
        path:'/practice/draggableResizable/index'
      },
      {
        name:'easyplayer',
        id:'23',
        children:[],
        path:'/practice/easyPlayer/index'
      },
      {
        name:'videojs',
        id:'24',
        children:[],
        path:'/practice/videojs/index'
      },
      {
        name:'拖拽',
        id:'25',
        children:[],
        path:'/practice/dragTest/index'
      },
      {
        name:'局部放大',
        id:'26',
        children:[],
        path:'/practice/localAmplification/index'
      },
      {
        name:'增删改查',
        id:'27',
        children:[],
        path:'/practice/crud/crudList'
      },
      {
        name:'穿梭框',
        id:'28',
        children:[],
        path:'/practice/shuttleTable/index'
      },
      {
        name:'B站视频播放效果',
        id:'29',
        children:[],
        path:'/practice/BZ-video/index'
      },
      {
        name:'PDF预览demo',
        id:'291',
        children:[],
        path:'/practice/pdfPreview/index'
      },
      {
        name:'树形穿梭框',
        id:'292',
        children:[],
        path:'/practice/elTreeTransfer/index'
      },
      {
        name:'二维码生成',
        id:'293',
        children:[],
        path:'/practice/qrcode/index'
      },
      {
        name:'vis拓扑图',
        id:'294',
        children:[],
        path:'/practice/vis/index'
      },
      {
        name:'BaiduMap',
        id:'295',
        children:[],
        path:'/practice/BaiduMap/index'
      },
      {
        name:'svg',
        id:'296',
        children:[],
        path:'/practice/svg/index'
      },
      {
        name:'crypto',
        id:'297',
        children:[],
        path:'/practice/crypto/index'
      },
      {
        name:'数字滚动',
        id:'298',
        children:[],
        path:'/practice/vCountTo/index'
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
        path:'/commonCharts/commonBar/index'
      },
      {
        name:'折线图',
        id:'32',
        children:[],
        path:'/commonCharts/commonLine/index'
      },
      {
        name:'饼图',
        id:'33',
        children:[],
        path:'/commonCharts/commonPie/index'
      },
      {
        name:'中国MAP',
        id:'34',
        children:[],
        path:'/commonCharts/map/china'
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
        path: '/canvas/fabricStudy/index'
      },
      {
        name: 'drawPolygon',
        id: '42',
        children: [],
        path: '/canvas/drawPolygon/index'
      },
      {
        name: 'ThreeJS',
        id: '43',
        children: [],
        path: '/canvas/threejs/index'
      }
    ]
  },
  {
    name: 'Three',
    id: '5',
    children: [
      {
        name: 'Three1',
        id: '51',
        children: [],
        path: '/Three/firstThree/index',
        component: () => import('@/views/pages/Three/firstThree/index')
      },
      {
        name: 'Three2',
        id: '52',
        children: [],
        path: '/Three/twoThree/index'
      }
    ]
  }
]