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
    ]
  },
]