import menuList from '@/utils/leftMenu'
const viewRouter =  [
  {
    path: "/",
    name: "main",
    component: () => import('@/views/main'),
    redirect: {name:'home'},
    children:[]
  },
]
/*
 *将一个数组中所有没有children的对象拿出来放到一个数组 --- 递归
 */
function handlerMenuList(menuList) {
  const pageRoute = []
  menuList.forEach(item => {
    if(!item.children || !item.children.length) {
      pageRoute.push(item)
    }else {
      pageRoute.push(...handlerMenuList(item.children))
    }
  })
  return pageRoute
}

/*
 *调用上面的方法  添加router中配置对象  来完成 每个菜单进行跳转 加载相对应的组件页面
 */
handlerMenuList(menuList).forEach(item => {
  if(item.path && item.component) {
    viewRouter[0].children.push({
      path:item.path,
      name:item.path.split('/')[item.path.split('/').length - 1],
      meta: {
        title:item.name
      },
      component:item.component
    })
  }
})



export default viewRouter