<template>
	<view class="content">
		<view class="t-header">
			<view class="header-item">
				<image src="/static/tixian/03.png" @click="topClick" :data-index="0" mode=""></image>
				<text>银行卡</text>
			</view>
			<view class="header-item">
				<image src="/static/tixian/07.png" @click="topClick" :data-index="1" mode=""></image>
				<text>支付宝</text>
			</view>
			<view class="header-item">
				<image src="/static/tixian/01.png" @click="topClick" :data-index="2" mode=""></image>
				<text>微信</text>
			</view>
		</view>
		<swiper :style="{height:style.height + 'px'}" class="floor-list" scroll-x :scroll-with-animation='true' :current="currentIndex" :duration="300" @change="swiperChange">
			<swiper-item v-for="(item,index) in inputs" :key="index" class="scroll-wrapper">
				<view class="t-list">
					<view class="t-item cu-form-group" v-if="item.name">
						<view class="t-left title">姓名</view>
						<input v-if="item.name.type" class="t-right" type="text" placeholder="请输入持卡人姓名" placeholder-class="placeholder" v-model="item.name.name" />
						<view class="input-tips text-red" @click="dealName(item,'name')" v-else>
							<text>请完善您的持卡人姓名</text>
							<text class="lg cuIcon-warn"></text>
						</view>
					</view>
					<view class="t-item cu-form-group">
						<view class="t-left title">卡号</view>
						<input v-if="item.cardId.type" class="t-right" type="number" :placeholder="dealPlace(index)" placeholder-class="placeholder" v-model="item.cardId.name" />
						<view class="input-tips text-red" @click="dealName(item,'cardId')" v-else>
							<text>请输入您的卡号</text>
							<text class="lg cuIcon-warn"></text>
						</view>
					</view>
					<view v-if="item.bank" class="t-item cu-form-group">
						<view class="t-left title">银行</view>
						<!-- <view  v-if="item.bank.type" class="choose-open">{{item.bank.name ? item.bank.name : '请选择银行'}}</view> -->
						<picker v-if="item.bank.type" @change="PickerChange" :value="key" :range="picker">
							<view class="picker" :class="{'choose-bank':key>-1}" >
								{{item.bank.name}}
							</view>
						</picker>
						<view class="input-tips text-red" @click="dealName(item,'bank')" v-else>
							<text>还没有选择银行哦</text>
							<text class="lg cuIcon-warn"></text>
						</view>
					</view>
					<!-- <view class="cu-form-group margin-top">
						<view class="title">普通选择</view>
						<picker @change="PickerChange" :value="key" :range="picker">
							<view class="picker">
								{{key>-1?picker[key]:'禁止换行，超出容器部分会以 ... 方式截断'}}
							</view>
						</picker>
					</view> -->	
					<view class="t-item cu-form-group">
						<view class="t-left title">金额</view>
						<input  v-if="item.money.type" class="t-right" type="number" placeholder="提现金额" placeholder-class="placeholder" v-model="item.money.name" />
						<view class="input-tips text-red" @click="dealName(item,'money')" v-else>
							<text>请填写提现的金额</text>
							<text class="lg cuIcon-warn"></text>
						</view>
					</view>		
					<view class="cu-form-group placeholder t-right">
						当前可提现金额： {{item.price}}
					</view>
					<view class="tixian-btn" :class="{yinhang:currentIndex == 0}">
						<view @click="goTixian(item)" class="base-bgc ti-xian">
							提现
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<x-modal  v-model="show1" title='提示' :text=msg @confirm="resertInfo" />
		<view class="wenxin-tips">
			<view class="wenxin-title">温馨提示</view>
			<view class="wenxin-text">提现时间长度为1-10天左右，请您耐心等待</view>
		</view>
	</view>
</template>

