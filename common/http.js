import { config }  from "./config.js"

import {login} from './utils.js';
class Http {
	constructor(options) {
		this.options = options;
		this.config = {
			url: config.DOMAIN,
			data: {},
			header: {},
			method: "",
			dataType: "json",
			responseType: "text",
		}
		this.init();
		return this.request();
	}
	setToken(){
		this.config.header = {"token": uni.getStorageSync('token')};
		this.config.data = {...this.config.data,'token':uni.getStorageSync('token')};
	}
	init() {
		this.config.header = {"token": uni.getStorageSync('token')};
		this.options.data = {...this.options.data,'token':uni.getStorageSync('token')};
		this.options.url = this.options.url.indexOf("http") > -1 ? this.options.url :(this.config.url + this.options.url);
		this.options.method = this.options.method ? this.options.method.toUpperCase() : 'GET';
		this.config = Object.assign({}, this.config, this.options);
	}
	request() {
		
		if(!config.netWork.hasNet()){
			uni.showToast({
				title:"请检查网络",
				icon:'loading'
			})
			return new Promise((resolve,reject)=>{
				setTimeout(function(){
					uni.hideToast();
					resolve()
				},3000)
				
			})
		}
		return uni.request(this.config).then(res=> {
			let data = res[1];
			if(data.statusCode == '401'){
				return login().then(res=>{
					this.setToken();
					return this.request();
				})
			}else if(data.statusCode == '200'){
				return data.data
			}
		})
	}
	
	
}


export const http = function(options){
	return new Http(options);
}
