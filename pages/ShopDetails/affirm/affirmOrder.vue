<template>
	<view>
		<!-- 没有添加收货地址 -->
		<view v-if="Noaddress" @tap="addAddressClick()" class="affirmOrder-title dis-flex flex-item-cent flex-jus-space">
			<view class="dis-flex flex-item-cent">
				<image class="title-img-ones" src="../../../static/editaddress.png" ></image>
				<view>新增收货地址</view>
			</view>
			<view class="lg text-gray cuIcon-right" ></view>
		</view>
		
		<!-- 存在收货地址 -->
		<view v-if="!Noaddress" @tap="shippingAddressClick" class="affirmOrder-titles dis-flex flex-item-cent flex-jus-space">
			<view class="dis-flex flex-item-cent">
				<image class="title-img-one" src="../../../static/address.png"></image>
				<view class="affirmOrder-title-dizhi">
					<view class="affirmOrder-title-nickname">王开心 15729284038</view>
					<view>河南省郑州市二七区  一马路陇海路欢乐湖童装4楼2街</view>
				</view>
			</view>
			<image class="title-img-two"  ></image>
		</view>
		
		<!-- 购买商品种类 循环开始 -->
		<view  class=" affirmOrder-main" >
			<view class="flex align-center margin-bottom">
				<view style="font-size: 40upx;" class="lg cuIcon-shop margin-right-xs"></view>
				<view>沃隆旗舰店</view>
			</view>
			<view class="dis-flex">
				<image src="../../../static/demo2.png"></image>
				<view class="affirmOrder-main-right">
					<view class="dis-flex flex-jus-space">
						<view class="text-wuer text-sm" >沃隆每日坚果750g混合装30包干果零食大礼包混合坚果小包装</view>
						<view>￥98</view>
					</view>
					<view class="affirmOrder-main-right-bottom dis-flex flex-jus-space">
						<view>味口:成人版A750g/盒</view>
						<view>×1</view>
					</view>
				</view>
			</view>
		</view>
		
		<view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>运费</view>
				<view style="color: #959494;">包邮</view>
			</view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>买家留言</view>
				<input class="text-df" maxlength="-1" v-model="mark" placeholder="选填，请先和客服协商一致" />
			</view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>优惠券</view>
				<view class="dis-flex flex-item-cent">
					<view @tap="uniPopupClick" class="affirmOrder-message-youhui">没有可用的优惠券</view>
					<view class="lg cuIcon-right margin-left-sm"></view>
				</view>
			</view>
		</view>
		
		<view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>可用红包抵用0.1元</view>
				<!-- #ifdef MP-ALIPAY -->
				<switch class='red' @change="IsCard" :class="isCard?'checked':''" :checked="isCard?true:false" color="#CD3233"></switch>
				<!-- #endif -->
				
				<!-- #ifndef MP-ALIPAY -->
				<switch class='red' @change="IsCard" :class="isCard?'checked':''" :checked="isCard?true:false"></switch>
				<!-- #endif -->
				
			</view>
			<view class="dis-flex flex-item-cent flex-jus-space affirmOrder-message">
				<view>朋友代付</view>
				<view class="lg cuIcon-right margin-left-sm"></view>
			</view>
		</view>
		
		<!-- 底部合计 -->
		<view class="affirmOrder-bottom">
			<view class="flex align-center">
				<view >合计:</view>
				<view class="text-price text-red text-xxl">80</view>
			</view>
			<button @tap="submitOrderClick" >提交订单</button>
		</view>
		
		
		<!-- 优惠券选择 -->
		<uni-popup ref="shareShow" type="bottom">
			<view class="margin-left-xl margin-right-xl">
				<view class="text-center text-three margin-top" style="margin-bottom: 80upx;">店铺优惠</view>
				<view class="flex align-center justify-between shareShow-all">
					<view class="text-three">不使用优惠券</view>
					<view style="font-size: 40upx;"  :class="[discountsType?'lg cuIcon-roundcheckfill text-red':'lg cuIcon-round']"></view>
				</view>
				<button @tap="shareShowclose" class="shareShow-button">完成</button>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	export default{
		components:{
			uniPopup
		},
		data(){
			return{
				shareShow:false,
				Noaddress:false,//是否存在默认地址
				mark:'',//买家留言
				isCard:true,//true用红包  false 不用红包
				discountsType:true,//优惠券选择
			}
		},
		onReady() {
			
		},
		onLoad(e) {
			
		},
		onShow() {
			
		},
		methods:{
			//列表详情
			orderMessage(){
				
			},
			//获取当前金额可用优惠券
			getCouponOrder(){
				
			},
			//获取用户默认地址
			userddress(){
				
			},
			//优惠券选择
			getDiscountClick(key){
				
			},
			uniPopupClick(){
				this.$refs.shareShow.open()
			},
			
			shareShowclose(){
				this.$refs.shareShow.close()
			},
			
			
			//收货地址
			shippingAddressClick(){
				uni.navigateTo({
					url:'../../My/address/AllAddress'
				})
			},
			//添加收货地址
			addAddressClick(){
				uni.navigateTo({
					url:'../../My/address/addAddress'
				})
			},
			//提交订单
			submitOrderClick(){
				uni.reLaunch({
					url:'../../PayOrder/payOrderMessage/payorderMessage'
				})
			},
			//是用红包
			IsCard(e) {
				this.isCard = e.detail.value
			},
		}
	}
