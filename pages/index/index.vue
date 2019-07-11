<template>
	<view>
		<!-- <uni-popup :show="isShow" type="middle" mode="fixed">
			<view class="auth-modal">
				<image class="modal-img" src="../../static/copy@2x.png"></image>
				<view class="modal-text">
					<text>{{contant[5]}}</text>
				</view>
				<button class='modal-foot bottom' plain='false' type='default' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="getUserInfo">
					{{contant[6]}}
				</button>
			</view>
		</uni-popup> -->
		<view class="content">
			<!-- <view class="search-content" :style="{backgroundImage:`url(${bgImg})`}"> -->
			<view class="search-content">
				<text class="search-text">{{contant[0]}}</text>
				<view class="search-contain" @click="goToSearch('../search/search')">
					<image class="search-icon" src="../../static/system-serchb@2x.png"></image>
					<input class="search-input" type="text" placeholder="请输入企业名称，统一社会信用代码" cursor-spacing="10" disabled>
				</view>
				<view class="tabs">
					<view class="tabs-item" @click="goToSearch('../history/history')">
						<image class="img" src="/static/his.png"></image>
						<text class="title">{{contant[1]}}</text>
					</view>
					<view class="tabs-item" @click="goToSearch('../attention/attention')">
						<image class="img" src="/static/attens.png"></image>
						<text class="title">{{contant[2]}}</text>
					</view>
					<view class="tabs-item" @click="goToSearch('../standard/standard')">
						<image class="img" src="/static/ada.png"></image>
						<text class="title">{{contant[3]}}</text>
					</view>
				</view>
			</view>
			<view class="recent-search" v-if="historys.length>0">
				<view class="recent-title">{{contant[4]}}</view>
				<history-list :length="3" v-if="refreshHistory"/>
			</view>
			<view class="no-recent" v-else>
				<image src="../../static/no-data.png" class="no-data-img"></image>
				<text class="text-exp">{{recentNoData}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniPopup} from '@dcloudio/uni-ui';
	import historyList from '../../components/historyList.vue';
	import {login} from '../../common/utils.js';
	import {CONSTANT} from '../../common/constant.js';
	export default {
		data() {
			return {
				SessionKey: '',
                OpenId: '',
				historys:[],
				bgImg:'',
				refreshHistory: true,
                nickName: null,
                avatarUrl: null,
				isShow:false,
				contant:CONSTANT.indexPage,
				recentNoData:CONSTANT.recentNoData,
				list:[]
			}
		},
		components: {uniPopup,historyList},
		onLoad() {
			// this.bgImg = CONSTANT.bgImgBase64;
		},
		onReady() {
			// this.isAuth();
		},
		onShow(){
			this.historys = uni.getStorageSync('historyList')?JSON.parse(uni.getStorageSync('historyList')) :[];
			this.refreshHistory = false;
			setTimeout(() => {
				this.refreshHistory = true;
			}, 0)
		},
		methods: {
			// isAuth(){
			// 	let that = this;
			// 	uni.getSetting({
			// 	   success(res) {
			// 		  if(res.authSetting['scope.userInfo']){
			// 			  that.isShow = false;
			// 		  }else{
			// 			  that.isShow = true;
			// 		  }
			// 	   }
			// 	})
			// },
			// getUserInfo(userInfo) {
			// 	let d = userInfo.detail;
			// 	if(d.errMsg == "getUserInfo:ok"){//允许
			// 		let _this = this;
			// 		_this.isShow = false;
			// 		login();
			// 	}else{//拒绝
			// 		this.isShow = true;
			// 	}
   //              
   //          },
			goToSearch(name){
				uni.navigateTo({
					url: `${name}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.over-show{
		width: 500upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.auth-modal{
		font-family: SimHei;
		width:570upx;
		height: 500upx;
		.modal{
			.comm{
				left:50%;
				margin-left:-250upx;
			}
			position: relative;
			&-img{
				width: 500upx;
				height: 500upx;
				position: absolute;
				top:-32upx;
				.comm;
			}
			&-text{
				display: inline-block;
				width: 500upx;
				font-size: 28upx;
				position: absolute;
				bottom: 160upx;
				.comm;
			}
			&-foot{
				width: 500upx;
				height: 80upx;
				line-height: 80upx;
				border:none;
				position: absolute;
				bottom: 40upx;
				color: #29A724;
				font-size: 32upx;
				.comm;
			}
		}
	}
	.content {
		// height: 100%;
		font-size: 28upx;
		font-family: SimHei;
		.search{
			&-content{
				height: 470upx;
				width: 100%;
				background-image: url('~@/static/bgmin@2x.png');
				// background-color: #005CFF;
				background-repeat: no-repeat;
				background-position: center center;
				background-size:cover;
				position: relative;
			}
			&-text{
				width:100%;
				height:160upx;
				color: rgba(255, 255, 255, 1);
				font-size: 50upx;
				font-family: SimHei;
				line-height: 80upx;
				display: flex;
				justify-content: center;
				align-items:center;
			}
		}
		.tabs{
			font-family: SimHei;
			display: flex;
			position: absolute;
			bottom:-101upx;
			justify-content: space-around;
			width:100%;
			&-item{
				width: 203upx;
				height: 203upx;
				border-radius: 10upx;
				background-color: rgba(255, 255, 255, 1);
				box-shadow: 0upx 0upx 8upx 0upx rgba(0, 0, 0, 0.08);
				// border: 1upx solid rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.title{
					color: rgba(0, 0, 0, 0.45);
				}
				.img{
					width: 78upx;
					height: 78upx;
					margin-bottom:20upx;
				}
			}
		}
		.recent{
			&-search{
				padding:102upx 0 0;
			}
			&-title{
				width: 100%;
				color: rgba(0, 0, 0, 0.65);
				text-align: center;
				margin:30upx 0 0;
			}
		}
		
	}
</style>
