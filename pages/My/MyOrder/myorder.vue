<template>
	<view>
		<tui-tabs :tabs="tabs2" :currentTab="currentTab"  class="tui-tab" selectedColor="#CD3233" sliderBgColor="#CD3233"  @change="change"></tui-tabs>
		<canvas v-if="Nodata" :style="{height:windowHeight + 'px'}" class="bg-white text-width" disable-scroll="true">
			<view style="padding-top: 200upx;">
				<image class="text-width" mode="widthFix" src="../../../static/nodatab.png"></image>
			</view>
		</canvas>
		<view v-for="(vo,key) in orderInfo" :key="key" class="bg-white margin-top-sm" @click="detail(vo)">
			<view class="flex align-center padding-left padding-right padding-top-sm padding-bottom-sm s-content">
				<view class="s-item1">
					<view v-if="vo.shopInfo" style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
					<image v-if="vo.pay_type == 'integral'" class="integralShop-title-image" src="../../../static/jifenb.png"></image>
					<view class="text-sm" style="color: #636362;">{{storeName(vo,key)}}</view>
				</view>
				<view class="s-status">{{DetlVoStatus(vo)}}</view>
			</view>
			<block v-for="(item,indexKey) in vo.cartInfo" :key="indexKey">
				<view  class="flex align-start margin-left margin-right" :class="{'padding-bottom':vo._status._type == 3}">
					<view class="mybooking-image">
						<image :src="listImage(item,indexKey)"></image>
					</view>
					<view class="text-width margin-left-sm ">
						<view class="flex align-center justify-between">
							<view class="flex-five text-hieed">{{item.productInfo.store_name}}</view>
							<view class="text-price text-red flex-sub text-center">{{item.productInfo.price}}</view>
						</view>
						<view class="flex align-center justify-between margin-top-xs">
							<view class="flex-five text-jiujiujiu text-sm" v-if="item.productInfo.attrInfo">种类：{{item.productInfo.attrInfo.suk}}</view>
							<view class="flex-sub" :class="{'text-right':!item.productInfo.attrInfo}">x1</view>
						</view>
						<view @click.stop="goPingjia(item,indexKey)" class="flex justify-end pingjia" v-if="vo._status._type == 3">
							<text>立即评价</text>
						</view>
					</view>
					
				</view>
				
			</block>
			<view class="flex justify-end padding-left solid-top padding-top padding-bottom padding-right">
				<view class="flex align-center text-df">
					<view class="text-black">共{{vo.cartInfo.length}}件,</view>
					<view class="text-jiujiujiu">合计：</view>
					<view class="text-price text-red text-bold">{{vo.pay_price}}</view>
				</view>
				
			</view>	
			<view v-if="vo._status._type < 3" class="flex justify-end padding-bottom f-button margin-top-sm">
				<!-- <button class="mybooking-button ">评价</button> -->
				<!-- <view class="mybooking-button mybooking-button-colse" @tap="detail(vo,key)">{{dealBtnLeft(vo)}}</view> -->
				<view class="mybooking-button mybooking-button-colse" @click.stop="btnCliclLeft(vo,key)">{{dealBtnLeft(vo)}}</view>
				<view @click.stop="btnClickRight(vo,key)" class="mybooking-button mybooking-button-colse" :class="{'button-r' : vo._status._type == 2 || vo._status._type == 0 || vo._status._type == 3 }">{{dealBtnRight(vo)}}</view>
				<!-- <button class="mybooking-button mybooking-button-colse">取消订单</button> -->
				<!-- <button class="mybooking-button ">确认付款</button> -->
				<!-- <button class="mybooking-button mybooking-button-colse">提醒发货</button> -->
			</view>
		</view>
		<Modal v-model="show1" title='提示' class="con-fim" text='是否确认收货' @confirm="ConfirmOrder" />
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import {userOrder} from '@/network/getProfileData.js'
	import { replaceImage } from '@/utils/dealUrl'
	import {affirmOrder} from '@/network/affirm'
	
	// 导入弹出层
	import Modal from '@/components/x-modal/x-modal'
	export default{
		components: {
			tuiTabs,
			Modal
		},
		data(){
			return{
				windowHeight:0,//屏幕高度
				Nodata:false,//暂无数据
				currentTab: 0,
				tabs2: [{
					name: "全部",
					page:0
				}, {
					name: "待付款",
					page:0
				}, {
					name: "待发货",
					page:0
				}, {
					name: "待收货",
					page:0
				}, {
					name: "待评价",
					page:0
				}],
				orderInfo:[],
				show1:false,
				currentClick:-1,
				token:''
			}
		},
		onLoad(e) {
			var that = this
			let num = parseInt(e.index)
			
			that.currentTab = num
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
			that.token = that.$store.getters.isToken
			if(!this.$store.getters.isToken){
				uni.switchTab({
					url:"../../Home/home"
				})
			}else{
				this.orderInfo = [],
				this.userOrder(that.currentTab,that.token)
			}
		},
		onShow() {
			this.orderInfo = [],
			this.userOrder(this.currentTab,this.token)
		},
		methods:{
			// 查看详情
			detail(vo,key){
				this.$store.commit('setOrderKey',vo.order_id)
				uni.navigateTo({
					url:'orderdetail'
				})
			},
			// 列表图片
			listImage(item,indexKey){
				return item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image
			},
			// 单个价格
			totalPrice(vo,key){
				return vo.cartInfo[0].productInfo.attrInfo ? vo.cartInfo[0].productInfo.attrInfo.price : vo.cartInfo[0].productInfo.price
			},
			// 店铺名字
			storeName(vo,index){
				if(vo.shopInfo){
					return vo.shopInfo.shop_name
				}else{
					if(vo.pay_type == 'integral'){
						return '客多多官方积分商城'
					}
				}
			},
			// 字段展示
			showText(vo,key){
				const status = vo._status
				switch(status._type){
					case  0:
					return '立即支付'
					case -1:
					return '申请退款中'
				}
			},
			change(e) {
				this.currentTab = e.index
				console.log(this.currentTab)
				
				// 测试测试
				this.userOrder(this.currentTab,this.$store.getters.isToken)
			},
			userOrder(type,token){
				userOrder(type,token)
					.then(res => {
						if(res.data.code == 200){
							this.orderInfo = res.data.data
							if(!this.orderInfo.length){
								this.Nodata = true
								return 
							}else{
								this.Nodata = false
							}
							this.orderInfo.forEach(x => {
								x.cartInfo.forEach(item => {
									const img = item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image
									const img2 = replaceImage(img)
									if(item.productInfo.attrInfo){
										item.productInfo.attrInfo.image = img2
									}else{
										item.productInfo.image = img2
									}
								})
							})
						}
					})
			},
			
			// 提醒买家发货
			tixing(){
				uni.showToast({
					title:'已提醒买家发货',
					icon:'none'
				})
			},
			//确认收货
			affirmClick(vo,key){
				// uni.navigateTo({
				// 	url:'orderdetail'
				// })
				const status = vo._status
				switch(status._type){
					case 0 :
						this.goPay(vo) 
						break
					case -1 :
						this.moneyBack(vo)
						 break
					default :
						return 
				}
			},
			// 去支付
			goPay(item){
				this.$store.commit('setOrderKey',item.order_id)
				uni.navigateTo({
					url:'orderdetail'
				})
			},
				
			// 查看物流
			lookWuliu(){
				uni.navigateTo({
					url:''
				})
			},
			dealBtnLeft(vo){
				const state = parseInt(vo._status._type)
			 	switch(state){
					case 0 : return  '查看详情'; 
					case 1 : return  '查看详情' ;
					case 2 : return  '查看物流' ;
					case 3 : return  '查看物流' ;
				}
				
				//	下面是测试版本
				// 	switch(state){
				// 	case 0 : return  '查看详情'; 
				// 	case 1 : return  '查看物流' ;
				// 	case 2 : return  '查看物流' ;
				// 	case 3 : return  '查看物流' ;
				// }
			},
			dealBtnRight(vo){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : return  '立即付款'; 
					case 1 : return  '提醒卖家发货' ;
					case 2 : return  '确认收货' ;
					case 3 : return  '立即评价' ;
				}
			},
			// 订单上方状态
			DetlVoStatus(vo){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : return  '等待付款'; 
					case 1 : return  '等待卖家发货' ;
					case 2 : return  '买家已发货' ;
					case 3 : return  '交易成功' ;
					default : return '交易完成'
				}
			},
			// 左按钮点击
			btnCliclLeft(vo,ken){
				const state = parseInt(vo._status._type)
				console.log(state)
				switch(state){
					case 0 : 
						this.detail(vo) 
						break;
					case 1 :
						this.detail(vo)
						break;
					case 2 :
					// 查看物流
						const id = vo.order_id
						uni.navigateTo({
							url:`../logistics/logistics?id=${id}`
						})
						break;
					case 3 : 
					// 评价页
						uni.navigateTo({
							
						})
						break;
				}
				
				
				
				// 下面是测试版本
				// switch(state){
				// 	case 0 : 
				// 		this.detail(vo) 
				// 		break;
				// 	case 1 :
				// 		this.lookWuliu()
				// 		break;
				// 	case 2 :
				// 	// 查看物流
				// 		uni.navigateTo({
							
				// 		})
				// 		break;
				// 	case 3 : 
				// 	// 评价页
				// 		uni.navigateTo({
							
				// 		})
				// 		break;
				// }
			},
			// 右按钮点击
			btnClickRight(vo,ken){
				const state = parseInt(vo._status._type)
				switch(state){
					case 0 : 
						// 立即付款
						this.detail(vo) 
						break;
					case 1 :
					// 提醒发货
						this.tixing()
						break;
					case 2 :
					// 确认收货
						this.show1 = true
						this.currentClick = ken
						break;
					case 3 : 
					// 评价页
						// this.goPingjia(vo)
						break;
				}
			},
			// 确认收货
			ConfirmOrder(){
				const obj = this.orderInfo[this.currentClick]
				affirmOrder(obj.order_id,this.token).then(res => {
					if(res.data.code == 200){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('已收货');	
						// #endif
						this.orderInfo.splice(this.currentClick,1)
					}else{
						// #ifdef APP-PLUS
						plus.nativeUI.toast(res.data.msg);
						// #endif
					}
				})
			},
			goPingjia(item){
				this.$store.commit('setOrderDetail',item)
				uni.navigateTo({
					url:`evaluate`
				})
			}
		},
	}
</script>

<style lang="scss">
	.f-button{
		padding: 0 15upx 20upx;
		box-shadow: 0 3px 4px rgba(0,0,0,.1);
	}
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.button-r{
		border-color:#CD3233 !important;
		color: #CD3233 !important;
	}
	.text-hieed{
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.start{
		display: flex;
		
	}
	.mybooking-button{
		background: none;
		border-radius:40upx;
		color: $uni-text-color;
		background-color: #fff;
		font-size: 28upx;
		padding:0 20upx ;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10upx 20upx;
		margin-left: 15upx;
		box-sizing: content-box;
	}
	.mybooking-button-colse{
		border:1px solid #666;
		color: #666;
	}
	.s-content{
		box-sizing: border-box;
		justify-content: space-between;
		.s-item1{
			flex: 1;
			display: flex;
		}
	}
	.s-status{
		color: rgb(205,50,51);
		width: 200upx;
		text-align: right;
	}
	.integralShop-title-image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}
	.tui-tab{
		z-index: 1;
	}
	.con-fim{
		text-align: center;
	}
	.pingjia{
		color: #666;
		padding: 30upx 0 8upx;
		text{
			padding: 5upx 15upx;
			border:1px solid #666;
			border-radius: 10upx;
		}
	}
</style>