</script>

<style>
	.dis-flex{
		display: flex;
	}
	.flex-jus-space{
		justify-content: space-between;
	}
	.flex-item-cent{
		align-items: center;
	}
	.affirmOrder-title{
		margin: 10upx 0;
		padding: 0 24upx;
		background: #FFFFFF;
		font-size: 30upx;
		color: #333333;
		height: 136upx;
	}
	.affirmOrder-titles{
		margin: 20upx 0;
		padding: 20upx 24upx;
		background: #FFFFFF;
		font-size: 30upx;
		color: #333333;
	}
	.title-img-one{
		margin-right: 18upx;
		width: 70upx;
		height: 70upx;
	}
	.title-img-ones{
		margin-right: 18upx;
		width: 68upx;
		height: 68upx;
	}
	.title-img-two{
		margin-left: 20upx;
		width: 14upx;
		height: 26upx;
	}
	.affirmOrder-main{
		background: #FFFFFF;
		padding: 30upx 24upx;
		
	}
	.affirmOrder-main image{
		width: 140upx;
		height: 140upx;
	}
	.affirmOrder-main-right{
		padding-bottom: 30upx;
		margin-left: 40upx;
		width: 520upx;
		font-size: 30upx;
	}
	.affirmOrder-main-right-bottom{
		margin-top: 20upx;
		color: #959494;
		font-size: 24upx;
	}
	.affirmOrder-message{
		padding: 0 24upx;
		background: #FFFFFF;
		height: 100upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.affirmOrder-message:nth-child(1){
		margin-top: 10upx;
	}
	.affirmOrder-message input{
		width: 440upx;
		text-align: right;
	}
	.affirmOrder-message-youhui{
		color: #CD3233;
		font-size: 26upx;
	}
	.affirmOrder-bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		height: 104upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.affirmOrder-bottom button{
		width: 236upx;
		height: 80upx;
		margin: 0;
		margin-right: 24upx;
		font-size: 32upx;
		background:rgba(205,50,51,1);
		border-radius: 40upx;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.affirmOrder-title-dizhi{
		color: #666666;
		font-size: 26upx;
		max-width: 500upx;
		display: flex;
		flex-direction: column;
	}
	.affirmOrder-title-nickname{
		font-size: 30upx;
		color: #000000;
		margin-bottom:8upx;
	}
	.shareShow-all{
		height: 80upx;
	}
	.shareShow-button{
		background: #CD3233;
		color: #FFFFFF;
		margin-top: 80upx;
		border-radius: 50upx;
		margin-bottom: 20upx;
	}
</style>
