import axios from "axios"
import {message} from "antd"

axios.defaults.baseURL = 'http://localhost:8000'

// axios 拦截器
// https://www.jianshu.com/p/646ed4edf51f
axios.interceptors.response.use(
  // @ts-ignore
  response => {
    if (response.data.ret === 0) {
      return Promise.resolve(response.data)
    } else {
      // return Promise.resolve(response)
      message.error(response.data.msg).then()
      return Promise.reject(response)
    }
  }, error => {
    message.error('网络异常').then()
    return Promise.reject(error)
  }
)


export default function request(
  // config: [url, method]
  config: string[],
  params?: Object
) {
  let [url, method] = config
  if (method === 'get') {
    return axios({
      method: method,
      url: url,
      params: params
    })
  } else {
    // @ts-ignore
    return axios({
      method: method,
      url: url,
      data: params
    })
  }
}