<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	.over-show{
		width: 500upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	@mainColor:#337DFF;
	.chain,.benefit-chain{
		font-family: SimHei;
		.fix{
			display: flex;
			align-items: center;
		}
		padding: 40upx 30upx;
		font-size:24upx;
		&-list{
			&-li{
				margin-bottom:30upx;
				.title{
					height: 64upx;
					font-size:28upx;
					background:rgba(51, 125, 255, 0.05);
					.fix;
					padding:0 30upx;
					.label{
						color:#333;
						opacity: 0.85;
						flex: 1;
						margin-right:20upx;
					}
					.cont{
						flex: 6;
						.fix;
						justify-content: space-between;
						.con{
							width: 400upx;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
					}
				}
				.line-childs{
					box-sizing: border-box;
					.childs{
						&-li{
							min-height: 100upx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding: 30upx 8upx 20upx;
							border-bottom:1upx solid #eee;
						}
						&-title{
							font-size:28upx;
							margin-bottom:20upx;
						}
						&-content{
							color:#333;
							opacity: 0.85;
							.shareholdingRatio{
								color:@mainColor;
							}
						}
					}
					
				}
			}
			
		}
		&-footer{
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size:28upx;
		}
	}
	.no-data{
		text-align: center;
		width: 100%;
		height: 200upx;
		line-height: 200upx;
		color:#333;
		font-size: 36upx;
	}
	.no-recent{
		padding:202upx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.no-data-img{
			width: 470upx;
			height: 330upx;
		}
		.text-exp{
			color:rgba(51, 51, 51, 0.45);
		}
	}
	//搜索框公共样式
	.search{
		font-family: SimHei;
		&-contain{
			width: 670upx;
			margin:0 auto;
			position: relative;
			.search-icon{
				position: absolute;
				color:#0047FF;
				width: 40upx;
				height: 40upx;
				// background-repeat: no-repeat;
				// background-position: center center;
				// background-size:100%;
				left: 27upx;
				top:27upx;
			}
			.search-input{
				box-sizing:border-box;
				padding-left:80upx;
				height: 90upx;
				border-radius: 45upx;
				font-size: 28upx;
				background-color: rgba(255, 255, 255, 0.9);
				border: 2upx solid rgba(0, 90, 255, 1);
			}
		}
	}
	//列表公共样式
	.recent{
		font-size: 28upx;
		font-family: SimHei;
		&-list{
			&-li{
				position: relative;
				width: 100%;
				height: 145upx;
				border-radius: 10upx;
				background-color: rgba(255, 255, 255, 1);
				box-shadow: 0upx 0upx 8upx 0upx rgba(0, 0, 0, 0.08);
				// border: 1upx solid rgba(151, 151, 151, 0.2);
				margin-bottom: 20upx;
				padding:30upx;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-start;
				.li{
					&-icon{
						width: 82upx;
						height: 80upx;
						border-radius: 8upx;
						background-color: rgba(216, 216, 216, 0.28);
						margin-right:20upx;
					}
					&-content{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						line-height: 35upx;
						&-title{
							color: rgba(0, 0, 0, 0.65);
							font-size: 28upx;
							font-family: SimHei;
							.over-show;
						}
						&-other{
							opacity: 0.45;
							color: rgba(0, 0, 0, 1);
							font-size: 24upx;
							.over-show;
							.fnName{
								margin-right:50upx;
							}
						}
					}
					&-status{
						position: absolute;
						top:0;
						right:0;
						padding:0 5upx;
						min-width:80upx;
						height: 35upx;
						line-height: 35upx;
						background-color: rgba(231, 243, 255, 1);
						color:#1C86FA ;
						text-align: center;
						font-size: 24upx;
						&.cancel{
							background-color: rgba(255, 244, 242, 1);
							color:#EC6E5C ;
						}
					}
				}
			}
		}
	}
</style>
