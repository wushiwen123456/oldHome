	<template>
	<view class="content">
		<view class="sing-all-text">
			<image src="../../static/singback.png"></image>
			<view @tap="singClick"  class="sing-text">
				<view>{{singtext}}</view>
			</view>
		</view>
		<view class="sing-all">
			<view class="margin-lr-lg bg-white sing-all-main">
				<view class="flex align-center justify-center padding-tb">
					<view class="flex align-center text-lg ">
						<view>已签到</view>
						<view class="flex align-center justify-center text-xl text-bold text-red-my sing-data-imag" v-if="isCheck">{{dealDay}}</view>
						<view>天</view>
					</view>
				</view>
				<view class="flex align-center flex-wrap margin-lr-xs margin-bottom-lg">
					<view v-for="(vo,key) in List" :key='key' :class="[vo.type?'sing-select':'sing-noselect']" class="flex flex-direction align-center justify-center sing-time">
						<view class="text-bold text-sm">{{vo.num}}</view>
						<image v-if="vo.type" class="sing-bottom-image" src="../../static/singduihao.png"></image>
						<image v-else class="sing-bottom-image" src="../../static/jifenw.png"></image>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-center my-money margin-top">
				<image class="sing-bottom-image margin-right-xs" src="../../static/jifenw.png"></image>
				<view class="text-white" v-if="isCheck">{{money}}</view>
			</view>
		</view>
		<view class="sing-animation" v-if="isShowAnimate">
			<view class="move-box">
				<image src="/static/jifenw.png"></image>
				<view>
					+ {{addMoney}}
				</view>
			</view>
		</view>
		<x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import {sign,sign_index} from'@/network/sign.js'
	export default {
		data() {
			return {
				windowHeight:0,//屏幕高度
				titleHeight:270,//头部图片高度
				List:[],
				singtext:'签到',
				today:0,//当天多少号
				time:0,
				money:0,//
				SingDay:[],//已签到的日子
				isShowAnimate:false ,//签到动画
				addMoney:0.1,
				isCheck:true
			}
		},
		onLoad() {
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
			that.yearClick()
		},
		onReady() {
			this.$refs.loading.open()
		},
		computed:{
			bottomheight:function(){
				return this.windowHeight - this.titleHeight
			},
			dealDay(){
				return this.SingDay.length
			}
		},
		methods: {
			yearClick(){
				var that = this
				var date = new Date(); //得到当前日期原始模式
				var newyear = date.getFullYear(); //得到当前日期年份
				var newmonth = date.getMonth() + 1; //得到当前日期月份（注意： getMonth()方法一月为 0, 二月为 1, 以此类推。）
				that.today = date.getDate();
				console.log(newyear+'年'+'   '+ newmonth + '月'+that.today+'号')
				var yearNum = new Date(newyear, newmonth, 0).getDate()
				console.log(newyear+'年'+ newmonth + '月,有'+ yearNum +'天')
				for(var i = 1 ; i < yearNum + 1; i++){
					that.List.push({num:i,type:false})
				}
				sign_index(false).then(res =>{
					this.$refs.loading.close()
					that.time = res.sign_num
					let money = res.money
					that.money  = Number(money).toFixed(2)
					console.log(that.money)
					that.SingDay = res.day
					let list = res.day
					list.forEach(function(item){
						let num = item - 1
						that.List[num].type = true
						if(that.today == item){
							that.singtext  = '已签到'
						}
					})
				})
			},
			singClick(){
				var that = this				
				
				if(that.singtext  == '已签到'){
					// #ifdef APP-PLUS
					plus.nativeUI.toast('今天已经签到了哦，明天再来吧~')
					// #endif
					return
				}
				// this.isCheck = false
				// that.isShowAnimate = false
				// // #ifdef APP-PLUS
				// plus.nativeUI.toast('签到成功',{duration:'long'})
				// // #endif
				// that.List[that.today - 1].type = true
				// that.time += 1
				// console.log(that.time)
				// that.singtext = '已签到'	
				// that.money = that.numAdd(Number(money),'')
				// console.log(that.money)
				// that.SingDay.push(that.today)	
				// console.log(that.SingDay)

				sign(true).then( res =>{
					that.isShowAnimate = true
					setTimeout(() => {
						that.isShowAnimate = false
						that.List[that.today - 1].type = true
						that.money = that.numAdd(Number(that.money),0.1)
						const arr = that.SingDay
						arr.push(that.today)
						that.SingDay = [...new Set(arr)] 
					},3000)
				}).catch(err => {
					// #ifdef APP-PLUS
					plus.nativeUI.toast('网络好像出了点问题...',{duration:'long'})
					// #endif
					that.isShowAnimate = false
				})
			},
			/** 
			* 加法运算，避免数据相减小数点后产生多位数和计算精度损失。 
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
			}
		}
	}
</script>

<style lang="scss">
	page,.content{
		height:100vh ;
		overflow: hidden;
	}
	.sing-all-text{
		background: #E8211F;
	}
	.sing-all-text image{
		width: 100%;
		height: 560upx;
	}
	.sing-all{
		/* position: absolute;
		bottom: 0upx; */
		padding-bottom:600upx;
		width: 100%;
		/* height: 700upx; */
		background: #E8211F;
	}
	.sing-text{
		position: absolute;
		top: 280upx;
		font-size:60upx;
		font-weight:bold;
		width: 100%;
		text-align: center;
		color:rgba(255,255,255,1);
		text-shadow:0upx 6upx 5upx rgba(255,122,0,1);
	}
	.sing-data-imag{
		margin: 0 20upx;
		width: 74upx;
		height: 74upx;
		background: url(../../static/singtime.png) no-repeat;
		background-size: 100% 100%;
	}
	.sing-bottom-image{
		width: 26upx;
		height: 26upx;
	}
	.sing-time{
		width:70upx;
		height:80upx;
		margin-left: 20upx;
		margin-bottom: 30upx;
		border-radius: 12upx;
	}
	.sing-noselect{
		background: #DCDCDC;
	}
	.sing-select{
		background: #DB3014;
		color: #FFFFFF;
	}
	.my-money{
		position: absolute;
		top: 40upx;
		right: 0;
		width:124upx;
		height:58upx;
		background:rgba(228,82,57,1);
		border-top-left-radius: 100upx;
		border-bottom-left-radius: 100upx;
		
	}
	.sing-all-main{
		border-radius: 24upx;
	}
	.sing-animation{
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		z-index: 99999;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255,255,255,.7);
		image{
			width: 84upx;
			height: 80upx;
			margin-right: 15upx;
			animation-timing-function: ease-out;
			animation-fill-mode: both;
			animation-duration: 1s;
			animation-name: move;
			display: inline-block;
		}
		.move-box{
			font-size: 60upx;
			display: flex;
			width: 100%;
			justify-content: center;
			align-items: center;
			color: rgb(247,255,113);
			font-weight: bolder;
			margin-top: -180upx;
		}
	}
	@keyframes move {
		0% {
			transform: rotateY(0);
		}
		
		100% {
			transform: rotateY(720deg);
		}
	}
	
</style>
