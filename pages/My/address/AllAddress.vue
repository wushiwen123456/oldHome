<template>
	<view class="AllAddress-all">
		<view v-if="nodata">
			<view class="shippingaddress-main" v-for="(item,index) in addressList" :key="index">
				<view class="flex shippingaddress-main-nickname">
					<view>{{item.real_name}}</view>
					<view class="shippingaddress-main-phone">{{item.phone}}</view>
				</view>
				<view class="shippingaddress-main-address">{{item.province}} {{item.city}} {{item.district}} </view>
				<view class="shippingaddress-main-address">{{item.detail}}</view>
				<view class="flex justify-between align-center">
					<view class="flex align-center" @click="setD(index)" >
						<view  style="font-size: 36upx;" class="lg text-gray cuIcon-roundcheckfill" :class="{defalutIndex : parseInt(item.is_default) === 1 }"></view>
						<view class="shippingaddress-bottom-text">设为默认地址</view>
					</view>
					<view class="flex align-center shippingaddress-main-buttom-caoz">
						<view @tap="editClick(item)" class="flex align-center">
							<image class="shippingaddress-main-oneimg" src="../../../static/edit.png"></image>
							<view>编辑</view>
						</view>
						<view @tap="delClick(index)" class="flex align-center">
							<view style="font-size: 34upx;" class="lg text-gray cuIcon-delete margin-left-xl margin-right-xs"></view>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-else class="empty-img" :style="{height:style.height + 'px',transform:'translateY(-10%)'}">
			<image src="/static/morendizhi.png" mode="widthFix"></image>
		</view>
		<Modal v-model="show" title='提示' text='确定要删除这个地址吗' @confirm="delAddressClcik" />
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		<Modal v-model="show1" title='提示' text='是否设置为默认地址' @confirm="setDClick" />
	</view>
</template>

<script>
	import Modal from '@/components/x-modal/x-modal'
	
	import { mapGetters } from 'vuex'
	
	// 获取用户所有地址方法,删除地址方法
	import {getProfileAllAddress,setDefaultAddress,removeAddress} from '@/network/getProfileData'
	export default{
		components:{
			Modal
		},
		data(){
			return{
				show: false,//弹窗打开隐藏
				windowHeight:652,//屏幕高度
				addressList:[],
				removeIndex:'',
				show1:false,
				currentIndex:0,
				key:-1,//设为默认地址的数据下标
				style:{
					height:''
				},
			}
		},
		onNavigationBarButtonTap() {
			this.$store.commit('emptyAddress')
			this.addAddressClick()//新增加地址
		},
		onLoad() {
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
			var that = this
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
		onReady() {
			this.$refs.loading.open()
		},
		computed:{
			...mapGetters(['isToken']),
			nodata(){
				return this.addressList.length
			}
		},
		methods:{
			//获取用户所有地址
			userAddressList(token){
				getProfileAllAddress(token)
					.then(res => {
						this.$refs.loading.close()
						if(res.data.code == 200){
							this.addressList = res.data.data			
							this.currentIndex = this.addressList.every(x => {
								return parseInt(x.is_default)
							})
						}
					})
			},
			// 设置默认地址()
			setD(key){
				this.show1 = true
				this.key = key
				// this.currentIndex = 
				// if(e.confirm){
				// 	that.setDefaultAddress(this.currentIndex)
				// }
				// console.log()
			},
			setDClick(){
				this.setDefaultAddress()
			},
			// 设置默认收货地址
			isSetDefaultAddress(isDefalut,id,item){
				const val = parseInt(isDefalut)
				const that = this
			},
			// 设置用户的默认地址
			setDefaultAddress(){
				console.log(this.addressList)
				let id = this.addressList[this.key].id
				// const obj = this.userAddressList[this.currentIndex]
				setDefaultAddress(id,this.isToken)
				.then(res => {
					if(res.data.code == 200){
						uni.showToast({
							title:"设置成功",
							icon:'none'
						})
						// 全部地址为不默认
						this.allAddressNot(this.addressList)
						
						this.addressList[this.key].is_default = 1
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
			delClick(index){
				this.show = true
				this.removeIndex = index
			},
			//确认删除
			delAddressClcik(){
				console.log(this.removeIndex)
				removeAddress(this.addressList[this.removeIndex].id,this.isToken)
					.then(res => {
						if(res.data.code == 200){
							this.addressList.splice(this.removeIndex,1)
						}
					})
			},
			show6() {
				
			},
			hide6() {
				this.modal6= false
			},
			handleClick6(e) {
				
			},
			
			//编辑
			editClick(item){
				this.$store.commit('setAddress',item)
				uni.navigateTo({
					url:"addAddress"
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
