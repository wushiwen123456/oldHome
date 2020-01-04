<template>
	<view>
		<view v-if="mytrue" class="my-title-background">
			
			<view  class="bg-white  margin-left margin-right my-one-all">
				<view class="flex align-end justify-between margin-left-lg">
					<view class="flex align-center" @click="mySet">
						<image class="my-head-image" :src="userInfo.avatar"></image>
						<view class="text-xl text-bold margin-left-sm">{{userInfo.nickname}}</view>
					</view>
					<view @click="goQiandao" class="my-one-jifen flex align-center justify-center">
						<image src="../../static/jifenw.png"></image>
						<view class="margin-left-xs">红包{{userInfo.red_packet}}</view>
					</view>
				</view>
				<view class="flex align-center justify-around margin-top">
					<view @tap="collectClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{userInfo.product_collect}}</view>
						<view class="text-sm">商品收藏</view>
					</view>
					<view @tap="attrntionClick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{userInfo.shop_collect}}</view>
						<view class="text-sm">店铺收藏</view>
					</view>
					<view @tap="integralShopCick" class="flex flex-direction align-center justify-center">
						<view class="margin-bottom-xs text-lg">{{userInfo.integral}}</view>
						<view class="text-sm">积分</view>
					</view>
					<view @tap="footprintClick" class="flex flex-direction align-center justify-center" @click="my_zuji">
						<view class="margin-bottom-xs text-lg">{{userInfo.visit}}</view>
						<view class="text-sm">我的足迹</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-else class="Nologin" >
			<view @tap="loginClick" class="Nologin-button">登录/注册</view>
		</view>
		
		
		<view class="my-two-three-all">
			<view class="bg-white border-all ">
				<view @tap="myOrderClick(0)" class="flex align-center justify-between solid-bottom height-all">
					<view class="text-bold text-lg">我的订单</view>
					<view class="flex align-center">
						<view class="text-jiujiujiu text-sm">查看全部</view>
						<view class="lg text-jiujiujiu cuIcon-right margin-left-xs"></view>
					</view>
				</view>
				<view class="flex align-center justify-around padding-top-lg my-two-bootom">
					<view @tap="myOrderClick(1)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoa.png"></image>
						<view class="text-sm bg-white">待付款</view>
					</view>
					<view @tap="myOrderClick(2)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwob.png"></image>
						<view class="text-sm bg-white">待发货</view>
					</view>
					<view @tap="myOrderClick(3)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoc.png"></image>
						<view class="text-sm bg-white">待收货</view>
					</view>
					<view @tap="myOrderClick(4)" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwod.png"></image>
						<view class="text-sm bg-white">评价</view>
					</view>
					<view @tap="refundClick" class="flex align-center justify-center flex-direction">
						<image class="my-image-two-all" src="../../static/mytwoe.png"></image>
						<view class="text-sm bg-white">退款/售后</view>
					</view>
				</view>
			</view>
			<view class="bg-white border-all margin-top-xs">
				<view>
					<view class="flex align-center justify-between solid-bottom height-all">
						<view class="text-bold text-lg">我的工具</view>
						<view class="flex align-center">
							<!-- <view class="text-jiujiujiu">查看全部</view>
							<view class="lg text-jiujiujiu cuIcon-right margin-left-xs"></view> -->
						</view>
					</view>
				</view>
				<view class="grid margin-bottom text-center col-4 padding-top-lg">
					<view @tap="discountsClick" class="my-three-all">
						<image src="../../static/mythreea.png"></image>
						<view>优惠券</view>
					</view>
					<view @tap="enterClick" class="my-three-all">
						<image src="../../static/mythreeb.png"></image>
						<view>商家入驻</view>
					</view>
					<view @tap="MybookingClick" class="my-three-all">
						<image src="../../static/mythreec.png"></image>
						<view>我的拼团</view>
					</view>
					<view @tap="addressClick" class="my-three-all">
						<image src="../../static/mythreed.png"></image>
						<view>我的地址</view>
					</view>
					<view @tap="intrgralDetailClick" class="my-three-all">
						<image src="../../static/mythreee.png"></image>
						<view>积分明细</view>
					</view>
					<view @tap="discountscententClick()" class="my-three-all">
						<image src="../../static/mythreef.png"></image>
						<view>领券中心</view>
					</view>
					<view @tap="goQianbao()" class="my-three-all my-three-all2">
						<image src="/static/tixian/02.png"></image>
						<view>我的钱包</view>
					</view>
					<view @tap="erWeiShare()" class="my-three-all my-three-all2">
						<image src="../../static/fenxiang.png"></image>
						<view>推广好友</view>
					</view>
				</view>
			</view>
		</view>
		<x-modal  v-model="show1" title='前往登录' text='需要登录才能查看哦' @confirm="goLogin" />
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	// 获取个人信息
	import { getProfileData,saveFiles } from '@/network/getProfileData'
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	// 导入公共类
	import { HOST } from '@/common/const'
	
	
	// 导入分享方法
	import share from "@/common/share.js";
	export default{
		data(){
			return{
				mytrue:false,//是否登录
				username:"",
				avatar:"",
				integral:"",
				now_money:"",
				sex:"",
				product_collect:"",
				shop_collect:"",
				visit:"",
				uid:'',
				red_packet:'',
				show1:false,
				isLoading:false,
				userInfo:{},
			}
		},
		onShow() {
			if(!this.isToken){
				this.mytrue = false
			}else{
				this.mytrue = true
				const userData =  uni.getStorageSync('Message_key')
				console.log(userData)
				if(Object.keys(userData).length){
					this.userInfo = userData
					this.isLoading = false
				}else{
					this.isLoading = true
				}
				if(this.isLoading){
					if(this.$refs.loading){
						this.$refs.loading.open()
					}
				}
				this.getProfileData(userData)
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e){
			if(!this.mytrue){
				this.show1 = true
				return 
			}
			const index = e.index
			if(index == 0){
				// 去掉小红点
				// #ifdef APP-PLUS
				const pages = getCurrentPages()
				const page = pages[pages.length - 1]
				const currentWebView = page.$getAppWebview()
				currentWebView.hideTitleNViewButtonRedDot({
					index
				})
				// #endif
				//消息
				uni.navigateTo({
					url:'Inform/inform'
				})
			}else{
				//设置
				uni.navigateTo({
					url:'Seeting/seeting'
				})
			}
		},
		// #endif
		methods:{
			// 登录网络方法
			getProfileData(userData){
				const token = this.isToken
				getProfileData(token).then(res => {
					if(res.data.code == 200){
						const obj = res.data.data
						obj.avatar = replaceImage(obj.avatar)
						let status = true
						if(Object.keys(userData).length != 0){
							const keys = Object.keys(userData)
							keys.forEach((x,index) => {
								if(userData[keys[index]] != obj[keys[index]]){
									status = false
								}
							})
						}else{
							status = false
						}
						if(!status){
							this.userInfo = obj
							if(this.isLoading){
								if(this.$refs.loading){
									this.$refs.loading.close()
								}
							}
							// 存储缓存
							uni.setStorage({
								key: 'Message_key',
								data: obj,
								success: function () {
									console.log('个人信息写入缓存成功');
								}
							})
							
							// #ifdef APP-PLUS
							// 把头像储存到本地
							const avatar = obj.avatar
									saveFiles(avatar).then(res => {
										if(res.statusCode == 200){
											const path = res.tempFilePath
											uni.saveFile({
												tempFilePath:path,
												success(res2) {
													var savedFilePath = res2.savedFilePath
													// 保存到缓存
													uni.setStorage({
														key:'integrlUrl',
														data:savedFilePath
													})
												},
												fail:(err2)=> {
													plus.nativeUI.toast(err2,{duration:'long'})
												}
											})
										}
									}).catch(err => {
										plus.nativeUI.toast(err,{duration:'long'})
									})
							// #endif
						}
					}
				})
			},
			//点击登录
			loginClick(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//商品收藏
			collectClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyshopMessage/collect'
				})
			},
			//店铺收藏
			attrntionClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyshopMessage/attention'
				})
			},
			//积分商城
			integralShopCick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'../Home/Integral/integralShop'
				})
			},
			//优惠券
			discountsClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'Discounts/mydiscounts'
				})
			},
			//足迹
						footprintClick(){
							if(!this.mytrue){
								this.show1 = true
								return 
							}
							uni.navigateTo({
								url:'Footprint/footprint'
							})
						},
			//我的订单
			myOrderClick(num){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyOrder/myorder?index=' + num
				})
			},
			//退款
			refundClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyBooking/refund/refund'
				})
			},
			//我的拼团
			MybookingClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyBooking/mybooking'
				})
			},
			//商家入驻
			enterClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'Enter/enter'
				})
			},
			//我的地址
			addressClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'address/AllAddress'
				})
			},
			//积分明细
			intrgralDetailClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'../Home/Integral/intrgralDetail'
				})
			},
			//领券中心
			discountscententClick(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'Discounts/DiscpuntsCentent'
				})
			},
			// 我的足迹
			my_zuji(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:''
				})
			},
			// 跳转用户设置
			mySet(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'Mydata/mydata'
				})
			},
			// 分享好友
			shareObj(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				const that = this
				const spread_uid = that.uid
				let shareInfo={
					href:`http://jn.51kdd.com/index.html#/?spread_uid=${spread_uid}`,
					title:'老家商城',
					desc:'快来玩呀',
					imgUrl:'/static/logo/logo.png'
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wechatfriend.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/wechatmoments.png",
						text:"朋友圈"
					},
					{
						icon:"/static/sharemenu/copyurl.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 2:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 3:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			},
			erWeiShare(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'erweimaShare/erweimaShare'
				})
			},
			// 进入我的钱包
			goQianbao(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'MyBalance/MyBalance'
				})
			},
			goQiandao(){
				if(!this.mytrue){
					this.show1 = true
					return 
				}
				uni.navigateTo({
					url:'../Home/qiandao'
				})
			},
			goLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		},
		computed:{
			...mapGetters(['isToken'])
			
		}
		
	}
