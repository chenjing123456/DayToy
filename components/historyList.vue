<template>
	<view class="history">
		<view class="no-data" v-if="historyList.length<=0">{{hisNoData}}</view>
		<list-item :defaultList="historyList"></list-item>
	</view>
</template>

<script>
	import listItem from '../components/ListItem.vue';
	import history from '../common/history/historyList.js';
	import {CONSTANT} from '../common/constant.js'
	export default {
		props: {
			length: {
				type: Number,
				isRequired: true
			}
		},
		data() {
			return {
				historyList:[],
				hisNoData:CONSTANT.hisNoData
			}
		},
		created(){
			this.historyList = history.getHistory(this.length);
		},
		
		components:{
			'list-item': listItem
		}
	}
</script>

<style lang="less" scoped>
	.history{
		padding:30upx;
	}
</style>


