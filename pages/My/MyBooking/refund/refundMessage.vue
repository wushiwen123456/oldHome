<template>
	<view>
		<view >
			<!-- 退款显示 -->
			<view>
				<view class="refundMesage-image text-white padding-left padding-top-xl">
					<view class="text-lg margin-bottom-xs">{{detailData._status ? detailData._status._title : ''}}</view>
					<view>{{detailData._pay_time}}</view>
				</view>
				<view class="bg-white padding-left padding-right margin-top-sm">
					<!-- <view class="flex align-center justify-between refundMesage-txt solid-bottom">
						<view class="text-wuer text-three">退款金额</view>
						<view v-if="detailData.refund_price" class="text-price text-red">{{detailData.refund_price}}</view>
					</view> -->
					<view class="flex align-center justify-between refundMesage-txt">
						<view class="text-wuer text-three">退回路径</view>
						<view class="text-jiujiujiu">{{detailData.pay_type == 'weixin' ? '微信' : '支付宝'}}</view>
					</view>
				</view>
				
			</view>
				
				
			
			<!-- 公共部分 -->
			<view>
				<view class="bg-white" v-for="(item,index) in detailData.cartInfo" @click="goDetail(item)">
					<view class="flex align-start margin-top-sm padding-top padding-bottom margin-left margin-right">
						<view class="mybooking-image">
							<image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
						</view>
						<view class="text-width margin-left-sm ">
							<view class="flex align-center justify-between">
								<view class="text-cut" style="width: 420upx;">{{item.productInfo.store_name}}</view>
								<view class="text-price text-red">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</view>
							</view>
							<view class="flex align-center justify-between margin-top">
								<view class="flex-five text-jiujiujiu text-sm">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.suk : '默认类型'}}</view>
								<view class="flex-sub text-center">x{{item.cart_num}}</view>
							</view>
							<!-- <view class="flex justify-end margin-top-sm">
								<view class="refund-messgae-button">{{detailData._status ? detailData._status._title : ''}}</view>
							</view> -->
						</view>
					</view>
				</view>
				
				<view class="bg-white margin-top-sm">
					<view class="padding-lg text-jiujiujiu">
						<view class="flex align-center text-line-height" >
							<view>退款原因：</view>
							<view>{{detailData.refund_reason_wap_explain || '拼团失败'}}</view>
						</view>
						<!-- <view class="flex align-center text-line-height" >
							<view>退款金额：</view>
							<view>￥128.9</view>
						</view> -->
						<view class="flex align-center text-line-height" >
							<view>申请时间：</view>
							<view>{{detailData._pay_time}}</view>
						</view>
						<view class="flex align-center text-line-height" >
							<view>退款编号：</view>
							<view>{{detailData.order_id}}</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			
			
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>	
	</view>
</template>

<script>
	// 导入替换字符串方法
	import {replaceImage} from '@/utils/dealUrl'
	export default {
		onLoad() {
			const id = this.$store.state.orderKey
			if(id){
				this.$store.dispatch('detailOrder').then(res =>{
								 if(res.data.code == 200){
									this.dealUrl(res)
								 }else{
									 // #ifdef APP-PLUS
									 plus.nativeUI.toast('网络出了点问题',{duration:'long'})
									 // #endif
								 }
				})
			}else{
				uni.switchTab({
					url:'../../../Home/home'
				})
			}
		},
		data(){
			return {
				orderId:'',
				detailData:{}
			}
		},
		methods:{
			// 处理数据
			dealUrl(res){
				const obj = res.data.data
				obj.cartInfo.forEach(y => {
					if(y.productInfo.attrInfo){
						y.productInfo.attrInfo.image = replaceImage(y.productInfo.attrInfo.image)
					}else{
						y.productInfo.image = replaceImage(y.productInfo.image)
					}
				})
				this.detailData = obj
			},
			goDetail(item){
				if(item.combination_id){
					this.$store.commit('setcombinId',item.combination_id)
					uni.navigateTo({
						url:"/pages/ShopDetails/groubBooking"
					})
				}else{
					const id = item.productInfo.id
					uni.navigateTo({
						url:`/pages/ShopDetails/shopDetails?id=${id}`
					})
				}
			}
		}
	}
</script>

<style>
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.text-hieed{
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.refund-messgae-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width:160upx;
		height:56upx;
		border:1px solid rgba(157,156,156,1);
		border-radius:28upx;
		color: #9D9C9C;
		font-size: 28upx;
	}
	.text-line-height{
		line-height: 60upx;
	}
	.refundMesage-image{
		background: url(../../../../static/fukuanga.png);
		background-size: 100% 100%;
		width: 100%;
		height: 200upx;
	}
	.refundMesage-txt{
		height: 96upx;
	}
</style>
