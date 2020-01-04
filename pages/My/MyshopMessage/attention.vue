<template>
	<view>
	 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		<view v-if="hasData">
			<view class="text-sm text-jiujiujiu text-center margin-top-sm" v-show="guanzhu">共收藏{{getListData.length}}个店铺</view>
			<view class="text-sm text-jiujiujiu text-center margin-top-sm" v-show="!guanzhu">暂无收藏的商品</view>
			<view v-if="!Nodata" class="margin-top-sm bg-white enter-margin">
				<view v-for="(vo,key) in getListData" @tap="enterClick(vo,key)" :key="key" style="position: relative;" class="flex align-center justify-between enter-margin-all">
					<view class="flex align-center">
						<view class="enter-left-image">
							<image :src="vo.shop_logo"></image>
						</view>
						<view class="margin-left-sm">
							<view class="flex align-center margin-bottom-xs">
								<view class="text-wuer text-three text-bold">{{vo.shop_name}}</view>
								<view class="margin-left">
									<view class="enter-sanjiao-right">官方</view>
								</view>
							</view>
							<!-- <view class="text-sm text-color">粉丝{{vo.shop_fans}}</view> -->
						</view>
					</view>
					<view class="flex align-center">
						<view @tap.stop="onLongPress(key)" style="font-size: 40upx;" class="lg text-gray cuIcon-more margin-right"></view>
						<view class="flex align-center justify-center enter-booton">店铺</view>
					</view>
					<view v-show="vo.popu" @tap.stop="cancelC(vo,key)" class="recordList-all-popu">
						<view>取消收藏</view>
					</view>
				</view>
			</view>
			<view v-else class="bg-white" :style="{ height: windowHeight + 'px'}">
				<view class="nodata">
					<image src="../../../static/nodataa.png"></image>
				</view>
			</view>
			<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
			<Modal v-model="show1" title='提示' text='是否取消收藏' @confirm="cancelCollect" />
		</view>
		<view class="userNodes" v-else>
			您还没有收藏店铺哦
		</view>
	</view>
	
</template>

<script>
	// 导入请求方法
	import {getCollectStore} from '@/network/getProfileData.js'
	import { getStoreInfo,unCollectStore } from '@/network/detail'
	// 导入vuex
	import { mapGetters } from 'vuex'
	import {replaceImage} from '@/utils/dealUrl'
	
	// 导入弹出层
	import Modal from '@/components/x-modal/x-modal'
	export default{
		data(){
			return{
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//屏幕高度
				Nodata:false,//有无数据
				page:1,
				getListData:[],
				getList:[],
				current:-1,
				show1:false,
				hasData:false
			}
		},
		components:{
			Modal
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
			if(this.isToken){
				this.getCollectStore(this.page,this.isToken)
			}else{
				uni.switchTab({
					url:"../../Home/home"
				})
			}
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			getCollectStore(page,token){
				getCollectStore(page,token)
					.then(res => {
						this.$refs.loading.close()
						if(res.data.code == 200){
							if(res.data.data.length){
								this.hasData = true
							}
							this.getList = res.data.data
							
							const arr = res.data.data
							// 遍历取出arr的每一项数据
							for (let item of arr){
								getStoreInfo(item.shop_id,this.isToken)
								.then(res => {
									if(res.data.code == 200){
										const img = res.data.data.shop_info.shop_logo
										const obj = {
											expressage_score:res.data.data.shop_info.expressage_score,
											product_score:res.data.data.shop_info.product_score,
											service_score:res.data.data.shop_info.service_score,
											shop_id:res.data.data.shop_info.shop_id,
											shop_logo:replaceImage(img),
											shop_name:res.data.data.shop_info.shop_name,
											zong:res.data.data.shop_info.zong,
										}
										this.getListData.push(obj)
									}
								})
							}
							// this.getListData.forEach(x => {
							// 	console.log(x.shop_logo)
							// })
						}
					})
			},
			//点击删除
			onLongPress(key){
				var that = this
				that.getListData[key].popu = true
				that.winSize = true
				
			},
			// 取消收藏
			cancelC(vo,key){
				this.current = key
				this.show1 = true
				vo.popu = false
			},
					
			cancelCollect(){
				const list = this.getListData,
				 index = this.current,
				 shopId = list[index].shop_id
				unCollectStore(shopId,this.isToken)
					.then(res => {
						console.log(res)
						if(res.data.code == 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast("已取消")
							// #endif
							this.getListData.splice(index,1)
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast(res.data.msg || '未知错误')
							// #endif
						}
					})
			},
			//进店逛逛
			enterClick(vo){
				const id = vo.shop_id
				uni.navigateTo({
					url:`../../ShopDetails/StoreDetails/storedetails?id=${id}`
				})
			},
			//点击遮罩
			winSizeClick(){
				var that = this
				that.winSize = false
				that.getListData.forEach(function(item){
					item.popu = false
				})
			},
		},
		computed:{
			...mapGetters(['isToken']),
			guanzhu(){
				return this.getListData.length
			}
		}
	}
</script>

<style>
	.nodata{
		padding-top: 200upx;
	}
	.nodata image{
		width: 100%;
	}
	.enter-left-image{
		
	}
	.enter-left-image image{
		width:84upx;
		height:84upx;
		border-radius:22upx;
	}
	.enter-margin{
		padding-left: 24upx;
	}
	.enter-margin-all{
		height: 140upx;
		border-top: #E1E1E1 1px solid;
	}
	.enter-margin-all:nth-child(1){
		border: none;
	}
	.text-color{
		color: #838383;
	}
	.enter-booton{
		width:70upx;
		height:34upx;
		background:rgba(205,50,51,1);
		border-radius:18upx;
		font-size: 20upx;
		color: #FFFFFF;
		margin-right: 24upx;
	}
	.enter-sanjiao-right{
		padding: 2upx 6upx;
		border-radius: 8upx;
		background: #EAD09D;
		font-size: 24upx;
		color: #5C2E10;
	}
	.recordList-all-popu{
		position: absolute;
		z-index: 999;
		right: 60upx;
		top: 100upx;
		width:180upx;
		height:80upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 0upx 30upx 6upx rgba(0, 0, 0, 0.09);
		border-radius:10upx;
		color: 32upx;
		line-height: 80upx;
		text-align: center;
	}
	.winSize-zehzaho{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		background: rgba(255,255,255,0);
	}
</style>
