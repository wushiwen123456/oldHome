<template>
	<view>
		<view v-for="(vo,key) in list2" :key="key" class="margin-top-sm bg-white" v-if="list2.length">
			<view class="flex align-center solid-bottom discpuntsCentent-title">
				<view style="font-size: 40upx;" class="margin-left margin-right-xs lg cuIcon-shop "></view>
				<view class="text-bold discpuntsCentent-title-shopname">{{vo.shop_info.shop_name}}</view>
			</view>
			<view class="discpuntsCentent-main-all">
				<view v-for="(item,index) in vo.couponList " :key="index" class="discpuntsCentent-main-bg">
					<view class="flex align-center discpuntsCentent-main" 
						:class="[item.is_use ?'discpuntsCentent-main-bg-one':'discpuntsCentent-main-bg-two']">
						<view class="flex-sub text-price text-center text-xxxxl text-bold discpuntsCentent-main-money">{{item.coupon_price}}</view>
						<view class="flex-twice margin-left-sm">
							<view class="text-lg margin-bottom-xs discpuntsCentent-main-money">满{{item.use_min_price}}可用</view>
							<view class="text-sm discpuntsCentent-main-money">{{dealData(item)}}</view>
						</view>
						<view v-if="item.is_use" class="flex-sub discpuntsCentent-button discpuntsCentent-button-coloe" @click="goUse(item,index,vo)">立即使用</view>
						<view v-else @click="goLing(item,index,vo)" class="flex-sub discpuntsCentent-button discpuntsCentent-button-border discpuntsCentent-main-money">立即领取</view>
					</view>
				</view>
			</view>
		</view>
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import {getDiscounts} from '@/network/Home'
	// 导入转换日期函数
	import { formatDate } from '@/utils/dealData'
	
	// 优惠券领取
	import { getDisCount } from '@/network/detail'
	export default{
		data(){
			return{
				list:[{
					shopname:'沃隆旗舰店',
					shopmessage:[{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:1
					},{
						money:100,
						maxmoney:1000,
						time:'2019/11/12-2019/12/12',
						type:0
					}]
				},{
					shopname:'innisfree旗舰店',
					shopmessage:[{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:0
					},{
						money:10,
						maxmoney:100,
						time:'2019/11/12-2019/12/12',
						type:1
					}]	
				}],
				list2:[],
				page:1,
				token:''
			}
		},
		onShow() {
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
				this.getDiscounts(this.page,this.$store.getters.isToken)
			}else{
				uni.navigateTo({
					url:"../../login/login"
				})
			}
			
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods:{
			// 处理时间轴
			dealData(item){
					if(item.end_time == '不限时'){
						return '不限时'
					}else{
						let {start_time,end_time} = item
						const date1 = new Date(start_time*1000)
						const date2 = new Date(this.dealEndTime(end_time))
						start_time = formatDate(date1,'yyyy/MM/dd')
						end_time =  formatDate(date2,'yyyy/MM/dd')
						return start_time + '-' + end_time
					}
			},
			getDiscounts(page,token){
				getDiscounts(page,token)
					.then(res => {
						this.$refs.loading.close()
						if(res.data.code == 200){
							const obj = res.data.data
							const keys = Object.keys(obj)
							const arr = []
							keys.forEach(x => {
								arr.push(obj[x])
							})
							this.list2 = arr
						}
					})
			},
			// 处理时间格式()
			dealEndTime(str){
				return str.replace(/-/g,'/')
			},
			goUse(item,index,vo){
				const id = vo.shop_info.shop_id
				uni.navigateTo({
					url:`../../ShopDetails/StoreDetails/storedetails?id=${id}`
				})
			},
			goLing(item,index,vo){
				getDisCount(item.id,this.token).then(res => {
					if(res.data.code == 200){
						uni.showToast({
							title:'领取成功',
							icon:'none',
							success() {
								item.is_use = true
							}
						})
					}
				})
				
			}
		}
	}
</script>

<style>
	.discpuntsCentent-title{
		height: 82upx;
	}
	.discpuntsCentent-title-shopname{
		color: #636362;
		font-size: 30upx;
	}
	.discpuntsCentent-main{
		margin-bottom: 20upx;
		padding: 20upx;
		padding-right: 50upx;
		height: 186upx;
	}
	.discpuntsCentent-main-all{
		margin: 26upx 30upx 0 30upx ;
		padding-bottom: 38upx;
	}
	.discpuntsCentent-main-bg-one{
		background: url(../../../static/lqyijqu.png);
		background-size: 100% 100%;
	}
	.discpuntsCentent-main-bg-two{
		background: url(../../../static/lqweilingqu.png);
		background-size: 100% 100%;
	}
	.text-price::before{
		font-size: 50%;
	}
	.discpuntsCentent-button{
		display: flex;
		align-items: center;
		justify-content: center;
		height:50upx;
		border-radius:25upx;
	}
	.discpuntsCentent-button-coloe{
		background:linear-gradient(0deg,rgba(229,21,11,1),rgba(255,97,82,1));
		color: #FFFFFF;
	}
	.discpuntsCentent-button-border{
		border:#E5150B 1px solid
	}
	.discpuntsCentent-main-money{
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,97,82, 1)), to(rgba(229,21,11, 1)));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
