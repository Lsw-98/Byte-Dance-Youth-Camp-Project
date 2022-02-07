import axios from 'axios'
import Qs from 'qs'
import msg from './message'

//http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
			config.headers.token = localStorage.getItem('token');
        }else{
			config.headers.token = "";
		}
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            if(error.response.status == 401){
				msg('warning', '警告', '登录无效');
				window.location.href="/";
				//window.history.pushState(null, null, '/');
			}
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
);

export default{
	post: function(url, data){
		return axios({
			// headers: {
		    //     'deviceCode': 'A95ZEF1-47B5-AC90BF3'
		    // },
			url: url,
			method: 'post',
			data: data
		}).then(function(res){
			return res;
		}).catch(function(err){
			return err;
		})
	},
	get: function(url, data){
		return axios({
			url: url,
			method: 'get',
			params: data
		}).then(function(res){
			return res;
		}).catch(function(err){
			return err;
		})
	}
}