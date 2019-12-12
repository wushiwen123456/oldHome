<template>
	 <mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
	<view v-if="shopList.length != 0">
		<tui-tabs :tabs="tabs2" :currentTab="currentTab"  selectedColor="#CD3233" sliderBgColor="#CD3233" @change="change"></tui-tabs>
		<view v-for="(vo,key) in shopList" :key="key" class="bg-white margin-top-sm">
			<view class="flex align-center  padding-left padding-top-sm padding-bottom-sm s-content">
				<view class="s-item1">
					<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
					<view class="text-sm" style="color: #636362;">{{vo.shopInfo ? vo.shopInfo.shop_name : ''}}</view>
				</view>
				<view class="s-status">{{vo._status ? vo._status._msg : ''}}</view>
			</view>
			<block v-for="(item,indexKey) in vo.cartInfo" :key="indexKey">
				<view  class="flex align-start margin-left margin-right">
					<view class="mybooking-image">
						<image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
					</view>
					<view class="text-width margin-left-sm ">
						<view class="flex align-center justify-between">
							<view class="flex-five text-hieed">{{item.productInfo.store_name}}</view>
							<view class="text-price text-red flex-sub text-center">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs">
							<view class="flex-five text-jiujiujiu text-sm" v-if="item.productInfo.attrInfo">类型：{{item.productInfo.attrInfo.suk}}</view>
							<view class="flex-five text-jiujiujiu text-sm" v-else>默认类型</view>
							<view class="flex-sub text-center">x{{item.cart_num}}</view>
						</view>
					</view>
				</view>
			</block>
			<view class="flex align-center justify-between padding-left solid-top padding-top padding-right">
				<view>
					<image class="mybooking-haming"  src="../../../static/demo3.png" ></image>
					<image class="mybooking-haming"  src="../../../static/demo3.png" ></image>
				</view>
				<view class="flex align-center text-df">
					<view class="text-black">共{{vo.total_num}}件,</view>
					<view class="text-jiujiujiu">合计：</view>
					<view class="text-price text-red text-bold">{{vo.total_price}}</view>
				</view>
			</view>
			
			
			<view class="flex justify-between padding-bottom margin-top-sm button-buttom">
				<!-- <button class="mybooking-button ">查看订单</button> -->
				<!-- <button class="mybooking-button ">邀请好友</button> -->
				<view class="status">
					{{bStatus(vo)}}
				</view>
				<view class="b-button">
					<button @click="btnLeft(vo,key)"  class="mybooking-button mybooking-button-colse">{{textLeft(vo)}}</button>
					<button @click="btnRight(vo,key)" class="mybooking-button ">{{textRight(vo)}}</button>
				</view>
			</view>
		</view>
	</view>
	<Modal v-model="show1" title='提示' text='是否删除订单' @confirm="removeOrder" />
	<Modal v-model="show2" title='提示' text='是否取消拼团' @confirm="cancelOrder" />
	
	</mescroll-uni>
	
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	// 网络访问
	import { myPooking } from '@/network/getProfileData'
	
	// 加载更多组件
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	// 导入方法层
	import {replaceImage} from '@/utils/dealUrl'
	
	import Modal from '@/components/x-modal/x-modal' //导入模态框
	export default{
		components: {
			tuiTabs,
			MescrollUni,
			Modal
		},
		data(){
			return{
				show1:false,
				show2:false,
				show3:false,
				rshow1:false,
				currentTab: 0,
				tabs2: [{
					name: "全部"
				}, {
					name: "拼团中"
				}, {
					name: "成功"
				}, {
					name: "失效",
				}],
				shopList:[],
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
				status:{},
				clickIndex:-1
			}
		},
		onReady() {
			if(this.$store.getters.isToken){
			
			this.token = this.$store.getters.isToken
			}else{
				uni.navigateTo({
					url:'../../login/login'
				})
			}
			const mescroll = this.$refs.mescroll.mescroll
			this.myPooking(mescroll)
		},
		methods:{
			//导航切换
			change(e) {
				this.currentTab = e.index
				const mescroll = this.$refs.mescroll.mescroll
				this.myPooking(mescroll)
			},
			// 访问网咯获取数据
			myPooking(mescroll){
				const token = this.token
				const currentTab = this.currentTab
				myPooking(currentTab,token).then(res => {
					if(res.data.code == 200){
						// 对图片进行处理
						let list = res.data.data
						list = this.dealImage(list)
						this.shopList = list
						mescroll.endErr()
					}
				})
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				this.myPooking(mescroll)
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				mescroll.endErr()
			},
			dealImage(list){
				if(list.length){
					list.forEach(x => {
						x.cartInfo.forEach(y =>{
							const item = y.productInfo
							if(item.attrInfo){
								item.attrInfo.image = replaceImage(item.attrInfo.image)
							}else{
								item.image = replaceImage(item.image)
							}
							
						})
					})
					return list
				}
			},
			textLeft(vo){
				if(vo._status){
					if(vo._status._type == -1){
						return '删除订单'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '取消拼团'
						}else{
							return '查看订单详情'
						}
					}else if(vo._status._type == 4){
						return '交易完成'
					}
				}
			},
			textRight(vo){
				if(vo._status){
					if(vo._status._type == -1){
						return '重新拼团'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '查看进度'
						}else{
							return '通知卖家'
						}
					}else if (vo._status._type == 4){
						return '感谢支持'
					}
				}
			},
			// 订单底部状态
			bStatus(vo){
				if(vo._status){
					if(vo._status._type == -1){
						return '拼团失败'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '拼团中'
						}else{
							return '拼团成功'
						}
					}else if(vo._status._type == 4){
						return '交易成功'
					}
				}else{
					return ''
				}
			},
			// 左边按钮
			btnLeft(vo,index){
				if(vo._status){
					if(vo._status._type == -1){
						  this.left1(index)//删除订单
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							 this.left2(index)//取消拼团
						}else{
							 this.goInDetail(vo)//查看详情
						}
					}
				}
			},
			// 右边按钮
			btnRight(vo,index){
				if(vo._status){
					if(vo._status._type == -1){
						return this.restart(vo)//重新拼团
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return this.goPinkDetail(vo)//查看进度
						}else{
							return this.noticeP(vo)//通知卖家
						}
					}
				}
			},
			left1(index){
				this.show1 = true
				this.clickIndex = index
				console.log(this.clickIndex)
			},
			left2(index){
				this.show2 = true
				this.clickIndex = index
			},
			// 未实现方法---删除订单
			removeOrder(){
				uni.showToast({
					title:'暂未实现',
					icon:'none'
				})
				console.log(this.shopList[this.clickIndex])
			},	
			// 为实现方法---取消拼团
			cancelOrder(){
				uni.showToast({
					title:'暂未实现',
					icon:'none'
				})
				console.log(this.shopList[this.clickIndex])
			},
			// 查看订单
			goInDetail(vo){
				// const order_id = vo.order_id
				// this.$store.commit('setOrderKey',order_id)
				uni.navigateTo({
					url:`../MyOrder/myorder?index`
				})
			},
			// 从新拼团
			restart(vo){
				const id = vo.cartInfo[0].combination_id
				this.$store.commit('setcombinId',id)
				uni.navigateTo({
					url:'../../ShopDetails/groubBooking'
				})
			},
			// 查看进度
			goPinkDetail(vo){
		
				const unified_order = vo.unified_order
				this.$store.commit('setOrderKey',unified_order)
				uni.navigateTo({
					url:'../../PayOrder/payOrderMessage/payorderMessage'
				})
			},
			// 通知卖家
			noticeP(vo){
				uni.showToast({
					title:'已通知卖家',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
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
	.mybooking-haming{
		width:48upx;
		height:48upx;
		border-radius:50%;
		margin-left: -10upx;
		border: 2px solid #FFFFFF;
	}
	.mybooking-haming:nth-child(1){
		margin-left: 0upx;
	}
	.mybooking-button{
		width:180upx;
		height:56upx;
		line-height: 56upx;
		background: none;
		border:1px solid rgba(205,50,51,1);
		border-radius:28upx;
		color: #CD3233;
		font-size: 28upx;
		margin: 0;
	}
	.mybooking-button-colse{
		border:1px solid rgba(153,153,153,1);
		color: rgba(153,153,153,1);
	}
	.s-status{
		color: rgb(205,50,51);
		width: 400upx;
		text-align: right;
	}
	.s-content{
		box-sizing: border-box;
		justify-content: space-between;
		padding-right:15upx;
		.s-item1{
			flex: 1;
			display: flex;
			align-items: center;
		}
	}
	.button-buttom{
		display: flex;
		padding: 25upx 15upx;
		margin: 0;
		align-items: center;
		
		.b-button{
			display: flex;
			width: 376upx;
			justify-content: space-between;
		}
		.status{
			color: #CD3233;
		}
	}
</style>