<script>
	import {userTiXian} from '@/network/getProfileData'
	
	export default {
		components:{
		},
		data() {
			return {
				show1:false,
				inputs:[
					{
						name:{
							name:'',
							type:true
						},
						cardId:{
							name:'',
							type:true
						},
						bank:{
							name:'请选择银行',
							type:true
						},
						money:{
							name:'',
							type:true
						},
						price:0
					},
					{
						cardId:{
							name:'',
							type:true
						},
						money:{
							name:'',
							type:true
						},
						price:0
					},
					{
						cardId:{
							name:'',
							type:true
						},
						money:{
							name:'',
							type:true
						},
						price:0
					},
				],
				style:{
					height:999
				},
				currentIndex:0,
				token:'',
				picker: ['中国农行银行', '中国工商银行','中国建设银行','中国银行'],
				key:-1,
				msg:'',
			}
		},
		onLoad(e) {
			this.token = this.$store.getters.isToken
			if(e.price){
				this.inputs.forEach(x => {
					x.price = e.price
				})
				
			}
		},
		methods:{
			swiperChange(e){
				if(this.currentIndex != e.detail.current*1){
					this.currentIndex = e.detail.current*1
				}
			},
			topClick(e){
				const index = e.target.dataset.index
				if(this.currentIndex != index*1){
					this.currentIndex = index*1
				}
			},
			goTixian(item){
				let method
				const that = this
				console.log(this.inputs[0].bank.name)
				// let money
				switch(this.currentIndex){
					case 0 : 
						method = 'bank'
						if(!item.name.name || !item.cardId.name || item.bank.name == '请选择银行' || !item.money.name){
							if(!item.name.name){
								item.name.type = false 
							}
							if(!item.cardId.name){
								item.cardId.type = false 
							}
							if(item.bank.name == '请选择银行'){
								item.bank.type = false 
							}
							if(!item.money.name){
								item.money.type = false 
							}
							return
						}
						// if(!item.cardId) item.cardId.type = false
						break
					case 1 : 
						method = 'alipay'
						if(!item.cardId.name || !item.money.name){
							if(!item.cardId.name){
								item.cardId.type = false 
							}
							if(!item.money.name){
								item.money.type = false 
							}
							return
						}
						break
					case 2 :
						method = 'weixin'
						if(!item.cardId.name || !item.money.name){
							if(!item.cardId.name){
								item.cardId.type = false 
							}
							if(!item.money.name){
								item.money.type = false 
							}
							return
						}
						break
				}
				
				const data={
					alipay_code:this.currentIndex == 1 ? item.cardId.name : '',
					extract_type:method,
					money:item.money.name,
					name:this.currentIndex == 0 ? item.name.name : '',
					bankname:this.currentIndex == 0 ? item.bank.name : '',
					cardnum:this.currentIndex == 0 ? item.cardId.name : '',
					weixin:this.currentIndex == 2 ? item.cardId.name : ''
				}
				userTiXian(data,this.token).then(res => {
					if(res.data.code != 200){
						that.msg = res.data.msg
						that.show1 = true
					}else{
						that.msg = '提现成功，请耐心等待审核'
						that.show1 = true
					}
				})
			},
			resertInfo(){
				const obj = this.inputs[this.currentIndex]
				if(obj.name) obj.name.name = ''
				obj.cardId.name = ''
				if(obj.bank){
					obj.bank.name = '请选择银行'
					this.key = -1
				}
				obj.money.name = ''
			},
			PickerChange(e) {
				console.log(e)
				this.key = e.detail.value
				this.inputs[0].bank.name = this.key>-1 ? this.picker[this.key]:'请选择银行'
			},
			dealPlace(index){
				switch(index){
					case 0 : 
						return '请填写您的银行卡卡号'
					case 1 : 
						return '请填写您的支付宝账号'
					case 2 :
						return '请填写您的微信账号'
				}
			},
			dealName(item,text){
				item[text].type = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,.content{
		background-color: #f5f5f5;
		height: 100%;
		overflow: hidden;
	}
	.t-header{
		height: 270upx;
		background-color: #fff;
		border-top: 1px solid #E1E1E1;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 12upx;
		color: #686868;
		font-size: 26upx;
		image{
			width: 86upx;
			height: 86upx;
		}
		.header-item{
			height: 120upx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
		}
	}
	.t-list{
		.t-left{
			font-size: 30upx;
			color: #686868;
			font-weight: bold;
		}
		.t-right{
			font-size: 26upx;
		}
	}
	.placeholder{
		color: #8C8C8C;
	}
	
	.tixian-btn{
		height: 320upx;
		display: flex;
		align-items: center;
		padding: 0 25upx;
		.ti-xian{
			text-align: center;
			width: 100%;
			color: #fff;
			height: 90upx;
			line-height: 90upx;
			font-size: 36upx;
			border-radius: 80upx;
			font-weight: bold;
		}
	}
	.floor-list{
		background-color: #fff;
		white-space: nowrap;
		.scroll-wrapper{
			display: flex;
			align-items: flex-start;
			width: 300%;
			.t-list{
				width: 750upx;
			}
		}
	}
	.yinhang{
		height: 90upx;
	}
	.input-tips{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.picker{
		text-align: left !important;
		color: #8c8c8c;
		font-size: 26upx;
	}
	.choose-bank{
		color: #333 !important;
	}
	.wenxin-tips{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 350upx;
		padding: 50upx 50upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		color: #CD3233;
		font-size: 26upx;
	}
</style>
