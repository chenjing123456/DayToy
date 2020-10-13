import NetWork from "./NetWork.js";
export const config = {
	//1.微信小程序
	// production
	// DOMAIN : "线上域名",
	//dev
	// DOMAIN : "http://10.1.2.102:8086",
	 
	// 2.h5
	DOMAIN : "",
	
	reqConfig:{
		exeQueue : true,
		promiseQueue : []
	},
	netWork :new NetWork()
}