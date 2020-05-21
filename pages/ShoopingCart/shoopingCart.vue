<template>
		<view>
			<view v-if="hasNext">
				<view v-for="(vo,key) in shopList" :key="key" v-if="Object.keys(shopList).length != 0"  class="bg-white shoopingCart-all con">
					<view class="c-contain">
						<view class="store-info">
							<view class="lg shoppingCart-title-yuan" @tap="ShopClick(vo,key)" :class="[isSellectAll(vo,key) ? 'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"></view>
							<view class="storename flex align-center">
								<view class="lg cuIcon-shop shoppingCart-title-shop"></view>
								<view class="text-wuer text-lg text-bold">{{vo[0].shop_info ? vo[0].shop_info.shop_name : '无名小店'}}</view>
							</view>
						</view>
						<view v-for="(item,index) in vo" class="flex align-center margin-top margin-bottom c-item">
							<view class="flex align-center">
								<view @tap="shoponeClick(item)" :class="[item.isClick?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']" class="lg shoppingCart-title-yuan"></view>
								<image class="shoppingCart-image-all" @click="goDetail(item)" :src="item.productInfo.attrInfo ? item.productInfo.attrInfo.image : item.productInfo.image"></image>
							</view>
							<view class="margin-left-sm shoopingCart-right">
								<view class="shoopingCart-right-title"><text class="text-xs shopping-teichang" v-if="false">土特产，没有字段暂时注释</text>{{item.productInfo.store_name}}</view>
								<view class="shoopingCart-right-guige text-cut"><text>{{item.productInfo.attrInfo ? '类型: ' +  item.productInfo.attrInfo.suk : '默认类型'}}</text></view>
								<view class=" flex align-center justify-between">
									<view class="text-price text-red text-lg text-bold">{{item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price}}</view>
									<view class="flex align-center">
										<view  @tap="moveShopClick(key,index,item)" class="lg cuIcon-move shoopingCart-input-add"></view>
										<input :disabled="true"  type="number" v-model="item.cart_num" class="shoopingCart-input"/>
										<view @tap="addShopClick(key,index,item)" class="lg cuIcon-add shoopingCart-input-add"></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="no-token" v-else>
					暂无数据
				</view>
				<view style="height: 200upx;"></view>
				<view class="shoopingCart-bottom flex justify-between align-center" v-if="Object.keys(shopList).length">
					<view @tap="shopAllselectClick" class="flex align-center margin-left">
						<view :class="[allselect?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"  class="lg shoppingCart-title-yuan margin-right-xs"></view>
						<view class="bg-white text-df">{{allselectTxt}}</view>
					</view>
					<view class="flex align-center margin-right" v-if="isManage">
						<view class="text-price text-red text-lg text-bold">{{sumMoney}}</view>
						<view class="shoopingCart-bottom-button shoopingCart-bottom-button-one" @click="goPay">结算</view>
					</view>
					<view class="flex align-center margin-right" v-if="!isManage">
						<view class="shoopingCart-bottom-button remove-btn shoopingCart-bottom-button-one" @click="upModel">删除</view>
					</view>
				</view>
				<Modal v-model="show1" title='是否删除' text='' @confirm="removeProduct" />			
			</view>
			<view v-else class="empty-cart" :style="{height:style.height + 'px'}">
				<image src="/static/gouwuche.png" mode="widthFix"></image>
				<view @click="goHome" v-if="!loginBtn" class="goto-home base-bgc">去逛逛</view>
				<view @click="goLoagin" v-else class="goto-home base-bgc">去登陆</view>
			</view>
			<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
		</view>
		
</template>

