<template>
	<view>
	<view>
		<tui-tabs :tabs="tabs2" :currentTab="currentTab"  selectedColor="#CD3233" sliderBgColor="#CD3233" @change="change"></tui-tabs>
		<view v-if="hasNext && isLoading">
			<view v-for="(vo,key) in shopList" :key="key" class="bg-white margin-top-sm">
				
				<view class="flex align-center  padding-left padding-top-sm padding-bottom-sm s-content">
					<view class="s-item1">
						<view style="font-size: 36upx;" class="lg cuIcon-shop margin-right-sm"></view>
						<view class="text-sm" style="color: #636362;">{{vo.shopInfo ? vo.shopInfo.shop_name : ''}}</view>
					</view>
					<view class="s-status">{{vo._status ? vo._status._msg : ''}}</view>
				</view>
				<block v-for="(item,indexKey) in vo.cartInfo" :key="indexKey" @click="goPinkDetail(vo)">
					<view  class="flex align-start margin-left margin-right">
						<view class="mybooking-image" @tap.stop="goBooking(item,indexKey)">
							<image :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
						</view>
						<view class="text-width margin-left-sm ">
							<view class="flex align-center justify-between">
								<view class="flex-five text-hieed" @tap.stop="goBooking(item,indexKey)">{{item.productInfo.store_name}}</view>
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
						<!-- <image class="mybooking-haming"  src="../../../static/demo3.png" ></image>
						<image class="mybooking-haming"  src="../../../static/demo3.png" ></image> -->
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
						<button @click="btnLeft(vo,key)" v-if="textLeft(vo)"  class="mybooking-button mybooking-button-colse">{{textLeft(vo)}}</button>
						<button @click="btnRight(vo,key)" v-if="textRight(vo)" class="mybooking-button ">{{textRight(vo)}}</button>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!hasNext && isLoading" class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
			<image src="/static/nodatab.png" mode="widthFix"></image>
		</view>
		<view v-if="!isLoading" class="loading">
			<image src="/static/logo/logo.png" class="load-img" mode=""></image>
		</view>
	</view>
	<Modal v-model="show1" title='提示' text='是否删除订单' @confirm="removeOrder" />
	<Modal v-model="show2" title='提示' text='是否取消拼团' @confirm="cancelOrder" />
	
	</view>
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
	
	// 导入分享方法
	import share from "@/common/share.js";
	
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
				isLoading:false,
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
				status:{},
				clickIndex:-1,
				hasNext:false,
				token:'',
				style:{
					height:''
				}
			}
		},
		onLoad() {
			this.token = this.$store.getters.isToken
			this.myPooking()
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			
		},
		methods:{
			//导航切换
			change(e) {
				this.currentTab = e.index
				// const mescroll = this.$refs.mescroll.mescroll
				this.myPooking()
			},
			// 访问网咯获取数据
			myPooking(){
				const token = this.token
				const currentTab = this.currentTab
				this.isLoading = false
				myPooking(currentTab,token).then(res => {
					this.isLoading = true
					if(res.data.code == 200){
						// 对图片进行处理
						let list = res.data.data
						if(list.length == 0){
							this.hasNext = false
						}else{
							this.hasNext = true
							list = this.dealImage(list)
							this.shopList = list
						}
						console.log(this.hasNext)
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
						return '查看订单'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '查看详情'
						}else{
							return '查看订单'
						}
					}else if(vo._status._type == 2){
						return '查看订单'
					}else{
						return '查看详情'
					}
				}
			},
			textRight(vo){
				if(vo._status){
					if(vo._status._type == -1){
						return '重新拼团'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '邀请好友'
						}else{
							return '查看详情'
						}
					}else if(vo._status._type == 2){
						return ''
					}else{
						return '重新拼团'
					}
					
				}
			},
			// 订单底部状态
			bStatus(vo){
				if(vo._status){
					if(vo._status._type == -1){
						return '退款中'
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							return '拼团中'
						}else{
							return '拼团成功'
						}
					}else if(vo._status._type == 4){
						return '拼团成功'
					}else if(vo._status._type == -2){
						return '退款完成'
					}else if(vo._status._type == 6){
						return '拼团失败'
					}else if(vo._status._type == 2){
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
						  this.goPinkDetail(vo)
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							 this.goPinkDetail(vo)
						}else{
							 this.goInDetail(vo)
						}
					}else if(vo._status._type == -2){
						this.goPinkDetail(vo)
					}else if(vo._status._type == 2){
						this.goInDetail(vo)
					}
					else{
						this.goPinkDetail(vo)
					}
				}
			},
			// 右边按钮
			btnRight(vo,index){
				if(vo._status){
					if(vo._status._type == -1){
						 this.goBooking(vo.cartInfo[0])//重新拼团
					}else if(vo._status._type == 1){
						if(vo._status._title == '拼团中'){
							 this.shareF(vo)//邀请好友
						}else{
							this.goPinkDetail(vo)//查看进度
						}
					}else{
						 this.goBooking(vo.cartInfo[0])
					}
				}
			},
			shareF(vo){
				const image = vo.cartInfo[0].productInfo.image
				// 邀请好友拼团					
					let shareInfo={
						href:"http://jn.51kdd.com/index.html#/",
						title:'老家商城',
						desc:'我正在老家商城发起拼团，敢来和我一起拼么',
						imgUrl:image
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
								uni.hideLoading()
							},
							fail:(err)=>{
								console.log("fail:" + JSON.stringify(err));
								uni.hideLoading()
							}
						};
						switch (index) {
							case 0:
								shareObj.provider="weixin";
								shareObj.scene="WXSceneSession";
								shareObj.type=0;
								shareObj.imageUrl=shareInfo.imgUrl||"";
								uni.showLoading({
									title:'加载中...',
									mask:true
								})
								uni.share(shareObj);
								break;
							case 1:
								shareObj.provider="weixin";
								shareObj.scene="WXSenceTimeline";
								shareObj.type=0;
								shareObj.imageUrl=shareInfo.imgUrl||"";
								uni.showLoading({
									title:'加载中...',
									mask:true
								})
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
				this.$store.commit('setOrderKey',vo.order_id)
				const status = vo._status._type
				if(status == -1 || status == -2 || status == 6){
					uni.navigateTo({
						url:'/pages/My/MyBooking/refund/refundMessage'
					})
				}else{
					uni.navigateTo({
						url:'/pages/My/MyOrder/orderdetail'
					})
				}
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
			},
			goBooking(item){
				this.$store.commit('setcombinId',item.productInfo.id)
				uni.navigateTo({
					url:"../../ShopDetails/groubBooking"
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
			justify-content: space-between;
			.mybooking-button{
				margin-left: 15upx;
			}
		}
		.status{
			color: #CD3233;
		}
	}	

</style>
