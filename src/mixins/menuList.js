import menuData from '@/utils/leftMenu'

export const menuListMixin = {
  computed: {
    menuList:() => menuData
  }
}