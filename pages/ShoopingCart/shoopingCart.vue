<template>
	<view>
		<view v-for="(vo,key) in shopList" :key="key" v-if="isToken" class="bg-white shoopingCart-all">
			<view class="flex align-center">
				<view class="lg shoppingCart-title-yuan" @tap="ShopClick(key)" :class="[vo.shopType?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"></view>
				<view class=" flex align-center">
					<view class="lg cuIcon-shop shoppingCart-title-shop"></view>
					<view class="text-wuer text-lg text-bold">{{vo.shopname}}</view>
				</view>
			</view>
			<view v-for="(item,index) in vo.shopAllMessage" :key="index" class="flex align-center margin-top margin-bottom">
				<view class="flex align-center">
					<view @tap="shoponeClick(key,index)" :class="[item.type?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']" class="lg shoppingCart-title-yuan"></view>
					<image class="shoppingCart-image-all" :src="item.image"></image>
				</view>
				<view class="margin-left-sm shoopingCart-right">
					<view class="shoopingCart-right-title"><text class="text-xs shopping-teichang">江西特产</text>{{item.shoptitle}}</view>
					<view class="shoopingCart-right-guige">{{item.specification}}</view>
					<view class=" flex align-center justify-between">
						<view class="text-price text-red text-lg text-bold">{{item.money}}</view>
						<view class="flex align-center">
							<view @tap="moveShopClick(key,index,item.money)" class="lg cuIcon-move shoopingCart-input-add"></view>
							<input :disabled="true" type="number" v-model="item.num" class="shoopingCart-input"/>
							<view @tap="addShopClick(key,index,item.money)" class="lg cuIcon-add shoopingCart-input-add"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="no-token" v-else>
			您还未登录哦~
		</view>
		<view style="height: 100upx;"></view>
		<view style="bottom: 100upx;" class="shoopingCart-bottom flex justify-between align-center">
			<view @tap="shopAllselectClick" class="flex align-center margin-left">
				<view :class="[allselect?'text-red cuIcon-roundcheckfill':'text-gray cuIcon-round']"  class="lg shoppingCart-title-yuan margin-right-xs"></view>
				<view class="bg-white text-df">{{allselectTxt}}</view>
			</view>
			<view class="flex align-center margin-right">
				<view class="text-price text-red text-lg text-bold">{{sumMoney}}</view>
				<view class="shoopingCart-bottom-button shoopingCart-bottom-button-one">结算</view>
				<!-- <view class="shoopingCart-bottom-button shoopingCart-bottom-button-two">删除</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	// 导入网络请求方法：
	import {getShopCartData} from '@/network/shopCart'
	
	// 导入vuex
	import { mapGetters } from 'vuex'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	export default{
		components: {
			
		},
		onShow() {
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
						console.log(arr)
						const result = []
						
						for (let key in arr){
							console.log(arr)
							const obj = {}
							obj.shopname = arr[key][0].shop_info.shop_name
							obj.shopAllMessage = []
							obj.shopType = false, 
							arr[key].forEach(item =>{
								const image = replaceImage(item.productInfo.image)
								console.log(image)
								obj.shopAllMessage.push({
									// 对数据进行保存
									shoptitle:item.productInfo.store_name, //商品名称
									specification:item.productInfo.attrInfo.suk, //商品种类
									money:item.productInfo.price,//商品价格
									image: image,//商品logo
									num:item.cart_num,//商品数量
									id:item.id ,//商品id
									uid:item.uil, //商品uid
									type:false,
								})
							})
							
							// 充值购物车信息
							this.$store.commit('clearCart')
							
							// 把数据存放在vuex中
							this.$store.commit('addCart',obj)
							
							
							console.log(this.$store.state.CartList)
							this.shopList = this.$store.state.CartList
						}
					}
				})
			}
		},
		
		// arr.forEach((item,i) => {
		// 	const obj = {
		// 		shopname:item.shop_info.shop_name,
		// 		shopType:false,
		// 		shopAllMessage:[{
		// 			shoptitle:item.productInfo.store_name,
		// 			specification:item.productInfo.attrInfo.suk,
		// 			money:item.productInfo.price,
		// 			image:item.productInfo.image,
		// 			num:item.cart_num,
		// 			type:false
		// 		}]
		// 	}
		// })
		data(){
			return{
				sumMoney:0,//结算金额
				allselect:false,//是否全选
				allselectTxt:'全选',//是否全选文字
				shopList:[]
			}
		},
		computed:{
			...mapGetters(['isToken'])
		},
		methods:{
			//点击店铺
			ShopClick(key){
				var that = this
				let shopAll = that.shopList[key]
				let moneynum = 0
				if(shopAll.shopType){
					shopAll.shopType = false
					shopAll.shopAllMessage.forEach(function(item){
						let ride = that.numMulti(item.num,item.money)
						moneynum = that.numAdd(moneynum,ride)
						item.type = false
					})
					that.sumMoney = that.numSub(that.sumMoney,moneynum)
				}else{
					shopAll.shopType = true
					shopAll.shopAllMessage.forEach(function(item){
						if(!item.type){
							let ride = that.numMulti(item.num,item.money)
							moneynum = that.numAdd(moneynum,ride)
							item.type = true
						}
					})
					that.sumMoney = that.numAdd(that.sumMoney,moneynum)
				}
				that.shopList[key] = shopAll
			},
			
			//点击店铺内商品
			shoponeClick(key,index){
				var that = this
				let length = 0
				let shopAll = that.shopList[key].shopAllMessage[index]
				let shopAllLength = that.shopList[key].shopAllMessage
				if(shopAll.type){
					shopAll.type = false
					shopAllLength.forEach(function(item){
						if(!item.type){
							length += 1
						}
					})
					if(length != 0){
						that.shopList[key].shopType = false
					}
					let ride = that.numMulti(shopAll.num,shopAll.money)
					let Sub = that.numSub(that.sumMoney,ride)
					that.sumMoney = Sub
				}else{
					shopAll.type = true
					shopAllLength.forEach(function(item){
						if(item.type){
							length += 1
						}
					})
					if(shopAllLength.length == length){
						that.shopList[key].shopType = true
					}
					let ride = that.numMulti(shopAll.num,shopAll.money)
					let pulsSum = that.numAdd(ride,that.sumMoney)
					that.sumMoney = pulsSum
				}
				that.shopList[key].shopAllMessage[index] = shopAll
			},
			
			//购物车数量增加
			addShopClick(key,index,money){
				var that = this
				let timeout = that.shopList[key].shopAllMessage[index]
				timeout.num = that.numAdd(timeout.num,1)
				if(timeout.type){
					let moneyFake=  that.numAdd(that.sumMoney,money)
					that.sumMoney = parseFloat(moneyFake.toFixed(2))
				}
				that.shopList[key].shopAllMessage[index] = timeout
			},
			
			//购物车数量减少
			moveShopClick(key,index,money){
				var that = this
				let timeout = that.shopList[key].shopAllMessage[index]
				if(timeout.num < 2) return
				timeout.num = that.numSub(timeout.num,1)
				if(timeout.type){
					console.log(that.sumMoney)
					console.log(money)
					let moneyFake=  that.numSub(that.sumMoney,money)
					that.sumMoney = moneyFake
				}
				that.shopList[key].shopAllMessage[index] = timeout
			},
			
			//点击全选
			shopAllselectClick(){
				var that = this
				let shopCartList = null
				if(that.allselect){
					shopCartList = that.shopList
					shopCartList.forEach(function(item){
						item.shopType = false
						item.shopAllMessage.forEach(function(index){
							index.type = false
						})
					})
					that.sumMoney = 0
					that.allselect = false
					that.allselectTxt = '全选'
				}else{
					let allsumMoney = 0//控制所有总和
					shopCartList = that.shopList
					shopCartList.forEach(function(item){
						let moneynum = 0//控制每个店铺的总和
						item.shopType = true
						item.shopAllMessage.forEach(function(index){
							let ride = that.numMulti(index.num,index.money)//每个商品总和
							moneynum = that.numAdd(moneynum,ride)//每个店铺的总和
							index.type = true
						})
						allsumMoney =that.numAdd(allsumMoney,moneynum)//所有总和
					})
					that.sumMoney = allsumMoney
					that.allselect = true
					that.allselectTxt = '全不选'
					
				}
				that.shopList = shopCartList
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

<style>
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
