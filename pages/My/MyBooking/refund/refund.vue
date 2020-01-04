<template>
	<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
		<view v-for="(vo,key) in shopList" :key="key" class="bg-white margin-top-sm">
			<view class="flex align-center justify-between padding-right  refund-image solid-bottom">
				<view class="flex">
					<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
					<view class="text-sm" style="color: #636362;">{{vo.shopInfo ? vo.shopInfo.shop_name : ''}}</view>
				</view>
				<text class="text-cut text-red">{{vo._status ? vo._status._title : ''}}</text>
			</view>
			<block v-for="(item,indexKey) in vo.cartInfo" :key="indexKey">
				<view  class="flex align-start margin-top-sm margin-left margin-right" @tap="goInfo(vo)">
					<view class="mybooking-image">
						<image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
					</view>
					<view class="text-width margin-left-sm ">
						<view class="flex align-center justify-between">
							<view class="flex-five text-hieed" @tap.stop="goDetail(item,vo)">{{item.productInfo.store_name}}</view>
							<view class="text-price text-red flex-sub text-center">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs">
							<view class="flex-five text-jiujiujiu text-sm">类型:{{item.productInfo.attrInfo ? item.productInfo.attrInfo.suk : '默认类型'}}</view>
							<view class="flex-sub text-center">x{{item.cart_num}}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="flex align-center justify-between solid-top solid-bottom  refund-image">
				<view class="flex">
					<image src="../../../../static/tuikaun.png" ></image>
					<text>{{vo._status ? vo._status._msg : ''}}</text>
				</view>
				<button @tap="goInfo(vo)" class="mybooking-button">查看详情</button>
			</view>
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</mescroll-uni>
</template>


<script>
	import {userRefund} from '@/network/getProfileData'
	
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	// 导入替换字符串方法
	import {replaceImage} from '@/utils/dealUrl'
	export default{
		onLoad() {
			this.token = this.$store.getters.isToken		
		},
		onReady() {
			this.$refs.loading.open()
		},
		components:{
			MescrollUni
		},
		data(){
			return{
				shopList:[],
				token:'',
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
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore:'-- 没有更多了 --',
					empty: {
						tip: '暂无相关数据'
					}
				},
				hasNext:true,
			}
		},
		methods:{
			// 获取网络请求
			userRefund(pageNum,pageSize,mescroll){
				const token = this.token
				userRefund(pageNum,pageSize,token).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						let list = res.data.data
						if(list.length){
							list.forEach(x => {
								x.cartInfo.forEach(y => {
									if(y.productInfo.attrInfo){
										y.productInfo.attrInfo.image = replaceImage(y.productInfo.attrInfo.image)
									}else{
										y.productInfo.image = replaceImage(y.productInfo.image)
									}
								})
							})
						}
						if(list.length < pageSize){
							this.hasNext = false
						}else{
							this.hasNext = true
						}
						if(pageNum == 1) this.shopList = []
						this.shopList = this.shopList.concat(list)
						mescroll.endSuccess(list.length, this.hasNext)
					}else{
						mescroll.endErr()
					}
				})
			},
			//查看详情
			refundClick(){
				uni.navigateTo({
					url:'refundMessage'
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
				this.userRefund(pageNum,pageSize,mescroll)
			},
			goDetail(item,vo){
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
			},
			goInfo(vo){
				
				this.$store.commit('setOrderKey',vo.order_id)
				console.log(vo.order_id)
				uni.navigateTo({
					url:'./refundMessage'
				})
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
	.mybooking-button{
		width:180upx;
		height:60upx;
		line-height: 60upx;
		background: none;
		border:1px solid rgba(205,50,51,1);
		border-radius:40upx;
		color: #CD3233;
		font-size: 28upx;
		margin: 0;
		margin-right: 30upx;
	}
	.mybooking-button-colse{
		border:1px solid rgba(153,153,153,1);
		color: rgba(153,153,153,1);
	}
	.refund-image{
		color: #636362;
		font-size: 24upx;
		height: 80upx;
		padding-left: 30upx;
	}
	.refund-image image{
		width: 36upx;
		height: 36upx;
		margin-right: 20upx;
	}
</style>
