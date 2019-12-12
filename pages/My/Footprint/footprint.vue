<template>
	<view>
		<view v-for="(vo,key) in recordList" :key="key" class="flex align-center bg-white margin-top-xs recordList-all">
			<image @tap="footprintClick(vo.product_id,vo.product_type)" class="recordList-image" :src="vo.info.image"></image>
			<view @tap="footprintClick(vo.product_id,vo.product_type)" class="margin-left-sm recordList-main-all">
				<view v-if="vo.product_type == 'product' " class="text-wuer text-lg text-bold">{{vo.info.store_name}}</view>
				<view v-else class="text-wuer text-lg text-bold">{{vo.info.title}}</view>
				<view v-if="vo.product_type == 'product' " class="recordList-main">{{vo.info.store_name}}</view>
				<view v-else class="recordList-main">{{vo.info.info}}</view>
				<view class="flex align-center justify-between">
					<view class="text-sm text-jiujiujiu">{{vo.add_time}}</view>
					<view @tap="onLongPress(key)" style="font-size: 40upx;" class="lg cuIcon-more"></view>
				</view>
			</view>
			<view v-show="vo.popu" @tap="delListClick(vo.id,key)" class="recordList-all-popu">
				<view>删除记录</view>
			</view>
		</view>
		<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
		<uni-load-more :loadingType="loadingType" ></uni-load-more>
	</view>
	</view>
</template>

<script>
	import {user_visit,remove_visit} from '@/network/sign.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//高度
				recordList:[],
				loadingType:1,
				page:1,
				limit:10,
			}
		},
		onLoad() {
			this.getWindowSize();
			let data ={
				page:this.page,
				limit:this.limit,
			}
			user_visit(data).then(res =>{
				if(res.length < this.limit){
					this.loadingType = 2
				}else{
					this.loadingType = 1
				}
				this.recordList = res
			})
		},
		onReachBottom(){
			if(this.loadingType == 2) return
			this.page += 1
			let data ={
				page:this.page,
				limit:this.limit,
			}
			user_visit(data).then(res =>{
				if(res.length < this.limit){
					this.loadingType = 2
				}else{
					this.loadingType = 1
				}
				this.recordList = this.recordList.concat(res)
			})
		},
		methods: {
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
			delListClick(id,key){
				var that = this
				that.winSizeClick()
				remove_visit({ids:id}).then(res =>{
					that.recordList.splice(key,1)
				})
			},
			//查看详情
			footprintClick(id,type){
				if(type == 'product'){
					uni.navigateTo({
						url:'../../ShopDetails/shopDetails?id=' + id
					})
				}else{
					uni.showModal({
						title:'提示',
						content:'该商品为活动产品，请从活动入口进入',
						success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../../Home/home'
								})
							}
						}
					})
				}
			},
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
		color: #868686;
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
	}
	.winSize-zehzaho{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 99;
		background: rgba(255,255,255,0);
	}
</style>