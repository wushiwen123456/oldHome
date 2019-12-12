<template>
	<view :style="{ 'min-height': windowHeight + 'px'}" class="bg-white" v-if="bookingList.length">
		<image class="booking-title-image" :src="banner"></image>
		<view >
			<view v-for="(vo,key) in bookingList" @click="bookingDetallClick(vo,key)" :key="key" class="flex align-center booking-mian-all">
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
								<view class="text-jiujiujiu">已拼{{vo.sales}}件</view>
							</view>
							<view class="flex align-center">
								<view class="text-price text-red text-three text-bold">{{vo.price}}</view>
								<view class="text-del text-jiujiujiu margin-left">{{vo.product_price}}</view>
							</view>
						</view>
						<view @click.stop="bookingDetallClick(vo,key)" class="booking-button">去拼团</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="loadImg" :contentText="contentText" :loadingType="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import {getCombinationListData} from '@/network/Home'
	import {replaceImage} from '@/utils/dealUrl'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		components:{
			uniLoadMore
		},
		data(){
			return{
				bookingList:[],
				windowHeight:652,//屏幕高度
				bookingBanner:'',
				shopList:{
					limit:[]	
				},
				pages:1,
				banner:'',
				loadImg:false,
				loadingType:1,
				isMaxLoad:false,
				contentText:{
					contentdown: "上拉加载更多",
					contentrefresh: "努力加载中...",
					contentnomore: "———— 我也是有底线的 ————"
				}
			}
		},
		onReachBottom(){
			if(!this.isMaxLoad){
				this.loadImg = true
				const num = this.pages
				this.getCombinationListData(num)
			}else{
				this.contentText.contentrefresh = '———— 我也是有底线的 ————'
				this.loadingType = 2
				this.loadImg = true
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
			this.getCombinationListData(this.pages)
		},
		methods:{
			//去拼团
			bookingDetallClick(vo,key){
				this.$store.commit('setcombinId',vo.id)
				console.log(this.$store.state)
				uni.navigateTo({
					url:"../../ShopDetails/groubBooking"
				})
			},
			// 获取拼团数据
			getCombinationListData(pages){
				getCombinationListData(pages).then(res => {
					if(res.data.code == 200){
						const obj = res.data.data.data
						this.banner = replaceImage(res.data.data.banner) 
						
						if(obj.length){
							this.pages ++
							obj.forEach(x => {
								x.image = replaceImage(x.image)
							})
							this.bookingList.push(...obj)
						}
						else{
							this.contentText.contentrefresh = '没有更多数据了'
							this.isMaxLoad = true
						}
						this.loadImg = false
					}
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
