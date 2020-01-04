<template>
	<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
	<view class="content">
		<view class="header">
			<image class="bgimg h-1" src="../../../static/tixian/nologin2.png" mode="aspectFill"></image>
			<view class="h-tips margin-bottom-sm">
				我的余额（元）
			</view>
			<view class="h-main">
				<view class="h-price">{{myPrice}}</view>
				<view class="h-btn" @click="goTixian">提现</view>
			</view>
		</view>
		<view class="ban-list">
			<view class="ban-title">
				资金明细
			</view>
			<view class="ban-item" v-if="listData.length" :class="{'border-b' : index != listData.length-1}" v-for="(item,index) in listData" :key="index">
				<!-- <image class="pay-icon1" :src="item.icon" mode=""></image> -->
				<view class="item-center">
					<!-- <text class="text-base">转账至{{item.payMethod}}账户</text> -->
					<text class="text-black text-lg text-bold">{{item.pm == 0 ? '支出' : '收入'}}</text>
					<view class="text-data">{{item.add_time}}</view>
				</view>
				<view class="item-right">
					<view class="item-r-price">{{item.pm == 0 ? '+' : '-'}}{{item.number}}元</view>
					<!-- <view class="item-r-status" :class="{'is-tixian':item.status == 0}">{{item.status == 0 ? '提现中' : '提现成功'}}</view> -->
				</view>	
			</view>
			
		</view>
		<view class="userNodes" v-if="!listData.length">
			您还没有记录
		</view>
	</view>
	 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</mescroll-uni>
</template>

<script>
	import {userBalance} from '@/network/getProfileData'
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components:{
			MescrollUni
		},
		data() {
			return {
				isTixian:false,
				listData:[
					// {
					// 	icon:'/static/tixian/06.png',
					// 	payMethod:'支付宝',
					// 	data:'2019-12-19',
					// 	price:500,
					// 	status:0 //0：提现中 1：提现成功
						
					// },
					// {
					// 	icon:'/static/tixian/04.png',
					// 	payMethod:'微信',
					// 	data:'2019-12-20',
					// 	price:400,
					// 	status:1 //0：提现中 1：提现成功
						
					// },
					// {
					// 	icon:'/static/tixian/05.png',
					// 	payMethod:'银行卡',
					// 	data:'2019-12-20',
					// 	price:300,
					// 	status:1 //0：提现中 1：提现成功
						
					// }
				],
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
				token:'',
				hasNext:true,
				myPrice:''
			};
		},
		onLoad() {
			// this.getUserBalance()
			this.token = this.$store.getters.isToken
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			// 进入提现
			goTixian(){
				const price = this.myPrice
				uni.navigateTo({
					url:`tiXian?price=${price}`
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
				this.getUserBalance(pageNum,pageSize,mescroll)
			},
			getUserBalance(pageNum,pageSize,mescroll){
				const token = this.token
				userBalance(pageNum,pageSize,token).then(res => {
					this.$refs.loading.close()
					if(res.data.code == 200){
						const data = res.data.data
						this.myPrice = data.userBill
						this.hasNext = data.list.length >= pageSize
						if(this.pageNum == 1) this.listData = []
						this.listData = this.listData.concat(data.list)
						mescroll.endSuccess(data.list.length, this.hasNext);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page,.content{
		height: 100%;
		background-color: #f5f5f5;
		overflow: hidden;
	}
	.bgimg{
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 1;
	}
	.header{
		height: 270upx;
		position: relative;
		padding: 20upx 20upx;
		.h-1{
			top: 0;
			height: 100%;
		}
		.h-tips{
			position: relative;
			z-index: 2;
			color: rgba(255,255,255,.7);
		}
		.h-main{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 2;
			.h-price{
				color: #fff;
				font-size: 80upx;
			}
			.h-btn{
				background-color: rbg(255,255,255);
				color: rgb(205,50,51);
				font-size: 32upx;
				padding: 12upx 32upx;
				background-color: #fff;
				border-radius: 30upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
			}
		}
	}
	.ban-list{
		background-color: #fff;
		padding: 15upx 15upx;
		.ban-title{
			font-weight: bold;
			font-size: 32upx;
			line-height: 2;
			color: #404040;
			border-bottom: 1px solid #E0E0E0;
		}
		.ban-item{
			padding: 18upx 15upx 18upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80upx;
			box-sizing: content-box;
			line-height: 1.4;
			.pay-icon1{
				width: 64upx;
				height: 64upx;
				margin-right: 20upx;
			}
			.text-base{
				color: #686868;
				font-size: 30upx;
			}
			.text-data{
				color: #686868;
				font-size: 28upx;
				opacity: 0.69;
			}
			.item-r-price{
				color: #CD3233;
				font-size: 30upx;
				font-weight: bold;
			}
			.is-tixian{
				color: #FFBA00 !important;
			}
			.item-r-status{
				color: #686868;
				font-size: 28upx;
			}
			.item-center{
				flex: 1;
			}
			.item-right{
				width: 124upx;
				text-align: right;
			}
		}
	}
	.border-b{
		border-bottom: 1px solid #E0E0E0;
	}
	.userNodes{
		height: 350upx;
		color: #8C8C8C;
		font-size: 28upx;
		display: flex;
		justify-content: center;	
		align-items: center;
		background-color: #f5f5f5;
	}
</style>
