<template>
	<view class="container">
		<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==index ? 'active' : '']"
			 :data-current="index" @tap.stop="swichNav">
			 <view class="container-view">
				 <view class="tab-bar-title text-bold">{{item.time}}</view>
				 <view class="tab-bar-title">{{item.state}}</view>
			 </view>
			</view>
		</scroll-view>
		<view class="container-timeOut">
			<view class="container-timeOut-txt">距结束仅剩</view>
			<tui-countdown :time="timeList[currentTab]" :colonSize="40" color="#fff" :width="60" :height="36" :size="30" bcolor="#000000" bgcolor="#000000" colonColor="#000000"></tui-countdown>
		</view>
		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height:winHeight+'px'}">
			<swiper-item v-for="(page,page_indx) in tabbar " :key="page_indx">
				<scroll-view scroll-y class="scoll-y">
					<!--start 内容部分可直接删除-->
						<view class="booking-mian" v-for="(item,index) in timeSeckillList" :key="index">
							<image :src="item.image"></image>
							<view class="booking-main-right">
								<view  class="booking-shop-name">{{item.title}}</view>
								<view class="install-button">
									<view class="download-plan">{{loadingPlan}}%</view>
									<view class="cu-progress round " style="height: 100%; background: none;">
										<view class="my-red-my light" style="border-radius: 24upx;" :style="[{ width:loadingPlan + '%'}]" ></view>
									</view>
								</view>
								
								<view class="booking-main-money">
									<view class="booking-main-money-lfet">
										<view class="text-price text-red text-xxl text-bold" >{{item.price}}</view>
										<view class="booking-main-oldmoney">原价¥{{item.ot_price}}</view>
									</view>
									<button v-if="typeTime == 0" class="booking-main-money-button color-select">已结束</button>
									<button v-if="typeTime == 1" @tap="timeSeckillClick()" class="booking-main-money-button">马上抢</button>
									<button v-if="typeTime == 2"  class="booking-main-money-button">即将开始</button>
								</view>
							</view>
						</view>
					<!--end 内容部分可直接删除-->
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	
	// 获取秒杀页面的数据
	import { secKillData,getSecKillData } from '@/network/Home.js'
	export default {
		components:{
			tuiCountdown
		},
		data() {
			return {
				width:'50%',//进度条的长度
				tabbar:[],
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0 ,//tab标题的滚动条位置
				timeSeckillList:[{
					image:'../../../static/demo1.png',
					title:'棉拖鞋秋冬女厚底拖鞋家居款棉拖鞋秋冬女厚底拖鞋家居款',
					width:80,
					sales:1,
					price:21,
					ot_price:12
				},{
					image:'../../../static/demo1.png',
					title:'棉拖鞋秋冬女厚底拖鞋家居款棉拖鞋秋冬女厚底拖鞋家居款',
					width:80,
					sales:1,
					price:21,
					ot_price:12
				},{
					image:'../../../static/demo1.png',
					title:'棉拖鞋秋冬女厚底拖鞋家居款棉拖鞋秋冬女厚底拖鞋家居款',
					width:80,
					sales:1,
					price:21,
					ot_price:12
				}],//秒杀商品列表
				typeTime:1,//当前状态
				loadingPlan:80,
				skllTime:''//秒杀时间
			}
		},
		onLoad: function() {
			let that = this;
			//  高度自适应
			uni.getSystemInfo({
				success: function(res) {
					let calc = res.windowHeight;
					that.winHeight = calc;
				}
			});
			
		},
		onShow() {		
			// 获取秒杀时间列表和商品列表
			this.getSecKillData()
		},
		computed:{
			timeList(){
				return this.tabbar.map(item => {
					if(item.state == '已结束'){
						return 0
					}else{
						return parseInt(item.stop)/1000
					}
				})
			},
		},
		methods: {
			// 加载秒杀数据
			secKillData(option){
				secKillData(option).then(res => {
					console.log(res)
				})
			},
			
			// 获取秒杀时间列表
			getSecKillData(){
				getSecKillData()
				.then(res => {
					console.log(res)
					if(res.data.code == 200){
						 this.tabbar = res.data.data.seckillTime
						this.tabbar.forEach(x => {
							this.$set(x,'pages',1)
						})
						console.log(this.tabbar)
						// 加载秒杀数据
						this.secKillData(this.tabbar[2])
					}
				})
			},
			
			//秒杀详情
			timeSeckillClick(key){
				uni.navigateTo({
					url:'../../ShopDetails/seckillTime'
				})
			},
			//切换时间
			timeswitching(){
				setTimeout(function(){
					uni.hideLoading()
				},1500)
			},
			// 滚动切换标签样式
			switchTab: function(e) {
				let that = this;
				that.currentTab = e.detail.current;
				that.checkCor();
				uni.showLoading({title:'正在加载'})
				setTimeout(function(){
					that.timeswitching();
				},500)
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 3) {
					//这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/newsDetail/newsDetail'
				})
			}
		}
	}
