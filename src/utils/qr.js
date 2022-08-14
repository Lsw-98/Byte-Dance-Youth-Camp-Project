import axios from "axios";

// 配置axios基本项
const qrRequest = axios.create({
  baseURL: "http://wechat.5656dh.com",
  withCredentials: true
})

// 在响应拦截器中响应数据进行判断
qrRequest.interceptors.response.use(function (res) {
  if (res.data.code === 401) {
    // 提示用户登录token过期
    console.log("用户身份过期");
    // 去状态管理器中注销登录

  }

  return res.data
})

export default qrRequest