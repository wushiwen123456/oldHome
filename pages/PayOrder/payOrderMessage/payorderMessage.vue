<template>
 <mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
	<view class="bookingMessage" v-if="pinkInfo.length">
		<view class="bookingMessage-title">
			<view class="bookingMessage-title-title" v-if="pinkInfo.length < pinkInfo[0].people">
				<view style="font-size: 40upx;" class="lg text-orange cuIcon-timefill"></view>
				<view class="margin-left-xs margin-right-xs">剩余</view>
				<tui-countdown :time="dealTime()"  :colonSize="40" color="#fff" :width="44" :height="36" :size="30" bcolor="#000000" bgcolor="#000000" colonColor="#000000"></tui-countdown>
				<view  class="margin-left-xs margin-right-xs">结束</view>
			</view>
			<view class="bookingMessage-success"><view class="tui-icon tui-icon-circle-fill bookingMessage-title-success" >{{detltopText()}}</view></view> 
			<view class="booking-contain">
				<view v-for="(item,index) in pinkInfo[0].people" :key='index' class="booking-item">
					<view class="bookingMessage-title-left" v-if="index < pinkInfo.length">
						<view v-if="pinkInfo[index].k_id == 0" class="bookingMessage-head-text">团长</view>
						<image class="bookingMessage-title-headimgone" :src="pinkInfo[index].userInfo.avatar"></image>
					</view>
					<view v-if="index >= pinkInfo.length" class="booking-item" @tap="popup">
						<image src="../../../static/denfairen.png"></image>
					</view>
				</view>
			</view>
			<view v-if="pinkInfo.length < pinkInfo[0].people">
				<view   class="bookingMessage-title-onetxt">还差<text style="color: #fe4d3d;">{{pinkInfo[0].people - pinkInfo.length}}</text>人，赶快邀请好友来拼团吧</view>
				<button @tap="popup" class="bookingMessage-title-button">{{'邀请好友拼团'}}</button>
			</view>
			<view v-if="pinkInfo.length == pinkInfo[0].people" class="seccess-pink">拼团成功</view>
			<view style="height: 80upx;"></view>
			<view class="bookingMessage-title-twotxt">拼团规则：好友拼团，人满发货，人不满退款</view>
			<view @tap="homeClick"  class="bookingMessage-title-twotxt">回到首页</view>
		</view>
		
		<view class="bookingMessage-bottom">
			<view class="c-title"><text>推 荐 商 品</text></view>
			<view class="bookingMessage-bottom-title" v-for="(item,index) in recommendGoods" @click="goDetail(item)">
				<image :src="item.image"></image>
				<view class="bookingMessage-bottom-txt">{{item.store_name}}</view>
			</view>
		</view>
	</view>
	</mescroll-uni>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	// 下拉刷新
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	
	import { getUserPink } from '@/network/pink'
	
	import { getPinkStatus } from '@/network/affirm'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	// #ifdef APP-PLUS
	// 导入分享方法
	import share from "@/common/share.js";
	// #endif
	
	export default {
		components:{
			tuiCountdown,
			MescrollUni
		},
		data() {
			return {
				id:'',
				timeList: [1000, 2000, 3000, 19, 240000],//倒计时
				type:1,// 0参团 , 1开团
				popupShow: false,
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				shareList:[{
						icon:"/static/sharemenu/wechatfriend.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/wechatmoments.png",
						text:"朋友圈"
					},{
					icon:"/static/sharemenu/copyurl.png",
					text:"复制"
				},
				{
					icon:"/static/sharemenu/more.png",
					text:"更多"
				}],
				token:'',
				order:'',
				pinkInfo:[],
				recommendGoods:[],
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
					},
					
					
					Linder:{}
				},
			}
		}, 
		onLoad(e) {
			this.token = this.$store.getters.isToken
			this.order = this.$store.state.orderKey
			console.log(this.token)
			console.log(this.order)
		},
		onReady() {
			const mescroll = this.$refs.mescroll.mescroll
			this.getPinkInfo(mescroll)
		},
		onShow(){
			
		},
		methods: {
			popup() {
				
				// 邀请好友拼团
				if(this.pinkInfo.length < this.pinkInfo[0].people){
					
					let shareInfo={
						href:"https://uniapp.dcloud.io",
						title:'老家商城',
						desc:'我正在老家商城发起拼团，敢来和我一起拼么',
						imgUrl:'/static/56524a9a3b6bdab0753eb8ed922d57d.png'
					};
					this.shareObj=share(shareInfo,this.shareList,(index) => {
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
				}else{
					uni.navigateTo({
						url:''
					})
				}
				
				
				
			},
			// 获取拼团信息
			getPinkInfo(mescroll){
				const uni = this.order
				const token = this.token
				console.log(uni)
				console.log(token)
				getPinkStatus(uni,token).then(res => {
					if(res.data.code == 200){
						let arr = res.data.data.list
						console.log(arr)
						let recommendGoods = res.data.data.goodsList
						this.type = arr.length == 1 ? 1 : 0
						arr.forEach(x =>{
							x.userInfo.avatar = replaceImage(x.userInfo.avatar)
						})
						// 判断谁是团长
						this.dealTuan(arr)
						this.pinkInfo = arr
						this.dealTitle()
						recommendGoods.forEach(x => {
							x.image = replaceImage(x.image)
						})
						
						this.recommendGoods = recommendGoods
						mescroll.endErr()
					}
				})
			},
			//回到首页
			homeClick(){
				uni.switchTab({
					url:'../../Home/home'
				})
			},
			// 判断谁是团长
			dealTuan(arr){
				arr.forEach(x => {
					if(x.k_id == 0){
						this.Linder = x
					}
				})
			},
			shareShowclose(){
				
			},
			// 处理时间方法(功能暂未实现)
			dealTime(){
				if(this.pinkInfo){
					const time = Math.round(new Date().getTime()/1000)
					// console.log(this.pinkInfo[0].stop_time - time) 
					console.log(new Date(1575873765*1000))
					return 123
				}
				// return 21212
			},
			dealTitle(){
				uni.setNavigationBarTitle({
					title:this.type == 1 ? '开团成功' : '拼团成功'
				})
			},
			goMyPicking(){
				uni.navigateTo({
					url:'../../My/MyBooking/mybooking'
				})
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				this.getPinkInfo(this.order,this.token,mescroll)
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				mescroll.endErr()
			},
			detltopText(){
				if(this.pinkInfo.length != 0){
					if(this.pinkInfo.length == this.pinkInfo[0].people){
						return '拼团成功'
					}else{
						if(this.type == 1){
							return '正在开团中...'
						}else{
							const name = this.Linder.userInfo.nickname
							return `正在参加${name}的团`
						}
					}
				}
			},
			goDetail(item){
				const id = item.id
				uni.navigateTo({
					url:`../../ShopDetails/shopDetails?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 隐藏scroll-view滚动条*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	.bookingMessage-title{
		background: #FFFFFF;
	}
	.bookingMessage-title-title{
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		font-size: 24upx;
	}
	.bookingMessage-title-headimg{
		display: flex;
		justify-content: center;
		margin-top: 46upx;
		
	}
	.bookingMessage-title-left{
		height: 96upx;
		position: relative;
		border-radius: 50%;
		height: 96upx;
		width: 96upx;
		border: #FFFFFF 2upx solid;
		margin-right: 20upx;
		.bookingMessage-title-headimgone{
			width: 100%;
			height: 100%;
		}
	}
	.bookingMessage-head-text{
		z-index: 99;
		position: absolute;
		width: 68upx;
		height: 36upx;
		background-color: #ff8625;
		border-radius: 20upx;
		border: solid 2upx #ffffff;
		color: #fefefe;
		font-size: 22upx;
		text-align: center;
		line-height: 36upx;
	}
	.bookingMessage-title-onetxt{
		text-align: center;
		color: #333333;
		margin-top: 42upx;
		margin-bottom: 32upx;
		font-size: 34upx;
	}
	.bookingMessage-title-button{
		width: 660upx;
		height: 92upx;
		background-color: #CD3233;
		margin-top: 80upx;
		border-radius: 46upx;
		color: #FFFFFF;
		font-size: 34upx;
		line-height: 92upx;
	}
	.bookingMessage-title-twotxt{
		color: #999999;
		font-size: 28upx;
		text-align: center;
		padding: 22upx 0 34upx 0;
	}
	.bookingMessage-bottom{
		margin-top: 20upx;
		background: #FFFFFF;
		padding: 30upx 24upx;
	}
	.bookingMessage-bottom image{
		width: 120upx;
		height: 120upx;
	}
	.bookingMessage-bottom-title{
		display: flex;
		background: #f8f8f8;
		margin-bottom: 30upx;
	}
	.bookingMessage-bottom-txt{
		max-width: 500upx;
		margin-top: 30upx;
		margin-left: 40upx;
		font-size:30upx;
		color: #333333;
	}
	.bookingMessage-bottom-bootemom{
		display: flex;
		justify-content: space-between;
		font-size: 24upx;
		padding-top: 28upx;
		border-top: #f3f3f3 2upx solid;
	}
	.bookingMessage-success{
		text-align: center;
		padding: 25upx 0;
	}
	.bookingMessage-title-success{
		color:#1ecd16;
		font-size:30upx;
	}
	.tui-share {
		background: #FFFFFF;
		margin-top: 40upx;
		padding-bottom: 36upx;
		border-bottom: #ededed 2upx solid;
		position: relative;
		display: flex;
		justify-content: space-around;
	}
	.bookingMessage-all{
		color: #999999;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.bookingMessage-all image{
		margin-bottom: 24upx;
		width: 78upx;
		height: 78upx;
	}
	.popu-button{
		background: #FFFFFF;
		color: #333333;
		font-size: 34upx;
	}
	.hideCanvasView {
		position: relative;
	}
	
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
	
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	
	.backgroundColor-white {
		background-color: white;
	}
	
	.border_radius_10px {
		border-radius: 10px;
	}
	
	.padding1vh {
		padding: 1vh;
	}
	
	.posterImage {
		width: 60vw;
	}
	
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	
	.marginTop2vh {
		margin-top: 2vh;
	}
	.booking-contain{
		padding:0 45upx ;
		width: 100%;
		height: 120upx;
		box-sizing: border-box;
		display: flex;
		justify-content:center;
		align-items: center;
		image{
			width: 100%;
			height: 100%;
		}
		.booking-item{
			border-radius: 50%;
			height: 96upx;
			width: 96upx;
			border: #FFFFFF 2upx solid;
			margin-right: 20upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.seccess-pink{
		text-align: center;
		padding: 25upx 0;
		color:#1ecd16;
		font-size:30upx;
	}
	.c-title{
		padding: 25upx 15upx;
		font-size: 34upx;
		text-align: center;
		color: $uni-text-color;
	}
</style>
