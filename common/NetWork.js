export default class NetWork{
	constructor() {
	    this.netWorkStatus = 0 ;//0 无网络，1，网络正常
		this.init();
	}
	init = ()=>{
		let that = this;
		uni.getNetworkType({
			complete(res){
				that.netWorkStatus = res.networkType === "none" ? 0 : 1;
			}
		})
		that._event();
	}
	_event(){
		let that = this;
		uni.onNetworkStatusChange((res) => {
			that.netWorkStatus = res.networkType === "none" ? 0 : 1;
		})
	}
	getStatus = ()=>{
		return this.netWorkStatus;
	}
	hasNet = ()=>{
		return this.netWorkStatus === 1;
	}
}