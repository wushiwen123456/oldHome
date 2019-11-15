<template>
	<view class="AllAddress-all">
		<view v-if="nodata" :style="{ height: windowHeight + 'px'}" class="NoData" >
			<image src="../../../static/morendizhi.png"></image>
		</view>
		<view v-else >
			<view class="shippingaddress-main">
				<view class="flex shippingaddress-main-nickname">
					<view>王开心</view>
					<view class="shippingaddress-main-phone">15729284038</view>
				</view>
				<view class="shippingaddress-main-address">河南省郑州市管城回族区金城国贸1902</view>
				<view class="flex justify-between align-center">
					<view @tap="selsctClick()" class="flex align-center">
						<view style="font-size: 36upx;" class="lg text-gray cuIcon-roundcheckfill"></view>
						<view class="shippingaddress-bottom-text">设为默认地址</view>
					</view>
					<view class="flex align-center shippingaddress-main-buttom-caoz">
						<view @tap="editClick()" class="flex align-center">
							<image class="shippingaddress-main-oneimg" src="../../../static/edit.png"></image>
							<view>编辑</view>
						</view>
						<view @tap="delClick()" class="flex align-center">
							<view style="font-size: 34upx;" class="lg text-gray cuIcon-delete margin-left-xl margin-right-xs"></view>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Modal v-model="show" title='提示' text='确定要删除这个地址吗' @confirm="delAddressClcik" />
	</view>
</template>

<script>
	import Modal from '@/components/x-modal/x-modal'
	export default{
		components:{
			Modal
		},
		data(){
			return{
				show: false,//弹窗打开隐藏
				nodata:false,//暂无数据
				windowHeight:652,//屏幕高度
			}
		},
		onNavigationBarButtonTap() {
			this.addAddressClick()//新增加地址
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
		onShow() {
			this.userAddressList()
		},
		methods:{
			//获取用户所有地址
			userAddressList(){
				
			},
			//选择默认地址
			selsctClick(key,id){
				
				
			},
			//新增地址
			addAddressClick(){
				uni.navigateTo({
					url:'addAddress'
				})
			},
			//删除
			delClick(id,key){
				this.show = true
			},
			//确认删除
			delAddressClcik(){
				
			},
			show6() {
				
			},
			hide6() {
				this.modal6= false
			},
			handleClick6(e) {
				
			},
			
			//编辑
			editClick(){
				uni.navigateTo({
					url:'addAddress'
				})
			},
		}
	}
</script>

<style>
	.NoData{
		padding-top: 266upx;
		color: #999999;
		font-size: 30upx;
		text-align: center;
		background: #FFFFFF;
		/* min-height: 100vh; */
	}
	.NoData image{
		width: 100%;
		height: 500upx;
	}
	.shippingaddress-main{
		background: #FFFFFF;
		border-radius: 6upx;
		margin: 18upx 24upx 0 24upx;
		padding: 36upx 23upx 26upx 26upx;
	}
	.shippingaddress-main-nickname{
		font-size: 30upx;
		align-items: center;
		color: #333333;
	}
	.shippingaddress-main-phone{
		margin-left: 20upx;
	}
	.shippingaddress-main-address{
		color: #525253;
		font-size: 24upx;
		margin-top: 20upx;
		padding-bottom: 38upx;
		margin-bottom: 20upx;
		border-bottom: #f3f3f3 2upx solid;
	}
	.shippingaddress-bottom-text{
		color: #666666;
		font-size: 26upx;
		margin-left: 10upx;
	}
	.shippingaddress-main-buttom-caoz{
		color:#999999;
		font-size: 26upx;
	}
	.shippingaddress-main-oneimg{
		height: 30upx;
		width: 30upx;
		margin-right: 20upx;
	}
	.shippingaddress-main-twoimg{
		margin-left: 66upx;
		margin-right: 20upx;
		height: 30upx;
		width: 30upx;
	}
	.selectcolor{
		color:#06b582;
		font-size:40upx
	}
	.noselectcolor{
		color:#e8e8e8;
		font-size:40upx
	}
	
</style>
