<template>
	<view>
		<view v-for="(vo,key) in recordList" :key="key" class="flex align-center bg-white margin-top-xs recordList-all">
			<image class="recordList-image" :src="vo.cart_info.productInfo.image"></image>
			<view class="margin-left-sm recordList-main-all">
				<view class="text-wuer text-lg text-bold">兑换成功</view>
				<view class="recordList-main">您用<text class="text-red-my">{{vo.cart_info.truePrice}}积分</text>兑换{{vo.cart_info.productInfo.store_name}}一个</view>
				<view class="flex align-center justify-between">
					<view class="text-sm text-jiujiujiu">兑换时间：{{vo.pay_time}}</view>
					<view @tap="onLongPress(key)" style="font-size: 40upx;" class="lg cuIcon-more"></view>
				</view>
			</view>
			<view v-show="vo.popu" @tap="delListClick(vo.id,key)" class="recordList-all-popu">
				<view>删除记录</view>
			</view>
		</view>
		<view v-show="winSize" @tap="winSizeClick" class="winSize-zehzaho" :style="{ height: windowHeight + 'px'}"></view>
		
	</view>
	</view>
</template>

<script>
	import {user_integral,user_integral_remove} from '@/network/sign.js'
	export default {
		data() {
			return {
				winSize:false,///* 显示遮罩 */
				windowHeight:0,//高度
				recordList:[],
				token:''
			}
		},
		onLoad() {
			this.token = this.$store.getters.isToken
			this.getWindowSize();
			user_integral(this.token).then(res =>{
				this.recordList = res
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
				user_integral_remove(this.token,{id:id}).then(res =>{
					that.recordList.splice(key,1)
				})
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