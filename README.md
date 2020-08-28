# common文件目录
## request构造函数
   http.js文件内部是请求request的构造函数
   通过Vue.prototype.$ysHttp = http;绑定到Vue，可以通过this.$ysHttp请求接口
   ```
   this.$ysHttp({
   	url:'/isFavorite',
   	data:{
   		eid:this.eid
   	}
   }).then((res)=>{
   	if(res.code == '00'){
   		console.log(res.data)
   	}
   }).catch(()=>{
   	
   })
   ```
   
## netWork构造函数
   NetWork.js文件是了解当前网络状态的构造函数
   