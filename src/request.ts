import axios from "axios"
import {message} from "antd"

axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.baseURL = 'http://www.frankxii.com:8000'

axios.defaults.timeout = 1000 * 4

// axios 拦截器
// https://www.jianshu.com/p/646ed4edf51f
axios.interceptors.response.use(
  // @ts-ignore
  (response) => {
    if (response.data.ret === 0) {
      // 如果不是get请求，打印msg
      if (response.config.method !== "get") {
        message.success(response.data.msg, 2).then()
      }
      return Promise.resolve(response.data)
    } else {
      message.error(response.data.msg, 2).then()
      // 不返回promise，后续的回调会收到undefined
      // return Promise.reject(response)
    }
  }, () => {
    message.error('网络异常').then()
    // return Promise.reject(error)
  }
)


export default function request(
  // config: [url, method]
  config: string[],
  params?: Object
) {
  let [url, method] = config
  // get请求用url传递参数，其他请求传递json
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