<template>
	<view :style="{ 'min-height': windowHeight + 'px'}" class="bg-white">
		<image class="booking-title-image" :src="bookingBanner"></image>
		<view >
			<view v-for="(vo,key) in bookingList" :key="key" class="flex align-center booking-mian-all">
				<view>
					<image class="booking-shop-image " :src="vo.image"></image>
				</view>
				<view class="flex flex-direction justify-around margin-left booking-shop-right solid-bottom">
					<view>{{vo.info}}</view>
					<view class="flex align-center justify-between">
						<view>
							<view class="flex align-center text-sm-erliu margin-bottom-sm">
								<image class="booking-shop-booking-img" src="../../../static/bottomh.png"></image>
								<view class="text-red-my margin-left-xs margin-right-sm">{{vo.people}}人团</view>
								<view class="text-jiujiujiu">已拼1890件</view>
							</view>
							<view class="flex align-center">
								<view class="text-price text-red text-three text-bold">{{vo.price}}</view>
								<view class="text-del text-jiujiujiu margin-left">{{vo.product_price}}</view>
							</view>
						</view>
						<view @tap="bookingDetallClick" class="booking-button">去拼团</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCombinationListData} from '@/network/Home'
	export default{
		data(){
			return{
				bookingList:[],
				windowHeight:652,//屏幕高度
				bookingBanner:'',
				shopList:{
					pages:1,
					limit:[]
				}
			}
		},
		onShow() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
			// 获取拼团数据
			this.getCombinationListData(this.shopList.pages)
		},
		methods:{
			//去拼团
			bookingDetallClick(){
				uni.navigateTo({
					url:'../../ShopDetails/groubBooking'
				})
			},
			// 获取拼团数据
			getCombinationListData(pages){
				getCombinationListData(pages).then(res => {
					console.log(res)
				})
			}
		},
		
	}
</script>

<style>
	.booking-title-image{
		height: 256upx;
		width: 100%;
	}
	.booking-shop-image{
		width: 186upx;
		height: 186upx;
	}
	.booking-shop-booking-img{
		width: 30upx;
		height: 30upx;
	}
	.booking-mian-all{
		padding: 26upx 24upx 14upx 24upx;
	}
	.booking-shop-right{
		width: 100%;
		min-height: 186upx;
	}
	.booking-button{
		width:140upx;
		height:54upx;
		line-height: 54upx;
		text-align: center;
		background:rgba(205,50,51,1);
		border-radius:26upx;
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
