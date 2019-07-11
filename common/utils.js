import {http} from './http.js';
import {CONSTANT} from './constant.js';
import { config } from '../common/config'
/**
 * @description 将本地的数据存入storage中，作为历史记录
 * @param {key}  = [storage中的key]
 * @param {filterKey}  = [过滤的时候的key] 
 * @param {max}  = [存入的最大长度] 
 */
export class HistoryManager{	
	key = "key"
	filterKey = "filterKey";
	max = 0;
	
	constructor(key, filterKey, max) {
	    this.max = max;
		this.filterKey = filterKey;
		this.key = key;
	}
	
	
	setHistory(data){
		// 获取Arr
		let str,
			arr = this.getHistory(this.max),
			keyMap = {};
		
		arr.unshift(data);
		// 去重，并小于最大值
		// 获取hashMap
		arr.forEach(item => {keyMap[item[this.filterKey]] = true});
		
		// 遍历取出
		let filterArr = arr.filter(item => {
			let key = item[this.filterKey];
			if(keyMap[key]){
				delete keyMap[key];
				return true;
			}

			return false;
		})
		if(filterArr.length >= this.max){
			filterArr.pop();
		}	
		
		try{
			// 转化JSON
			str = JSON.stringify(filterArr);
			uni.setStorage({
				key: this.key,
				data: str,
				fail(){
					uni.showToast({
						title: '存储历史记录失败',
						duration: 2000
					});
				}
			})
		}catch(e){
			// JSON转化失败
			uni.showToast({
				title: '存储历史记录失败',
				duration: 2000
			});
		}
		
	}
	
	getHistory(num){
		let arr;
		try{
			let str = uni.getStorageSync(this.key);
			arr = JSON.parse(str) || [];
		}catch(e){
			//TODO handle the exception
			arr = []
		}
		
		return arr.slice(0, num);		
	}
	
}
		//验证邮箱
export const checkEmail=(email)=>{
		return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(email);
	}
	
export const login=()=>{
	// 1.获取登录用户code
	return new Promise(function(resolve, reject){
		uni.login({
		    provider: 'weixin',
		    success: function(loginRes) {
		        let code = loginRes.code;
					//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
					if(code){
						uni.request({
							url:`${config.DOMAIN}/weixin/getTokenByWx`,
							data:{
								code:code
							},
							success(res) {
								let data = res.data;
								if(data.code == '00'){
									uni.setStorageSync('token', data.data.token);
									uni.setStorageSync('code', code);
								}
								resolve();
							},
							fail(res) {
								reject();
								uni.showToast({
									title: res.data.codeMsg,
									duration: 2000
								});
							}
						})
					}
		    },
				fail(loginRes) {
					reject();
				}
		});
	})
	 
}

//开业状态
export const getStatus = (sta)=>{
	if(sta == CONSTANT.open) return true;
	return false;
}

//循环
export const getLinks=(list)=>{
	// isLastCircle 上一个节点是否是循环 ==> 循环是连续的
	// flag 标记不同的group，不同的flag属于不同的循环组， flag相同在一个循环内
	let len = list.length,resObj={}, isLastCircle = false, flag = Math.random();
	for(let i =0;i<len;i++){
		let id = list[i].endNodeName +list[i].shareholdingRatio;
		// debugger;
		
		if(isLastCircle !== true && resObj.hasOwnProperty(id)){
			// 上一个节点不是循环内， 并且obj有key就是一个新的循环
			flag = Math.random();
			resObj[id] = {
				idx: i,
				count: resObj[id].count + 1,
				flag
			}
			isLastCircle = true;
		}else if(isLastCircle === true && !resObj.hasOwnProperty(id)){
			// 上一个节点是循环内，且无obj【key】，生成一个新的循环组，
			flag = Math.random();
			resObj[id] = {
				idx: i,
				count: 0,
				flag
			}
			isLastCircle = false;
		}else if(isLastCircle === true && resObj.hasOwnProperty(id)){
			// 上一个节点是循环内，且有obj【key】，取上衣循环组的flag，且count+1，
			resObj[id] = {
				idx: i,
				count: resObj[id].count + 1,
				flag
			}
		}else if(!resObj.hasOwnProperty(id)){
			// 无obj【key】，取上衣循环组的flag，且count+1，取新的flag
			flag = Math.random();
			resObj[id] = {
				idx: i,
				count: 0,
				flag
			}
			isLastCircle = false;
		}
	}
	//排序
	let arr = Object.values(resObj).sort((a,b)=>{
		return a.idx - b.idx
	})
	//idx表示在原数组的下标 排序好的数组若是循环必然是连续的
	let resultArr = [];
	for(let i =0;i<arr.length;i++){
		let val = arr[i];
		if(val.count>0){
			if(i!=arr.length-1&&val.flag==arr[i+1].flag){//如果当前数据的flag与下一个flag一致
				resultArr.push(list[val.idx])
			}else{//循环断了连续 必然是当前此条循环已经结束，记录次数
				resultArr.push({...list[val.idx],count:val.count})
			}
		}else{
			resultArr.push(list[val.idx])
		}
	}
	return resultArr;
}

export const resultData =(name,status,entName)=>{
	if(status!=CONSTANT.open) {
		uni.showModal({
			title: CONSTANT.tip,
			showCancel:false,
			confirmColor:'#337DFF',
			content: CONSTANT.noBenefitInfo,
		});
	}else{
		uni.showLoading({
			title:  CONSTANT.loading
		});
		http({
			url:'/getBeneficialOwners',
			data:{
				key:entName
			},
			
		}).then((res)=>{
			uni.hideLoading();
			if(res.code == '00'){
				let data = res.data;
				uni.setStorageSync('beneficialOwner', JSON.stringify(data));
				uni.navigateTo({
					url: `${name}`
				});
			}else if(res.code=='01'){
				if(res.codeMsg==CONSTANT.isOver){
					uni.showModal({
						title: CONSTANT.tip,
						showCancel:false,
						content:res.codeMsg
					})
				}else{
					uni.showToast({
						title: res.codeMsg,
						duration: 2000
					});
				}
			}
		})
	}
}