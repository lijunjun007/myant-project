import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
// 问题：在于Vue-router在3.1之后把$router.push()方法改为了Promise
// 报错：[NavigationDuplicated {_name: “NavigationDuplicated”, name: “NavigationDuplicated”}]。
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
// 解决： 禁止全局路由错误处理打印

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
