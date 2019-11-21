<template>
	<view>
		<view class="bg-white margin-tb-sm">
			<view  class="flex align-start margin-lr padding-top">
				<view class="mybooking-image">
					<image src="../../../static/56524a9a3b6bdab0753eb8ed922d57d.png"></image>
				</view>
				<view class="text-width margin-left-sm ">
					<view class="flex align-center justify-between">
						<view class="flex-five text-hieed">沃隆每日坚果750g混合装30包干果零食大礼包混合坚果小包装坚果小包装坚果小包装</view>
						<view class="text-price text-red flex-sub text-center">139</view>
					</view>
					<view class="flex align-center justify-between margin-top-xs">
						<view class="flex-five text-jiujiujiu text-sm">口味：成人款A750g*1盒</view>
						<view class="flex-sub text-center">x1</view>
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
				<view class="text-price text-red">128.9</view>
			</view>
			<view class="flex align-center refund-heigth">
				<view class="text-wuer margin-right-lg">联系电话</view>
				<view>15225162623</view>
			</view>
		</view>
		<button @tap="issuebutton" class="refund-button">发布申请</button>
		
		<uni-popup ref="popup" type="bottom" >
			<view>
				<view style="color: #000000;" class="flex align-center justify-center text-lg refund-heigth-two">退款原因</view>
				<view v-for="(vo,key) in list" :key="key" class="margin-lr-sm">
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
	export default{
		components: {
			uniPopup,
		},
		data(){
			return{
				cause:'请选择退款原因',
				list:[{
					title:'拍错/多拍/不想要',
					type:false
				},{
					title:'协商一致退款',
					type:true
				},{
					title:'缺货',
					type:false
				},{
					title:'未按约定时间发货',
					type:false
				},{
					title:'其他',
					type:false
				}]
			}
		},
		methods:{
			//发布申请
			issuebutton(){
				this.outSharClick()
			},
			
			//返回首页
			backClick(){
				uni.navigateBack({})
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
				this.$refs.popups.open()
			},
			//提交成功关闭
			closeSharClick(){
				this.$refs.popups.close()
			},
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
</style>
