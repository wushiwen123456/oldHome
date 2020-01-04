<template>
	<view>
		<view class="bg-white margin-tb-sm">
			<view  class="flex align-start margin-lr padding-top">
				<view class="mybooking-image">
					<image :src="itemInfoAttr.image || ''"></image>
				</view>
				<view class="text-width margin-left-sm ">
					<view class="flex align-center justify-between">
						<view class="flex-five text-hieed">{{itemInfo.productInfo.store_name || '无名小店'}}</view>
						<view class="text-price text-red flex-sub text-center">{{itemInfoAttr.price || ''}}</view>
					</view>
					<view class="flex align-center justify-between margin-top-xs">
						<view class="flex-five text-jiujiujiu text-sm">规格： {{itemInfoAttr.suk || '默认规格'}}</view>
						<view class="flex-sub text-center">x{{itemInfo.cart_num}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white padding-left padding-right">
			<view @tap="outloginSharClick" class="flex align-center justify-between refund-heigth">
				<view class="flex align-center">
					<view class="text-wuer margin-right-lg">申请原因</view>
					<view class="text-jiujiujiu">{{cause}}</view>
				</view>
				<view class="lg text-gray cuIcon-right"></view>
			</view>
			<view class="flex align-center refund-heigth">
				<view class="text-wuer margin-right-lg">退款金额</view>
				<view class="text-price text-red">{{itemInfo.productInfo.attrInfo ? itemInfo.productInfo.attrInfo.price : itemInfo.productInfo.price}}</view>
			</view>
			<view class="flex align-center refund-heigth">
				<view class="text-wuer margin-right-lg">联系电话</view>
				<view>{{itemInfo.phone}}</view>
			</view>
			<view class="cu-form-group text-black align-start beizhu">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="textareaBInput" placeholder="退款备注,标明退款原因注意事项等等"></textarea>
			</view>
		</view>
		<button @tap="issuebutton" class="refund-button">发布申请</button>
		
		<uni-popup ref="popup" type="bottom" >
			<view>
				<view style="color: #000000;" class="flex align-center justify-center text-lg refund-heigth-two">退款原因</view>
				<view v-if="list.length" v-for="(vo,key) in list" :key="key" @click="listItemCLick(vo,key)" class="margin-lr-sm">
					<view class="flex align-center justify-between refund-heigth-two">
						<view class="text-black text-bold text-three text-lg">{{vo.title}}</view>
						<view :class="[vo.type?'cuIcon-roundcheckfill text-red-my':'cuIcon-round  text-gray']" style="font-size: 40upx;" class="lg"></view>
					</view>
				</view>
				<button class="popup-button" @tap="closePopupsSharClick">关闭</button>
			</view>
		</uni-popup>
		
		<uni-popup ref="popups" type="center" >
			<view class="popups-center text-center">
				<view style="font-size: 100upx;" class=" padding cuIcon-roundcheckfill text-green"></view>
				<view class="text-wuer text-lg text-bold margin-bottom-xl">提交成功</view>
				<button @tap="backClick" style="margin-top: 0;" class="refund-button">返回首页</button>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup  from "@/components/uni-popup/uni-popup"
	import {getRegard,publishRegard} from '@/network/refund'
	export default{
		components: {
			uniPopup,
		},
		onLoad(e) {
			this.token = this.$store.getters.isToken
			// 获取退款理由
			this.getRegard()
			this.itemInfo = this.$store.state.tProduct
			this.itemInfoAttr = this.$store.state.tProduct.productInfo.attrInfo || ''
			if(e.id){
				this.uni = e.id
			}else{
				uni.switchTab({
					url:'../../Home/home'
				})
			}
			
		},
		data(){
			return{
				itemInfo:{},
				cause:'请选择退款原因',
				list:[],
				itemInfoAttr:{},
				token:'',
				textareaBInput:'',
				uni:''
			}
		},
		methods:{
			getRegard(){
				getRegard(this.token).then(res => {
					if(res.data.code == 200){
						this.list = res.data.data.map((x,index) => {
							return {
								title:x,
								type:false
							}
						})
					}else{
						// #ifdef APP-PLUS
						plus.nativeUI.toast('获取信息失败请重试')
						// #endif
					}
				}).catch(err => {
					// #ifdef APP-PLUS
					plus.nativeUI.toast('网络好像出了点问题')
					// #endif
				})
			},
			//发布申请
			issuebutton(){
				this.outSharClick()
			},
			
			//返回首页
			backClick(){
				// 执行网络请求
				
				uni.switchTab({
					url:'../../Home/home'
				})
			},
			//退款弹出
			outloginSharClick(){
				this.$refs.popup.open()
			},
			//退款关闭
			closePopupsSharClick(){
				this.$refs.popup.close()
			},
			//提交成功弹出
			outSharClick(){
				const type = this.list.find(x => x.type) || ''
				if(!type){
					// #ifdef APP-PLUS
					plus.nativeUI.toast('请填写退款原因')
					// #endif
					return
				}
				const data = {
					text:this.textareaBInput,
					refund_reason_wap_img:'',
					refund_reason_wap_explain:type.title,
					uni:this.uni
				}
				publishRegard(data,this.token).then(res => {
					if(res.data.code == 200){
						this.$refs.popups.open()
					}
				})
			},
			//提交成功关闭
			closeSharClick(){
				this.$refs.popups.close()
			},
			// 点击退款原因
			listItemCLick(vo){
				if(!vo.type){
					this.list.forEach(x => {
						x.type = false
					})
					vo.type = true
					this.cause = vo.title
				}
			}
		}
	}
</script>

<style>
	.mybooking-image image{
		width: 164upx;
		height: 164upx;
	}
	.refund-heigth{
		height: 84upx;
		border-top: #E1E1E1 1px solid;
	}
	.refund-heigth:nth-child(1){
		border-top: none;
	}
	.refund-button{
		margin: 0 30upx;
		margin-top: 200upx;
		height:94upx;
		line-height: 94upx;
		background:rgba(205,50,51,1);
		border-radius:47upx;
		color: #FFFFFF;
	}
	.popup-button{
		border: none;
		height:95upx;
		line-height: 95upx;
		width: 100%;
		background:rgba(205,50,51,1);
		border-radius: none;
		color: #FFFFFF;
	}
	.refund-heigth-two{
		height: 110upx;
		border-top: #E1E1E1 1px solid;
	}
	.popups-center{
		width:578upx;
		height:418upx;
	}
	.beizhu{
		padding: 0 !important;
	}
</style>
