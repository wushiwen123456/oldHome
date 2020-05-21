<template>
	<view>
		<view>
			<tui-tabs 
				:tabs="tabs" 
				selectedColor="#CD3233" 
				sliderBgColor="#CD3233" 
				:currentTab="currentTab>2?0:currentTab" 
				@change="change" 
				itemWidth="33.3333%">
			</tui-tabs>
			
			<view class="margin-left margin-right" v-if="dataType">
				<!-- 领券中心 -->
				<view @tap="lqcententClcik" class="flex align-center justify-between mydiscounts-title-all margin-top-xs" >
					<view class="flex align-center">
						<image class="mydiscounts-title-img" src="../../../static/lqa.png"></image>
						<view class="text-three text-wuer">领券中心</view>
					</view>
					<view class="lg text-gray cuIcon-right margin-right-sm"></view>
				</view>
				
					<!-- 未使用优惠券 -->
					<view>
						<view v-for="(item,index) in countType" :key='index'>
							<view class="flex align-center bg-white margin-top-sm padding-left-sm">
								<view class=" flex align-center">
									<view class="lg cuIcon-shop shoppingCart-title-shop"></view>
									<view class="text-wuer text-lg text-bold">{{item.shop_info.shop_name}}</view>
								</view>
							</view>
							<view class="mydiscounts-main-bg margin-bottom-sm" v-for="(vo,key) in item.couponList" :class="bgImage">
								<view class="flex flex-direction margin-bottom-sm">
									<view class="flex align-center">
										<view class="text-price text-red text-xxxxl">{{vo.coupon_price}}</view>
										<view class=" margin-left-xl text-wuer text-three  text-hide">{{vo.coupon_title}}</view>
									</view>
									<view class="flex align-center">
										<view class="text-sm text-red">满{{vo.use_min_price}}可用</view>
										<view class="margin-left-xl text-jiujiujiu text-sm">{{dealData(vo._add_time,vo._end_time)}}</view>
									</view>
								</view>
								<view v-if="" class="mydiscounts-main-bottom" @tap="goUse(item)">立即使用</view>
							</view>
						</view>
					</view>
					
						
				<!-- <view v-if="currentTab == 1">
					<view class=" margin-top-xs mydiscounts-main-bg bg-two ">
						<view class="flex flex-direction margin-bottom-sm">
							<view class="flex align-center">
								<view class="text-price text-red text-xxxxl">50</view>
								<view class=" margin-left-xl text-wuer text-three  text-hide">【晴格木美妆小铺】50元优惠券</view>
							</view>
							<view class="flex align-center">
								<view class="text-sm text-red">满299可用</view>
								<view class="margin-left-xl text-jiujiujiu text-sm">2019.09.21-2019.10.21</view>
							</view>
						</view>
						<view class="mydiscounts-main-bottom">立即使用</view>
					</view>
				</view>


				<view v-if="currentTab == 2">
					<view class=" margin-top-xs mydiscounts-main-bg bg-three">
						<view class="flex flex-direction margin-bottom-sm">
							<view class="flex align-center">
								<view class="text-price text-red text-xxxxl">50</view>
								<view class=" margin-left-xl text-wuer text-three  text-hide">【晴格木美妆小铺】50元优惠券</view>
							</view>
							<view class="flex align-center">
								<view class="text-sm text-red">满299可用</view>
								<view class="margin-left-xl text-jiujiujiu text-sm">2019.09.21-2019.10.21</view>
							</view>
						</view>
						<view class="mydiscounts-main-bottom">立即使用</view>
					</view>
				</view> -->
				
				
			</view>
			<view v-else class="nodata" :style="{height:style.height + 'px'}">
				<image src="/static/youhuiquan.png"></image>
				<button @tap="lqcententClcik">去领券中心</button>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import {getUserDiscounts} from '@/network/getProfileData'
	export default{
		components: {
			tuiTabs
		},
		data(){
			return{
				currentTab: 0,//当前滑块状态
				tabs: [{
					name: "未使用"
					
				}, {
					name: "已使用"
				}, {
					name: "已过期"
				}],
				windowHeight:0,//屏幕高度
				dataType:false,//是否存在数据
				countType:[],
				style:{
					height:''
				}
			}
		},
		onLoad() {
			var that = this
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			if(this.$store.getters.isToken){
				this.getUserDiscounts(this.currentTab+1,this.$store.getters.isToken)
			}else{
				uni.switchTab({
					url:"../../Home/home"
				})
			}
		},
		computed:{
			bgImage(){
				switch (this.currentTab){
					case 0 : 
						return 'bg-one'
					case 1 : 
						return 'bg-two'
					case 2 : 
						return 'bg-three'
				}
			}
		},
		methods:{
			getUserDiscounts(types,token){
				getUserDiscounts(types,token)
					.then(res => {
						if(res.data.code == 200){
							const obj = res.data.data
							const keys = Object.keys(obj)
							console.log(keys)
							if(keys.length){
								this.dataType =  true
							}else{
								this.dataType = false
							}
							const arr = []
							keys.forEach(x => {
								arr.push(obj[x])
							})
							this.countType = arr
							console.log(this.dataType)
						}
					})
			},
			goUse(item){
				uni.navigateTo({
					url:`../../ShopDetails/StoreDetails/storedetails?id=${item.shop_info.shop_id}`
				})
			},
			//切换标签
			change(e) {
				this.currentTab = e.index
				this.getUserDiscounts(this.currentTab+1,this.$store.getters.isToken)
			},
			//
			lqcententClcik(){
				uni.navigateTo({
					url:'DiscpuntsCentent'
				})
			},
			// 处理时间轴
			dealData(startTime,endTime){
				const _startTime = startTime.replace(/\//g,'.')
				const _endTime = endTime.replace(/\//g,'.')
				return _startTime +' - '+ _endTime
			}
		}
	}
</script>

<style>
	.nodata{
		padding-top: 200upx;
		background: #FFFFFF;
	}
	.nodata button{
		margin-top: 40upx;
		width:280upx;
		height:80upx;
		line-height: 80upx;
		color: #FFFFFF;
		font-size: 30upx;
		background:rgba(205,50,51,1);
		box-shadow:0upx 8upx 16upx 0upx rgba(232,54,42,0.24);
		border-radius:40upx;
	}
	.nodata image{
		width: 100%;
		height: 500upx;
	}
	.mydiscounts-title-all{
		border-radius: 8upx;
		background: #FFFFFF;
		height:88upx;
		
	}
	.mydiscounts-title-img{
		margin-left: 20upx;
		margin-right: 16upx;
		width:56upx;
		height:56upx;		
	}
	.text-price::before{
		font-size: 50%;
	}
	.mydiscounts-main-bg{
		padding: 20upx 30upx 0 30upx;
		height: 208upx;
	}
	.bg-one{
		background: url(../../../static/lqweishy.png);
		background-size: 100% 100%;
	}
	.bg-two{
		background: url(../../../static/lqyishy.png);
		background-size: 100% 100%;
	}
	.bg-three{
		background: url(../../../static/lqyiguoq.png);
		background-size: 100% 100%;
	}
	.mydiscounts-main-bottom{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60upx;
		line-height: 60upx;
		color: #CD3233;
		font-size: 30upx;
		font-weight: bold;
	}
	.text-hide{
		overflow:hidden;
		text-overflow:ellipsis; 
		white-space:nowrap;
	}
</style>
