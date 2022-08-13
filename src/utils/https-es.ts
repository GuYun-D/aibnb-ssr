import axios, { AxiosRequestConfig } from 'axios'

const defaultConfig = {
  timeout: 5000,
  baseUrl: ''
}

const axiosInstance = axios.create(defaultConfig)

/**
 * @description 请求拦截器
 */
axiosInstance.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})


/**
 * @description 响应拦截器
 */
axiosInstance.interceptors.response.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

/**
 * 封装get请求
 * @param {*} url 路径 
 * @param {*} params 参数
 * @returns 
 */
function httpRequestGet(url: string, params: AxiosRequestConfig<any> | undefined) {
  return axiosInstance.get(url, params).then(res => res.data).catch()
}

/**
 * 封装post请求
 * @param url 
 * @param data 
 * @returns 
 */
function httpRequestPost(url: string, data: AxiosRequestConfig<any> | undefined) {
  return axiosInstance.get(url, data).then(res => res.data).catch()
}

export default {
  httpRequestGet,
  httpRequestPost
}


