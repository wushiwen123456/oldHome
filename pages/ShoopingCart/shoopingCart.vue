<template>
	<mescroll-uni ref='mescroll' @down="downCallback" @up="upCallback"  :up="upOption" :down="downOption">
	<view>
		<view v-for="(vo,key) in shopList" :key="key" v-if="Object.keys(shopList).length" class="bg-white shoopingCart-all con">
			<view class="c-contain" v-if="vo.length">
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
						<view class="shoopingCart-right-guige"><text>{{item.productInfo.attrInfo ? '类型: ' +  item.productInfo.attrInfo.suk : '默认类型'}}</text></view>
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
			您还未登录哦~
		</view>
		<view style="height: 200upx;"></view>
		<view class="shoopingCart-bottom flex justify-between align-center">
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
	</mescroll-uni>
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
	//导入下拉加载
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default{
		components: {
			Modal,
			MescrollUni
		},
		onNavigationBarButtonTap:function(btn){
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
		},
		onLoad() {
			if(!this.isToken){
				uni.showModal({
					title:'您还未登录，是否前去登录？',
					content:'',
					cancelText:'等会再说',
					cancelColor:'#333333',
					confirmText:'去登陆',
					confirmColor:'#333333',
					success:(res) => {
						if(res.confirm){
							uni.navigateTo({
								url:'../login/login'
							})
						}
					}
				})
			}
		},
		onShow() {
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
				shopList:[],
				isManage:true,
				keys:[],
				show1:false,
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

		},
		methods:{
			// 访问网络数据
			getCartData(mescroll){
				getShopCartData(this.isToken).then(res => {
					if(res.data.code == 200){
						const obj =	res.data.data.group
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
							
						}
						if(mescroll){
							mescroll.endErr()
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
			// 进入详情
			goDetail(item){
				if(item){
					const id = item.productInfo.id
					uni.navigateTo({
						url:`../ShopDetails/shopDetails?id=${id}`
					})
				}
			},
			// 下拉刷新方法
			downCallback(mescroll) { 
				this.getCartData(mescroll)
				
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				mescroll.endErr()
			},
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
</style>