<script>
	// 导入网络请求方法：
	import {getShopCartData,removeCart,changeCartNum} from '@/network/shopCart'
	import { getAffirmInfo } from '@/network/affirm'
	// 导入vuex
	import { mapGetters } from 'vuex'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	// 导入模态框
	import Modal from '@/components/x-modal/x-modal'
	import wButton from '@/components/watch-login/watch-button.vue' 
	export default{
		components: {
			Modal,
			wButton
		},
		onNavigationBarButtonTap:function(btn){
			if(this.hasNext){
				if(btn.index == 0){
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				if (!titleObj.buttons) {
				return;
				}
				if(titleObj.buttons[0].text == '管理'){
				titleObj.buttons[0].text = "完成";
				}else{
				titleObj.buttons[0].text = "管理";
				}
				const keys = this.keys
				keys.forEach((item,index) => {
					this.shopList[keys[index]].forEach(x => {
						this.$set(x,'isClick',false)
					})
				})
				currentWebview.setStyle({
				titleNView: titleObj
				});
				// #endif
				}
				this.isManage = !this.isManage
			}
		},
		onLoad() {
			const view = uni.getSystemInfoSync()
			this.style.height = view.windowHeight;
		},
		onShow() {
			if(!this.isToken){
				this.loginBtn = true
				return
			}else{
				this.loginBtn = false
			}
				this.getCartData()
				this.isManage = true
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				let titleObj = currentWebview.getStyle().titleNView;
				if (!titleObj.buttons) {
				return;
				}
				titleObj.buttons[0].text = "管理";
				currentWebview.setStyle({
				titleNView: titleObj
				});
				// #endif
		},
		data(){
			return{
				shopList:{},
				isManage:true,
				keys:[],
				show1:false,
				style:{
					height:''
				},
				loginBtn:false
			}
		},
		computed:{
			...mapGetters(['isToken']),

			// 结算金额(可以优化)
			sumMoney(){
					const obj = this.shopList
					,keys = this.keys
					let totalPrice = 0
					
					keys.forEach((item,index) => {
						totalPrice += obj[keys[index]].filter(x => {
							return x.isClick
						}).reduce((prev,x) => {
							const product = x.productInfo
							if(product.attrInfo){
								return (prev*1 + product.attrInfo.price * x.cart_num)
							}else{
								return (prev*1 + product.price * x.cart_num)
							}
						},0)
					})
					return totalPrice.toFixed(2)
			},
			// 用户选择的商品
			used(){
				const keys = this.keys
				if(keys.length){
					const keys = this.keys
					const arr = []
					keys.forEach((item,index) => {
						 this.shopList[keys[index]].forEach(x => {
							if(x.isClick){
								arr.push(x)
							}
						})
					})
					return arr
				}else{
					return []
				}
			},
			// 全选
			allselect(){
				const keys = this.keys
				if(keys.length){
					return	this.keys.every((x,index) => {
						return this.isSellectAll(this.shopList[this.keys[index]]) 
					})
				}else{
					return false
				}
			},
			allselectTxt(){
				return this.allselect ? '全不选' : '全选'
			},
			hasNext(){
				return Object.keys(this.shopList).length
			}
		},
		methods:{
			// 访问网络数据
			getCartData(){
				getShopCartData(this.isToken).then(res => {
					if(res.data.code == 200){
						const obj =	res.data.data.group
						const arr = []
						if(obj != undefined){
							const result = []
							const keys= Object.keys(obj)
							keys.forEach((x,index) => {
								obj[keys[index]].forEach(x => {
									x.isClick = false
									const product = x.productInfo
									if(product.attrInfo){
										product.attrInfo.image = replaceImage(product.attrInfo.image)
									}
									product.image = replaceImage(product.image)
									if(product.shop_info){
										product.shop_info.shop_logo = replaceImage(product.shop_info.shop_logo)
									}
								})
							})
							this.shopList = obj
							this.keys = keys
						}else{					
							this.shopList = []
						}
						
							
					}
				})
			},
			// 商品是否全选
			isSellectAll(vo,key){
				if(vo){
					return vo.every(x => {
						return x.isClick
					})
				}else{
					return false
				}
			},
			// 去结算
			goPay(){
				// 清除用户拼团的信息
				this.$store.commit('setOutPinkInfo')
				const arr = []
				console.log(this.used)
				arr.push(...this.used.map(x => x.id))
				if(arr.length){	
					// 把购物车id存在vuex中
					this.$store.commit('keepCartId',arr)
						
					uni.navigateTo({
						url:'../ShopDetails/affirm/affirmOrder'
					})
				}else{
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
				}
				
			},
			// 删除商品
			removeProduct(){
				const arr = this.used.map(x => x.id)
				if(arr.length){
					this.removeCart(arr.join(','),this.isToken)
				}
			},
			removeCart(ids,token){
				removeCart(ids,token).then(res => {
					console.log(res)
					if(res.data.code == 200){
						const keys = this.keys
						const list = this.shopList
						keys.forEach((item,index) => {
							const arr = list[keys[index]]
							for(var i = arr.length-1 ; i >=0 ; i--){
								if(arr[i].isClick){
									arr.splice(i,1)
								}
							}
							if(!arr.length){
								delete list[keys[index]]
							}
						})
						this.$set(this,'shopList',list)
						this.keys = Object.keys(list)
						console.log(this.shopList)
						// #ifdef APP-PLUS
						plus.nativeUI.toast("删除成功")
						// #endif
					}
				})
			},
			//点击店铺
			ShopClick(vo,key){
				const status = this.isSellectAll(vo)
				vo.forEach(x => {
					x.isClick = !status
				})
			},
			
			//点击店铺内商品
			shoponeClick(item){
				item.isClick = !item.isClick
			},
			voClick(item){
				const click = item.isClick
				console.log(item)
			},
			//购物车数量增加
			addShopClick(key,index,item){
					item.cart_num ++
				// 修改购物车数量，发起网络请求
				changeCartNum(item.id,item.cart_num,this.isToken)
					.then(res =>{
						if(res.data.code != 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast("您点击的太快了，请稍后重试")
							// #endif
						}else{
							
						}
					})
			},
			upModel(){
				this.show1 = true
			},
			//购物车数量减少
			moveShopClick(key,index,item){
				
				if(item.cart_num>1){
					item.cart_num -- 
					changeCartNum(item.id,item.cart_num,this.isToken)
						.then(res =>{
							if(res.data.code != 200){
								// #ifdef APP-PLUS
								plus.nativeUI.toast("您点击的太快了，请稍后重试")
								// #endif
							}else{
								
							}
						})
				}
			},
			
			//点击全选
			shopAllselectClick(){
				const status = this.allselect
				const length = Object.keys(this.shopList).length
				const keys = this.keys
				if(length){
					if(status){
						keys.forEach((x,index) => {
							this.ShopClick(this.shopList[keys[index]])
						})
					}else{
						keys.forEach((x,index) => {
							if(!this.isSellectAll(this.shopList[keys[index]])){
								this.ShopClick(this.shopList[keys[index]])
							}
						})
					}
				}
			},
			// 进入主页
			goHome(){
				uni.switchTab({
					url:'../Home/home'
				})
			},
			// 去登陆
			goLoagin(){
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			// 进入详情
			goDetail(item){
				if(item){
					const id = item.productInfo.id
					uni.navigateTo({
						url:`../ShopDetails/shopDetails?id=${id}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.header{
		height: 122upx;
		width: 100%;
		padding: 10upx 24upx;
		box-sizing: border-box;
		background: #f9f9f9;
		font-size: 32upx;
		color: #333333;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		position: fixed;
		top: 0px;
		left: 0;
		right: 0;
		z-index: 999;
	}
	page{

	}
	.backDark{
		>view{
			background-color: $uni-color-warning;
			color: #fff;
		}
	}
	.m-btn{
		padding: 10upx 25upx;
		background-color: #cd3233;
		border-radius: 5px;
		color: #fff;
	}
	.shoppingCart-image-all{
		width:188upx;
		height: 188upx;
	}
	.shoppingCart-title-yuan{
		font-size: 40upx;
	}
	.shoppingCart-title-shop{
		font-size: 36upx;
		margin-left: 30upx;
		margin-right: 20upx;
	}
	.shoopingCart-all{
		margin-top: 10upx;
		padding: 26upx 23upx 36upx 24upx;
	}
	.shopping-teichang{
		background: #CD3233;
		color: #FFFFFF;
		border-radius: 24upx;
		padding: 0 10upx;
	}
	.shoopingCart-right{
		flex: 1;
		width: 60%;
		overflow: hidden;
	}
	.shoopingCart-right-title{
		white-space: nowrap;
		overflow:hidden;
		text-overflow:ellipsis; ; 
		font-size: 26upx;
		width: 100%;
	}
	.shoopingCart-right-guige{
		font-size: 22upx;
		color: #999999;
		padding: 30upx 0;
		text{
			background: #F9F9F9;
			padding: 5upx 0;
		}	
		
	}
	.shoopingCart-input{
		width: 50upx;
		height: 40upx;
		text-align: center; 
		background: #EBEBEB; 
		border-radius: 6upx;
		margin: 0 10upx;
		font-size: 22upx;
	}
	.shoopingCart-input-add{
		font-size: 34upx;
		padding: 5upx;
		// border: 1px solid #333;
		margin: 0 10upx;
	}
	.shoopingCart-bottom{
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
		z-index: 99;
		position: fixed;
		bottom: 0;
	}
	.shoopingCart-bottom-button{
		width:192upx;
		height:80upx;
		border-radius:40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		margin-left: 30upx;
	}
	.shoopingCart-bottom-button-one{
		background: #CD3233;
		color: #FFFFFF;
	}
	.shoopingCart-bottom-button-two{
		border: #CD3233 1px solid;
		color: #CD3233;
	}
	
	/* 未登录 */
	.no-token{
		font-size: 36upx;
		color: #7f8c8d;
		text-align: center;
		position: fixed;
		width: 100%;
		top: 500upx;
	}
	.store-info{
		display: flex;
		.storename{
			flex:1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			
		}
	}
	.c-item{
		height: 210upx;
	}
	.remove-btn{
		background-color: #e67e22;
	}
	.empty-cart{
		width: 100%;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		image{
			width: 350upx;
			height: 350upx;
			position: absolute;
			bottom: 46%;
		}
		.goto-home{
			position: absolute;
			bottom: 34%;
			left:50%;
			transform: translateX(-50%);
			color: #fff;
			width: 280upx;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30upx;
			border-radius: 40upx;
		}
	}

</style>
