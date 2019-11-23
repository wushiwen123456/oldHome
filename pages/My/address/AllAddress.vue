<template>
	<view class="AllAddress-all">
		<view v-if="nodata" :style="{ height: windowHeight + 'px'}" class="NoData" >
			<image src="../../../static/morendizhi.png"></image>
		</view>
		<view v-else >
			<view class="shippingaddress-main" v-for="(item,index) in addressList" :key="index">
				<view class="flex shippingaddress-main-nickname">
					<view>{{item.real_name}}</view>
					<view class="shippingaddress-main-phone">{{item.phone}}</view>
				</view>
				<view class="shippingaddress-main-address">{{item.detail}}</view>
				<view class="flex justify-between align-center">
					<view class="flex align-center">
						<view @click="isSetDefaultAddress(item.is_default,item.id,item)" style="font-size: 36upx;" class="lg text-gray cuIcon-roundcheckfill" :class="{defalutIndex : parseInt(item.is_default) === 1 }"></view>
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
	
	import { mapGetters } from 'vuex'
	
	// 获取用户所有地址方法
	import {getProfileAllAddress,setDefaultAddress} from '@/network/getProfileData'
	export default{
		components:{
			Modal
		},
		data(){
			return{
				show: false,//弹窗打开隐藏
				nodata:false,//暂无数据
				windowHeight:652,//屏幕高度
				addressList:[]
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
			if(this.isToken){
				// 获取用户所有收货地址
				this.userAddressList(this.isToken)
			}
			else{
				uni.navigateTo({
					url:"../../login/login"
				})
			}
		},
		computed:{
			...mapGetters(['isToken'])
		},
		methods:{
			//获取用户所有地址
			userAddressList(token){
				getProfileAllAddress(token)
					.then(res => {
						if(res.data.code == 200){
							this.addressList = res.data.data
							if(res.data.data == 0) this.nodata = true
						}
					})
			},
			
			
			// 设置默认收货地址
			isSetDefaultAddress(isDefalut,id,item){
				const val = parseInt(isDefalut)
				const that = this
				if(val != 1){
					uni.showModal({
						title:'是否设置为默认收货地址？',
						content:'',
						cancelText:"我再想想",
						cancelColor:'#333333',
						confirmColor:'#333333',
						confirmText:'确定',
						success(res) {
							if(res.confirm){
								that.setDefaultAddress(id,that.isToken,item)
							}
						}
						
					})
				}
			},
			// 设置用户的默认地址
			setDefaultAddress(id,token,item){
				setDefaultAddress(id,token)
				.then(res => {
					if(res.data.code == 200){
						uni.showToast({
							title:"设置成功",
							icon:'none'
						})
						// 全部地址为不默认
						this.allAddressNot(this.addressList)
						
						item.is_default = 1
					}
				})
			},
			//新增地址
			addAddressClick(){
				uni.navigateTo({
					url:'addAddress'
				})
			},
			allAddressNot(list){
				list.forEach(x => {
					x.is_default = 0
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
	.defalutIndex::before{
		color:rgb(229,77,66);	
	}
</style>
