<template>
	<view>
		<canvas v-if="shade" :style="{height:windowHeight + 'px'}" class="bg-white text-width" disable-scroll="true">
			<view class="flex flex-direction justify-center align-center">
				<image @tap="enterTypeClick(0)" mode="aspectFit" src="../../../static/enterb.png"></image>
				<image @tap="enterTypeClick(1)" mode="aspectFit" src="../../../static/entera.png"></image>
			</view>
		</canvas>
		
		
		<view>
			<view class=" bg-white margin-top-xs">
				<view class="flex align-center justify-between enter-all-heigth enter-border-bootom  margin-left">
					<view class="flex flex-twice align-center">
						<view class="enter-left-image margin-right-sm">
							<image src="../../../static/enterc.png"></image>
						</view>
						<view class="text-wuer text-lg">商户名称</view>
					</view>
					<view class="flex-treble enter-all-right ">
						<input class="text-jiujiujiu text-sm-erliu" v-model="shopName" placeholder="商户名称	" confirm-type="done"/>
					</view>
				</view>
				<view class="flex align-center justify-between enter-all-heigth enter-border-bootom  margin-left">
					<view class="flex flex-twice align-center">
						<view class="enter-left-image margin-right-sm">
							<image src="../../../static/enterd.png"></image>
						</view>
						<view class="text-wuer text-lg">主营分类</view>
					</view>
					<view class="flex-treble enter-all-right ">
						<input class="text-jiujiujiu text-sm-erliu" v-model="shoptype" placeholder="例如鞋帽，化妆品等	" confirm-type="done"/>
					</view>
				</view>
			</view>
			
			<view class=" bg-white margin-top-xs">
				<view class="flex align-center justify-between enter-all-heigth enter-border-bootom  margin-left">
					<view class="flex flex-twice align-center">
						<view class="enter-left-image margin-right-sm">
							<image src="../../../static/enterf.png"></image>
						</view>
						<view class="text-wuer text-lg">管理人姓名</view>
					</view>
					<view class="flex-treble enter-all-right ">
						<input class="text-jiujiujiu text-sm-erliu" v-model="adminName" placeholder="您的称呼	" confirm-type="done"/>
					</view>
				</view>
				<view class="flex align-center justify-between enter-all-heigth enter-border-bootom   margin-left">
					<view class="flex flex-twice align-center">
						<view class="enter-left-image margin-right-sm">
							<image src="../../../static/enterg.png"></image>
						</view>
						<view class="text-wuer text-lg">手机号码</view>
					</view>
					<view class="flex-treble enter-all-right ">
						<input type="number" class="text-jiujiujiu text-sm-erliu" v-model="phone" placeholder="输入手机号码" confirm-type="done"/>
					</view>
				</view>
				<view class="flex align-center justify-between enter-all-heigth enter-border-bootom  margin-left">
					<view class="flex flex-twice align-center">
						<view class="enter-left-image margin-right-sm">
							<image src="../../../static/enterh.png"></image>
						</view>
						<view class="text-wuer text-lg">手机验证码</view>
					</view>
					<view class="flex-treble flex align-center enter-all-right ">
						<input type="number" class="text-jiujiujiu text-sm-erliu" v-model="code" placeholder="输入验证码" confirm-type="done"/>
						<view class="entercode-button flex align-center justify-center">发送验证码</view>
					</view>
				</view>
			</view>
			
			<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">上传身份证件</view>
			
			<view class="flex align-center margin-top-sm bg-white padding">
				<view class="flex-sub margin-right-sm">
					<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>身份证头像面</view>
					<view class="enterNumber-all">
						<image src=""></image>
					</view>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>身份证国徽面</view>
					<view class="enterNumber-all">
						<image></image>
					</view>
				</view>
			</view>
			
			<view v-if="enterType == 1">
				<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">上传营业执照</view>
				<view class="flex-sub padding bg-white">
					<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>营业执照</view>
					<view style="width: 50%;"  class="enterNumber-all">
						<image></image>
					</view>
				</view>
				
				<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">商标信息上传<text class="text-jiujiujiu" >(非必填)</text></view>
				<view class="bg-white">
					<view class="flex align-center enter-all-heigth enter-border-bootom  margin-left">
						<view class="flex flex-twice align-center">
							<view class="text-wuer text-lg">商品商标</view>
						</view>
						<view class="flex-treble enter-all-right ">
							<input class="text-jiujiujiu text-sm-erliu" v-model="adminName" placeholder="如：自有商标/授权商标" confirm-type="done"/>
						</view>
					</view>
					<view class="flex align-center enter-all-heigth enter-border-bootom  margin-left">
						<view class="flex flex-twice align-center">
							<view class="text-wuer text-lg">商标注册号</view>
						</view>
						<view class="flex-treble enter-all-right ">
							<input class="text-jiujiujiu text-sm-erliu" v-model="adminName" placeholder="请输入商标注册号" confirm-type="done"/>
						</view>
					</view>
				</view>
				
				
				<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">商标注册证明</view>
				<view class="flex-sub padding bg-white">
					<view class="margin-bottom-lg text-lg">上传商标证明</view>
					<view style="width: 50%;"  class="enterNumber-all">
						<image></image>
					</view>
				</view>
			</view>
			
			<view class="flex align-center padding-left enter-all-heigth bg-white solid-top margin-bottom-sm text-wuer text-df">
				<view @tap="readClick" :class="[readtype?'text-red-my cuIcon-squarecheckfill':'text-gray cuIcon-squarecheck']" style="font-size: 40upx;" class="lg margin-right-sm"></view>
				<view>我已经阅读并了解了<text class="text-red-my">【入驻申请协议】</text></view>
			</view>
		</view>
		
		<button class="enter-button">提交申请</button>
		<Modal v-model="Modalshow" title='提示' text='退出后将不保留填写的信息,确定要退出吗？' @confirm="delAddressClcik" />
	</view>
