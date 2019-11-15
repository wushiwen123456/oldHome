<template>
	<view class="bookingMessage">
		<view class="bookingMessage-title">
			<view  v-if="type == 1" class="bookingMessage-title-title">
				<view style="font-size: 40upx;" class="lg text-orange cuIcon-timefill"></view>
				<view class="margin-left-xs margin-right-xs">剩余</view>
				<tui-countdown :time="timeList[0]" colonSize="40" color="#fff" width="44" height="36" size="30" bcolor="#000000" bgcolor="#000000" colonColor="#000000"></tui-countdown>
				<view  class="margin-left-xs margin-right-xs">结束</view>
			</view>
			<view v-if="type == 0" class="bookingMessage-success"><view class="tui-icon tui-icon-circle-fill bookingMessage-title-success" >拼团成功</view></view> 
			<view class="bookingMessage-title-headimg">
				<view class="bookingMessage-title-left">
					<view class="bookingMessage-head-text">团长</view>
					<image class="bookingMessage-title-headimgone" src="../../../static/demo3.png"></image>
				</view>
				<image v-if="type == 1" class="bookingMessage-title-headimgtwo" src="../../../static/denfairen.png"></image>
				<image v-if="type == 0" class="bookingMessage-title-headimgtwo" src="../../../static/demo3.png"></image>
			</view>
			<view  v-if="type == 1" class="bookingMessage-title-onetxt">还差<span style="color: #fe4d3d;">1</span>人，赶快邀请好友来拼团吧</view>
			<button  v-if="type == 1" @tap="popup" class="bookingMessage-title-button">邀请好友拼团</button>
			<button  v-if="type == 0" @tap="homeClick" class="bookingMessage-title-button">去首页逛逛</button>
			<view v-if="type == 0" style="height: 80upx;"></view>
			<view  v-if="type ==  1" class="bookingMessage-title-twotxt">拼团规则：好友拼团，人满发货，人不满退款</view>
			<view @tap="homeClick"  class="bookingMessage-title-twotxt">回到首页</view>
		</view>
		
		<view class="bookingMessage-bottom">
			<view class="bookingMessage-bottom-title">
				<image src="../../../static/demo4.png"></image>
				<view class="bookingMessage-bottom-txt">沃隆每日坚果750g混合装30包干果零食...</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	export default {
		components:{
			tuiCountdown
		},
		data() {
			return {
				timeList: [1000, 2000, 3000, 19, 240000],//倒计时
				type:1,// 0参团 , 1拼团
				shoplist:'',//拼团商品
				shoplistimg:'',//拼团用户信息
				joinbookimg:'',//参团信息
				popupShow: false,
				pink_id:'',//订单id
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				shareList:[{
					img:'../../../static/image/share_weixin.png',
					name:'微信好友'
				},{
					img:'../../../static/image/friend.png',
					name:'朋友圈'
				},{
					img:'../../../static/image/share_qq.png',
					name:'QQ'
				},{
					img:'../../../static/image/share_weibo.png',
					name:'微博'
				}],
			}
		}, 
		onLoad(e) {
			this.pink_id = e.pink_id
			this.booking();
		},
		onShow(){
			
		},
		methods: {
			//判断是参团还是开团
			booking(){
				
				
			},
			popup: function() {
				
			},
			//回到首页
			homeClick(){
				
			},
			
			shareShowclose(){
				
			},
		}
	}
</script>

<style>
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
	.bookingMessage-title-headimgone{
		border-radius: 50%;
		height: 96upx;
		width: 96upx;
		margin-left: 10upx;
		margin-top: 10upx;
		border: #ff8625 2upx solid;
	}
	.bookingMessage-title-headimgtwo{
		border-radius: 50%;
		height: 96upx;
		width: 96upx;
		margin-left: 60upx;
		margin-top: 10upx;
		border: #FFFFFF 2upx solid;
	}
	.bookingMessage-title-left{
		height: 106upx;
	}
	.bookingMessage-head-text{
		z-index: 99;
		position: fixed;
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
</style>
