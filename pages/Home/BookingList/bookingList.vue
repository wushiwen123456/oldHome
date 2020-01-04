<template>
	<view :style="{ 'min-height': windowHeight + 'px'}" class="bg-white">
		<image class="booking-title-image" :src="banner"></image>
		<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption" :top="256">
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
	</mescroll-uni>
		<!-- <uni-load-more v-if="loadImg" :contentText="contentText" :loadingType="loadingType"></uni-load-more> -->
	</view>

</template>

<script>
	import {getCombinationListData} from '@/network/Home'
	import {replaceImage} from '@/utils/dealUrl'
	// import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default{
		components:{
			// uniLoadMore
			MescrollUni
		},
		data(){
			return{
				bookingList:[],
				windowHeight:652,//屏幕高度
				bookingBanner:'',
				shopList:{
					limit:[]	
				},
				banner:'',
				hasNext:false,
				// 下拉刷新的常用配置
				downOption: { 
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 5 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore:'-- 没有更多了 --',
					empty: {
						tip: '暂无相关数据'
					}
				},
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
		},
		methods:{
			//去拼团
			bookingDetallClick(vo,key){
				this.$store.commit('setcombinId',vo.id)
				uni.navigateTo({
					url:"../../ShopDetails/groubBooking"
				})
			},
			// 获取拼团数据
			getCombinationListData(pageNum,pageSize,mescroll){
				getCombinationListData(pageNum,pageSize).then(res => {
					if(res.data.code == 200){
						const obj = res.data.data.data
						this.banner = replaceImage(res.data.data.banner) 
						
						if(obj.length){
							obj.forEach(x => {
								x.image = replaceImage(x.image)
							})
							this.bookingList.push(...obj)
						}
						if(obj.length < pageSize){
							this.hasNext = false
						}else{
							this.hasNext = true
						}
						if(pageNum == 1) this.bookingList = [];
						this.bookingList = this.bookingList.concat(obj)
						console.log(mescroll)
						mescroll.endSuccess(obj.length, this.hasNext)
					}
				})
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.getCombinationListData(pageNum,pageSize,mescroll)
			},
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
