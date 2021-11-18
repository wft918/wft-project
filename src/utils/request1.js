import axios from 'axios'
import qs from 'qs'  //querystring



/*
 *根据环境变量区分接口的默认地址
 */
if(process.env.NODE_ENV === 'production') {  //生产环境
  axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
}else {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API
}

/*
 *设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true

/*
 *设置请求传递数据的格式（看服务器要求什么格式）
 *x-www-from-urlencoded
 */
 axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

 // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
 axios.defaults.transformRequest = data => qs.stringify(data)    //主要针对post请求


/*
 *设置请求拦截器
 *客户端发请求 -> 【请求拦截器】  -> 服务器
 *TOKEN校验(JWT) : 接受服务器返回的token, 存储到本地/vuex,
 * 每次向服务器发请求，携带上token  （headers）
 */

 axios.interceptors.request.use(config => {
  //  携带token
  let token = localStorage.getItem('token');
  if(token) {
    config.headers.Authorization = token
  }

  return config  //一定要return
 }, error => {
  return Promise.reject(error);
 })


 /*
 *响应拦截器
 *服务器返回信息  ->  [拦截的统一处理]  ->  客户端JS获取到信息
 */

 axios.interceptors.response.use(response => {
   return response.data;
 }, error => {
   if(error.response) {  //错误信息  起码服务器返回信息了
    if(error.response.status == 401) {  //权限问题   token不对  或是 没有携带token
      //...
    }else if(error.response.status == 402 || error.response.status == 403) {  // 403 -> token过期
      //...   可以跳转的登录页
    }else if(error.response.status == 404) {  //路径错误  找不到页面
      //可以跳转到404页面
    }
   }else {  //  服务器没有返回任何信息
    if(!window.navigator.onLine) {
      // 断网处理   可以跳转到断网页面
      return
    }
    return Promise.reject(error)
   }
 })


 export default axios