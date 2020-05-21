<template>
	<view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		<view v-if="hasData">
			<view v-for="(vo,key) in recordList" @tap="goDetail(vo,key)" :key="key" class="flex align-center bg-white margin-top-xs recordList-all">
				<image class="recordList-image" :src="vo.image"></image>
				<view class="margin-left-sm recordList-main-all flex flex-direction justify-between">
					<view class="recordList-main">{{vo.store_name}}</view>
					<view class="bg-red recordList-main-centent">买过的店</view>
					<view class="flex align-center justify-between">
						<view class="text-sm-erliu flex align-center text-jiujiujiu">
							<view class="text-price text-xxl text-red text-bold">{{vo.price}}</view>
							<view class="margin-left-sm">销量{{vo.sales}}</view>
						</view>
						<view @tap.stop="onLongPress(key)" style="font-size: 40upx;" class="lg cuIcon-more"></view>
					</view>
				</view>
				<view v-show="vo.popu" @tap.stop="delListClick" class="recordList-all-popu">
					<view @tap.stop="unCollect(vo,key)">取消收藏</view>
				</view>
			</view>
			<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
		</view>
		<view class="userNodes" v-else>
			您还没有收藏商品哦
		</view>
	</view>
</template>

<script>
	import {profileCollect} from '@/network/getProfileData.js'
	import {unCollectProduct2} from '@/network/detail'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//高度
				recordList:[],
				pages:1,
				hasData:false
			}
		},
		onLoad() {
			this.getWindowSize();
			this.profileCollect(this.pages,this.isToken)
		},
		methods: {
			// 取消收藏
			unCollect(vo,index){
				
				// 取消收藏
				unCollectProduct2(vo.pid,this.isToken)
				.then(res => {
					if(res.data.code == 200){
						
					}
				})
				this.recordList.splice(index,1)
			},
			// 获取数据源
			profileCollect(page,token){
				profileCollect(page,token)
					.then(res => {
						if(res.data.code == 200){
							if(res.data.data.length){
								this.hasData = true
							}
							this.recordList = res.data.data
							
						}
					})
			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.windowHeight = res.windowHeight
					}
				})
			},
			//点击删除
			onLongPress(key){
				var that = this
				that.recordList[key].popu = true
				that.winSize = true
				
			},
			
			//点击遮罩
			winSizeClick(){
				var that = this
				that.winSize = false
				that.recordList.forEach(function(item){
					item.popu = false
				})
			},
			
			//删除记录
			delListClick(){
				this.winSizeClick()
			},
			goDetail(vo,item){
				uni.navigateTo({
					url:`/pages/ShopDetails/shopDetails?id=${vo.pid}`
				})
			}
			
		},
		computed:{
			...mapGetters(['isToken']),
		}
	}
</script>

<style>
	.recordList-all{
		padding: 24upx;
		position: relative;
	}
	.recordList-all-popu{
		position: absolute;
		z-index: 999;
		right: 30upx;
		width:180upx;
		height:80upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 0upx 30upx 6upx rgba(0, 0, 0, 0.09);
		border-radius:10upx;
		color: 32upx;
		line-height: 80upx;
		text-align: center;
	}
	.recordList-image{
		width:228upx;
		height:228upx;
	}
	.recordList-main{
		color: #525253;
		font-size: 28upx;
		margin-top: 20upx;
		margin-bottom: 10upx;
		overflow:hidden;
		text-overflow:ellipsis; 
		display:-webkit-box; 
		-webkit-box-orient:vertical; 
		-webkit-line-clamp:2; 
	}
	.recordList-main-all{
		width: 60%;
		height: 228upx;
	}
	.winSize-zehzaho{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		background: rgba(255,255,255,0);
	}
	.recordList-main-centent{
		width:120upx;
		height:44upx;
		border-radius:10upx;
		text-align: center;
		line-height: 44upx;
		font-size: 24upx;
		
	}
</style>