</script>

<style>
	/*tabbar start*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tab-view {
		width: 100%;
		height: 140upx;
		overflow: hidden;
		box-sizing: border-box;
		left: 0;
		z-index: 99;
		background: #FFFFFF;
		white-space: nowrap;
	}

	.tab-bar-item {
		/* padding: 0 28upx; */
		height: 140upx;
		min-width: 160upx;
		line-height: 100upx;
		/* margin: 0 28upx; */
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}

	.tab-bar-title {
		height: 40upx;
		line-height: 100upx;
		font-size: 34upx;
		color: #525253;
	}

	.active {
		background: #CD3233;
	}

	.active .tab-bar-title {
		color: #FFFFFF !important;
		font-size: 34upx;
	}

	/*tabbar end*/
	.scoll-y {
		height: 100%;
	}

	.list-view {
		margin-top: 100upx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.list-cell {
		padding: 30upx;
		box-sizing: border-box;
	}

	.cell-title-box {
		display: flex;
		justify-content: space-between;
	}

	.cell-title {
		font-size: 36upx;
		line-height: 56upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* padding-bottom: 30upx; */
	}

	.img-container {
		width: 100%;
		padding-top: 24upx;
		display: flex;
		height: 160upx;
		justify-content: space-between;
	}

	.cell-img {
		width: 32%;
		overflow: hidden;
		position: relative;
	}

	.img {
		width: 100%;
		height: 160upx;
		display: block;
		/* position: absolute;
		  left: 50%;
		  top:50%;
		  transform: translate(-50%,-50%);
		*/
		border-radius: 4upx;
	}

	.sub-title {
		padding-top: 24upx;
		font-size: 28upx;
		color: #BCBCBC;
		display: flex;
		align-items: center
	}

	.badge {
		padding: 5upx 10upx;
		font-size: 24upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}

	.b-red {
		background: #FCEBEF;
		color: #8A5966;
	}

	.b-blue {
		background: #ECF6FD;
		color: #4DABEB;
	}

	.b-orange {
		background: #FEF5EB;
		color: #FAA851
	}

	.b-green {
		background: #E8F6E8;
		color: #44CF85
	}
	.container-view{
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100upx;
	}
	.timeSeckill-title{
		height: 240upx;
		width: 100%;
	}
	.container-timeOut{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		color: #333333;
		margin-top: 20upx;
		padding-bottom: 34upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.container-timeOut-txt{
		margin-right: 20upx;
	}
	.booking-mian{
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 0 20upx ;
		margin-bottom: 10upx;
		padding: 16upx;
		display: flex;
	}
	.booking-mian image{
		width: 186upx;
		height: 186upx;
	}
	.booking-main-right{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 24upx;
		width: 70%;
	}
	
	
	.booking-main-money{
		display: flex;
		justify-content: space-between;
	}
	.booking-main-money-lfet{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.booking-main-mewMoney{
		font-size: 36upx;
		font-weight: 700;
	}
	.booking-main-oldmoney{
		color: #999999;
		font-size: 26upx;
		text-decoration: line-through;
	}
	.booking-main-money-button{
		width: 160upx;
		height: 56upx;
		background-color: #CD3233;
		border-radius: 28upx;
		color: #FFFFFF;
		font-size: 23upx;
		line-height: 56upx;
		margin: 0;
	}
	.booking-shop-name{
		color: #525253;
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.color-select{
		border: #999999 2upx solid;
		color: #999999;
		background: none;
	}
	.download-plan{
		position: absolute;
		font-size: 26upx;
	}
	.install-button{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30upx;
		width: 300upx;
		border-radius: 40upx;
		background: #FEB2AB;
		color: #FFFFFF;
		font-size: 18upx;		
	}
	.my-red-my{
		background-color:#CD3233
	}
</style>
