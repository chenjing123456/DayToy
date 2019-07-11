import NetWork from "./NetWork.js";
export const config = {
	// production
	DOMAIN : "https://syr.yscredit.com",
	
	// dev
	// DOMAIN : "http://10.1.1.142:8080",
	reqConfig:{
		exeQueue : true,
		promiseQueue : []
	},
	netWork :new NetWork()
}