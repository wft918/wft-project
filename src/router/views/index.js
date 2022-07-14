
const viewRouter =  [
  {
    path: "/",
    name: "main",
    component: () => import('@/views/main'),
    redirect: {name:'home'},
    children:[]
  },
]

export default viewRouter