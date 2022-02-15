import axios from 'axios'
import {store} from '../redux/store'
// axios.defaults.baseURL="http://localhost:8080"

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 显示loading
    store.dispatch({
        type:"change_loading",
        payload:true
    })
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    store.dispatch({
        type:"change_loading",
        payload:false
    })

    //隐藏loading
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch({
        type:"change_loading",
        payload:false
    })

     //隐藏loading
    return Promise.reject(error);
  });
