<template>
	<view>
		<view v-for="(vo,key) in shopList" :key="key" v-if="isToken" class="bg-white shoopingCart-all con">
			<view class="flex align-center">
				<view class="lg shoppingCart-title-yuan" @tap="ShopClick(vo,key)" :class="[isSellectAll(vo,key) ? 'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"></view>
				<view class=" flex align-center">
					<view class="lg cuIcon-shop shoppingCart-title-shop"></view>
					<view class="text-wuer text-lg text-bold">店铺1</view>
				</view>
			</view>
			<view v-for="(item,index) in vo.shopAllMessage" :key="index" class="flex align-center margin-top margin-bottom">
				<view class="flex align-center">
					<view @tap="shoponeClick(key,index,item)" :class="[item.type?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']" class="lg shoppingCart-title-yuan"></view>
					<image class="shoppingCart-image-all" :src="item.image"></image>
				</view>
				<view class="margin-left-sm shoopingCart-right">
					<view class="shoopingCart-right-title"><text class="text-xs shopping-teichang">江西特产</text>{{item.shoptitle}}</view>
					<view class="shoopingCart-right-guige">{{item.specification || '默认'}}</view>
					<view class=" flex align-center justify-between">
						<view class="text-price text-red text-lg text-bold">{{item.money}}</view>
						<view class="flex align-center">
							<view  @tap="moveShopClick(key,index,item)" class="lg cuIcon-move shoopingCart-input-add"></view>
							<input :disabled="false"  type="number" v-model="item.num" class="shoopingCart-input"/>
							<view @tap="addShopClick(key,index,item)" class="lg cuIcon-add shoopingCart-input-add"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-token" v-else>
			您还未登录哦~
		</view>
		<view style="height: 100upx;"></view>
		<view class="shoopingCart-bottom flex justify-between align-center">
			<view @tap="shopAllselectClick" class="flex align-center margin-left">
				<view :class="[allselect?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"  class="lg shoppingCart-title-yuan margin-right-xs"></view>
				<view class="bg-white text-df">{{allselectTxt}}</view>
			</view>
			<view class="flex align-center margin-right" v-show="isShowToPay">
				<view class="text-price text-red text-lg text-bold">{{sumMoney}}</view>
				<view class="shoopingCart-bottom-button shoopingCart-bottom-button-one" @click="goPay">结算</view>
				<!-- <view class="shoopingCart-bottom-button shoopingCart-bottom-button-two">删除</view> -->
			</view>
			<view class="flex align-center margin-right" v-show="!isShowToPay">
				<view class="shoopingCart-bottom-button shoopingCart-bottom-button-one" @click="removeProduct">删除</view>
				<!-- <view class="shoopingCart-bottom-button shoopingCart-bottom-button-two">删除</view> -->
			</view>
		</view>
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
	export default{
		components: {
			
		},
		onNavigationBarButtonTap(){
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					// #ifdef APP-PLUS
					let currentWebview = page.$getAppWebview();
					let titleObj = currentWebview.getStyle().titleNView;
					if (!titleObj.buttons) {
						return;
					}
					if(titleObj.buttons[0].text == "管理"){
						titleObj.buttons[0].text = "完成"
						
					}else{
						titleObj.buttons[0].text = "管理"
					}
					this.isManage = !this.isManage
					this.shopList.forEach((item,index) => {
						item.shopAllMessage.forEach(x => {
							x.type = false
						})
					})
					currentWebview.setStyle({
						titleNView: titleObj
					});
					// #endif 
		},
		onShow() {
			console.log(1)
			this.isManage = false
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
			}else{
				getShopCartData(this.isToken).then(res => {
					if(res.data.code == 200){
						const arr =	res.data.data.group
						const result = []
						
						for (let key in arr){
							const obj = {}
							obj.shopname = arr[key][0].shop_info.shop_name
							obj.shopAllMessage = []
							obj.shopType = false, 
							arr[key].forEach(item =>{
								const image = replaceImage(item.productInfo.image)
								obj.shopAllMessage.push({
									// 对数据进行保存
									shoptitle:item.productInfo.store_name, //商品名称
									specification:item.productInfo.attrInfo ? item.productInfo.attrInfo.suk : "", //商品种类
									money:item.productInfo.attrInfo ? item.productInfo.attrInfo.price : item.productInfo.price,//商品价格
									image: image,//商品logo
									num:item.cart_num,//商品数量
									id:item.id ,//商品id
									uid:item.uil, //商品uid
									type:false,  //商品选中
									count:0 ,   //购买数量
									uniqueId:item.productInfo.attrInfo ? item.productInfo.attrInfo.unique : '',//拼团秒杀...
									combinationId:item.combination_id,
									seckill_id:item.seckill_id,
									bargain_id:item.bargain_id,
								})
							})
							
							// 充值购物车信息
							this.$store.commit('clearCart')
							
							// 把数据存放在vuex中
							this.$store.commit('addCart',obj)
							
							
							this.shopList = this.$store.state.CartList
							console.log(this.shopList)
						}
					}
				})
			}
		},
		data(){
			return{
				shopList:[
					{},{},{}
				],
				isManage:false,
			}
		},
		computed:{
			...mapGetters(['isToken']),
			isShowToPay(){
				return !this.isManage
			},
			msg(){
				return this.isManage ? '完成' : '管理'
			},
			//结算金额
			sumMoney(){
				// return 'aaa'
				return this.used[0] ? this.used.reduce((x,a) => x * 1 + a.money * a.num , 0).toFixed(2) : 0
			},

			used(){
				const arr = []
				if(this.shopList.length){
					this.shopList.forEach(x => {
						if(x.shopAllMessage){
							x.shopAllMessage.forEach(y => {
								if(y.type) arr.push(y)
							})
						}
					})
				} 
				return arr
			},
			// 全选
			allselect(){
				return this.shopList.every(x => {
					return x.shopType
				})
			},
			allselectTxt(){
				return this.allselect ? '全不选' : '全选'
			},

		},
		methods:{
			// 默认事件禁用
			isDisabled(item,index){
				return ! (item.num > 1)
			},
			isSellectAll(vo,key){
				if(vo.shopAllMessage && vo.shopAllMessage.every(x => x.type)){
					vo.shopType = true
					return true
				}else{
					vo.shopType = false
					return false
				}
			},
			// 去结算
			goPay(){
				// 
				const arr = []
				arr.push(...this.used.map(x => x.id))
				console.log(arr)
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
			// 顶部导航点击
			mangerClick(){
				
			},
			// 删除数据
			removeProduct(){
				uni.showModal({
					title:'确认删除这些商品么',
					content:'Are you sure remove this product?',
					success:(res)=> {
						if(res.confirm){
							let arr = []
							let list = this.shopList
							list.forEach((item,index) => {
								item.shopAllMessage.forEach((x,i) => {
									if(x.type) arr.push(x.id)
								})							
							})
							
							this.removeCart(arr,this.isToken,list)
						}
					}
				})
			},
			removeCart(arr,token,list){
				removeCart(arr,token).then(res => {
					if(res.data.code == 200){
						this.shopList.forEach((x,i) => {
							// x.shopAllMessage.forEach((item,index) => {
							// 	if(item.type) x.shopAllMessage.splice(index,1)
							// })
							const arr = x.shopAllMessage
							
							for(let y = arr.length-1;y>=0;y--){
								if(arr[y].type)  arr.splice(y,1)
							}
						})
						uni.showToast({
							title:'删除成功',
							icon:'none'
						})
					}
				})
			},
			//点击店铺
			ShopClick(vo,key){
				if(vo.shopType){
					vo.shopType = false
					vo.shopAllMessage.forEach(x => {
						x.type = false
					})
				}else{
					vo.shopType = true
					vo.shopAllMessage.forEach(x => {
						x.type = true
					})
				}
			},
			
			//点击店铺内商品
			shoponeClick(key,index,item){
				item.type = !item.type

			},
			
			//购物车数量增加
			addShopClick(key,index,item){
					item.num ++
				// 修改购物车数量，发起网络请求
				changeCartNum(item.id,item.num,this.isToken)
					.then(res =>{
						if(res.data.code != 200){
							uni.showToast({
								title:'网络错误，修改失败'
							})
						}else{
							
						}
					})
			},
			
			//购物车数量减少
			moveShopClick(key,index,item){
				
				if(item.num>1){
					item.num -- 
					changeCartNum(item.id,item.num,this.isToken)
						.then(res =>{
							if(res.data.code != 200){
								uni.showToast({
									title:'网络错误，修改失败'
								})
							}else{
								
							}
						})
				}
			},
			
			//点击全选
			shopAllselectClick(){
				if(this.allselect){
					this.shopList.forEach(x => {
						x.shopAllMessage.forEach(y => {
							y.type = false
						})
					})
				}else{
					this.shopList.forEach(x => {
						x.shopAllMessage.forEach(y => {
							y.type = true
						})
					})
				}
			},
			
			/**
			 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
			 * 
			 * @param num1加数1 | num2加数2
			 */
			numAdd(num1, num2) {
			    var baseNum, baseNum1, baseNum2;
			    try {
			        baseNum1 = num1.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum1 = 0;
			    }
			    try {
			        baseNum2 = num2.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum2 = 0;
			    }
			    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
			    return (num1 * baseNum + num2 * baseNum) / baseNum;
			},
			
			/**
			 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
			 * 
			 * @param num1被减数  |  num2减数
			 */
			numSub(num1, num2) {
			    var baseNum, baseNum1, baseNum2;
			    var precision;// 精度
			    try {
			        baseNum1 = num1.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum1 = 0;
			    }
			    try {
			        baseNum2 = num2.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum2 = 0;
			    }
			    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
			    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
			    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
			},
			
			/**
			 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
			 * 
			 * @param num1被乘数 | num2乘数
			 */
			numMulti(num1, num2) {
			    var baseNum = 0;
			    try {
			        baseNum += num1.toString().split(".")[1].length;
			    } catch (e) {
			    }
			    try {
			        baseNum += num2.toString().split(".")[1].length;
			    } catch (e) {
			    }
			    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
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
		width: 100%;
	}
	.shoopingCart-right-title{
		overflow:hidden;
		text-overflow:ellipsis; 
		display:-webkit-box; 
		-webkit-box-orient:vertical; 
		-webkit-line-clamp:2; 
		font-size: 26upx;
	}
	.shoopingCart-right-guige{
		font-size: 22upx;
		color: #999999;
		background: #F9F9F9;
		height:40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20upx 0;
		width: 100upx;
		border-radius: 10upx;
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
</style>
