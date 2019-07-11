<template>
	<view class="recent-list" v-if="defaultList.length>0">
		<view class="recent-list-li" v-for="(item,index) in defaultList" :key="index" @click="goToSearch(`../result/result?entName=${item.entName}&eid=${item.eid}`,item.entStatus,item.entName)">
			<image class="li-icon" src="../static/com2@2x.png"></image>
			<view class="li-content">
				<view class="li-content-title">{{item.entName?item.entName:''}}</view>
				<view class="li-content-other">
					<text class="fnName">{{CONSTANT.frName}}: {{item.frName?item.frName:'-'}}</text>
					<text>{{CONSTANT.regCap}}: {{item.regCap?item.regCap:'-'}}{{CONSTANT.unit}}</text>
				</view>
			</view>
			<text class="li-status" v-if="getStatus(item.entStatus)">{{item.entStatus}}</text>
			<text class="li-status cancel" v-if="!getStatus(item.entStatus)">{{item.entStatus}}</text>
		</view>
	</view>	
</template>

<script>
	import {resultData,getStatus} from '../common/utils.js';
	import {CONSTANT} from '../common/constant.js'
	export default{
		props: {
			defaultList: {
				type:Array,
				isRequired:true
			}
		},
		data(){
			return {
				getStatus:getStatus,
				CONSTANT:CONSTANT
			}
		},
        methods: {
			goToSearch(name,status,entName){
				resultData(name,status,entName)
			}
		},
	}
</script>