</script>

<style lang="scss">
	.my-title-background{
		margin-bottom: 20upx;
		background: url(../../static/nologin.png) no-repeat;
		background-size: 100% 50%;
		width: 100%;
	}
	.my-head-image{
		width: 124upx;
		height: 124upx;
		border-radius: 50%;
	}
	.my-one-all{
		border-radius: 14upx;
		padding: 34upx  0 28upx 0;
		color: #686868;
	}
	.my-one-jifen{
		width:169upx;
		height:51upx;
		background:#FBF2F2;
		border-radius:25upx 0upx 0upx 25upx;
		z-index: 1;
		color: #686868;
		font-size: 24upx;
	}
	.my-one-jifen image{
		width:40upx;
		height:40upx;
	}
	.my-two-three-all{
		padding: 10upx 30upx 0 30upx;
	}
	.border-all{
		border-radius: 14upx;
	}
	.height-all{
		height: 80upx;
		padding: 0 38upx;
	}
	.my-image-two-all{
		width: 70upx;
		height: 70upx;
	}
	.my-three-all{
		height: 120upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
	.my-two-bootom{
		padding-bottom: 76upx;
	}
	.Nologin{
		height:280upx;
		width: 100%;
		background: url(../../static/nologin.png) no-repeat;
		background-size: 100% 100%;
		padding-top: 80upx;
		padding-left: 200upx;
	}
	.Nologin-button{
		display: flex;
		align-items: center;
		justify-content: center;
		width:238upx;
		height:70upx;
		background:rgba(255,255,255,1);
		border-radius:35upx;
		color: #CD3233;
		font-size: 32upx;
		font-weight: bold;
	}
	.tixian{
		width: 60upx;
		height: 60upx;
	}
</style>