</template>

<script>
	import Modal from '@/components/x-modal/x-modal'
	export default{
		components:{
			Modal
		},
		data(){
			return{
				Modalshow: false,//弹窗打开隐藏
				windowHeight:0,//屏幕高度
				shade:true,//遮罩
				enterType:-1,//商家入驻类型
				shopName:'',//商户名称
				shoptype:'',//主营分类
				adminName:'',//管理人姓名
				phone:'',//手机号码
				code:'',//手机验证码
				readtype:true,//是否阅读协议
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
		},
		onBackPress(){
			if(!this.shade){
				if(!this.Modalshow){
					this.Modalshow = true
					return true
				}
			}
			
		},
		methods:{
			//选择商家入驻类型
			enterTypeClick(num){
				if(num == 0){
					this.enterType = 0
					uni.setNavigationBarTitle({
					    title: '个人入驻'
					});
				}else if(num == 1){
					this.enterType = 1
					uni.setNavigationBarTitle({
					    title: '企业入驻'
					});
				}
				this.shade = false
			},
			//确认退出
			delAddressClcik(){
				uni.navigateBack({})
			},
			//阅读协议
			readClick(){
				this.readtype = !this.readtype
			},
		}
	}
</script>

<style>
	.enter-all-heigth{
		height: 100upx;
	}
	.enter-left-image image{
		width: 62upx;
		height: 62upx;
	}
	.enter-border-bootom{
		border-top: #DCDCDC 1px solid;
	}
	.enter-border-bootom:nth-child(1){
		border: none;
	}
	.entercode-button{
		margin-right: 24upx;
		width:220upx;
		height:60upx;
		background:rgba(205,50,51,1);
		border-radius:30upx;
		font-size: 26upx;
		color: #FFFFFF;
	}
	.enterNumber-all{
		border: #9A9A9A 1px dashed ;
	}
	.enterNumber-all image{
		width:320upx;
		height:200upx;
	}
	.enter-button{
		margin: 60upx 30upx 30upx 30upx;
		background:rgba(205,50,51,1);
		border-radius: 50upx;
		color: #FFFFFF;
		font-size: 32upx;
	}
</style>
