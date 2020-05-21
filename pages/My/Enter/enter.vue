<template>
	<view class="page-1">
		<view v-if="!isSubmit">
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
						<view class="flex-treble check-box-input enter-all-right ">
							<input @click="tipsClick('shopName')" class="text-jiujiujiu text-sm-erliu" :class="{'tips':shopName == '商户名称不能为空'}" v-model="shopName" placeholder="商户名称" confirm-type="done"/>
							<text v-if="shopName == '商户名称不能为空'" class="lg input-icon text-red cuIcon-warn"></text>
						</view>
					</view>
					<view class="flex align-center justify-between enter-all-heigth enter-border-bootom  margin-left">
						<view class="flex flex-twice align-center">
							<view class="enter-left-image margin-right-sm">
								<image src="../../../static/enterd.png"></image>
							</view>
							<view class="text-wuer text-lg">主营分类</view>
						</view>
						<view class="flex-treble check-box-input enter-all-right ">
							<input @click="tipsClick('shoptype')" class="text-jiujiujiu text-sm-erliu" :class="{'tips':shoptype == '主营分类不能为空'}" v-model="shoptype" placeholder="例如鞋帽，化妆品等" confirm-type="done"/>
							<text v-if="shoptype == '主营分类不能为空'" class="lg input-icon text-red cuIcon-warn"></text>
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
						<view class="flex-treble check-box-input enter-all-right ">
							<input @click="tipsClick('adminName')" class="text-jiujiujiu text-sm-erliu" :class="{'tips':adminName == '管理员姓名不能为空'}" v-model="adminName" placeholder="您的称呼	" confirm-type="done"/>
							<text v-if="adminName == '管理员姓名不能为空'" class="lg input-icon text-red cuIcon-warn"></text>
						</view>
					</view>
					<view class="flex align-center justify-between enter-all-heigth enter-border-bootom   margin-left">
						<view class="flex flex-twice align-center">
							<view class="enter-left-image margin-right-sm">
								<image src="../../../static/enterg.png"></image>
							</view>
							<view class="text-wuer text-lg">手机号码</view>
						</view>
						<view class="flex-treble check-box-input enter-all-right ">
							<input  @click="tipsClick('phone')" type="number" class="text-jiujiujiu text-sm-erliu" :class="{'tips':phone == '手机号码不能为空'}" v-model="phone" placeholder="输入手机号码" confirm-type="done"/>
							<text v-if="phone == '手机号码不能为空'" class="lg input-icon text-red cuIcon-warn"></text>
							
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
							<view class="entercode-button flex align-center justify-center" @tap="getCode">{{codeTip}}</view>
						</view>
					</view>
				</view>
				
				<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">上传身份证件</view>
				
				<view class="flex align-center margin-top-sm bg-white padding">
					<view class="flex-sub margin-right-sm">
						<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>身份证头像面</view>
						<view class="enterNumber-all" @click="openPhone('idCardOne')">
							<image :src="idCardOne" mode="aspectFit"></image>
						</view>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>身份证国徽面</view>
						<view class="enterNumber-all" @click="openPhone('idBei')">	
							<image :src="idBei" mode="aspectFit"></image>
						</view>
					</view>
				</view>
				
				<view v-if="enterType == 2">
					<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">上传营业执照</view>
					<view class="flex-sub padding bg-white">
						<view class="margin-bottom-lg text-lg"><text class="text-red">*</text>营业执照</view>
						<view style="width: 50%;" @click="openPhone('businessLicense')" class="enterNumber-all">
							<image :src="businessLicense"></image>
						</view>
					</view>
					
					<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">商标信息上传<text class="text-jiujiujiu" >(非必填)</text></view>
					<view class="bg-white">
						<view class="flex align-center enter-all-heigth enter-border-bootom  margin-left">
							<view class="flex flex-twice align-center">
								<view class="text-wuer text-lg">商品商标</view>
							</view>
							<view class="flex-treble enter-all-right ">
								<input class="text-jiujiujiu text-sm-erliu" v-model="brand" placeholder="如：自有商标/授权商标" confirm-type="done"/>
							</view>
						</view>
						<view class="flex align-center enter-all-heigth enter-border-bootom  margin-left">
							<view class="flex flex-twice align-center">
								<view class="text-wuer text-lg">商标注册号</view>
							</view>
							<view class="flex-treble enter-all-right ">
								<input class="text-jiujiujiu text-sm-erliu" v-model="adminCard" placeholder="请输入商标注册号" confirm-type="done"/>
							</view>
						</view>
					</view>
					
					
					<view class="flex align-center padding-left enter-all-heigth bg-white margin-top-sm margin-bottom-sm text-wuer text-bold text-lg">商标注册证明</view>
					<view class="flex-sub padding bg-white">
						<view class="margin-bottom-lg text-lg">上传商标证明</view>
						<view style="width: 50%;" @click="openPhone('trademark')"  class="enterNumber-all">
							<image :src="trademark"></image>
						</view>
					</view>
				</view>
				
				<view class="flex align-center padding-left enter-all-heigth bg-white solid-top margin-bottom-sm text-wuer text-df">
					<view @tap="readClick" :class="[readtype?'text-red-my cuIcon-squarecheckfill':'text-gray cuIcon-squarecheck']" style="font-size: 40upx;" class="lg margin-right-sm"></view>
					<view>我已经阅读并了解了<text class="text-red-my">【入驻申请协议】</text></view>
				</view>
			</view>
			
			<button class="enter-button" @tap="submit">提交申请</button>
			<x-modal v-model="Modalshow" title='提示' text='退出后将不保留填写的信息,确定要退出吗？' @confirm="delAddressClcik" />
		</view>
		<view v-else class="userNodes">
			<text>{{isSubText}}</text>
		</view>
		<x-modal  v-model="show1" title='提示' :text="msg" @cancel="reset" @confirm="reset" />
		 <x-loading text="加载中.." mask="true" click="true" ref="loading"></x-loading>
	</view>
</template>

<script>
	import Modal from '@/components/x-modal/x-modal'
	
	// 导入网络请求
	import {sendCode} from '@/network/login'
	import { isStatus } from '@/network/getProfileData'
	import { upload } from '@/network/sign'
	
	// 商家入驻申请
	import {enterShop} from '@/network/getProfileData'
	
	
	export default{
		components:{
			Modal
		},
		data(){
			return{
				show1:false,
				Modalshow: false,//弹窗打开隐藏
				windowHeight:0,//屏幕高度
				shade:true,//遮罩
				enterType:-1,//商家入驻类型
				shopName:'',//商户名称
				shoptype:'',//主营分类
				adminName:'',//管理人姓名
				phone:'',//手机号码
				code:'',//手机验证码
				idCardOne:'',//身份证正面
				readtype:false,//是否阅读协议
				codeTip:"获取验证码",
				currentTime: '60', //倒数计时
				getCodebutton:false,//防止重复提交
				idBei:'',  //身份证背面 	
				businessLicense:"", //营业执照
				trademark:'' ,//商标图
				brand:'', //商标名称
				adminCard:'',//商标注册号
				token:'',
				isSubmit:false,
				Obj:{},
				isSubText:'',
				msg:'',
				isImgLoad:0,
				idCardOneType:0,
				idBeiType:0,
				businessLicenseType:0,
				trademarkType:0,
				loadingImage:false
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
			if(this.$store.getters.isToken){
				this.token = this.$store.getters.isToken
				this.isStatus(this.token)
			}else{
				uni.showModal({
					title:'您还没有登录哦',
					content:'是否立即去登录',
					success(res) {
						if(res.confirm){
							uni.navigateTo({
								url:'../../login/login'
							})
						}
					}
				})
			}
			
		},
		onReady() {
			if(this.loadingImage == false){
				this.$refs.loading.open()
			}
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
			// 判断当前用户身份
			isStatus(token){
				isStatus(token).then(res => {
					this.$refs.loading.close()
					this.loadingImage = true
					const status  = res.data.data.status
					if(status == '未申请'){
						this.isSubmit = false
					}else{
						if(status == '申请中'){
							this.isSubmit = true
							this.isSubText = '您的提交已经再受理中，请耐心等待审核~~~~'
						}else if(status == '已通过'){
							this.isSubmit = true
							this.isSubText = '恭喜您，已经通过审核,请在我的钱包中查看明细~~~'
						}
						
					}
					
				})
			},
			// 获取验证码倒计时
			getCode(){
				var that = this;
				var currentTime = that.currentTime;
				if((/^1[3456789]\d{9}$/).test(that.phone)){
					if(that.getCodebutton){ return }
					that.getCodebutton = true
					
					// 发送验证码
					sendCode(that.phone).then(res => {
						if(res.data.code == 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast('验证码已发送至您的手机',{duration:'long'})
							// #endif
							var interval = setInterval(function() {
								that.codeTip = (currentTime - 1) + 's'
								currentTime--;
								if (currentTime <= 0) {
									clearInterval(interval)
									that.codeTip = '获取验证码'
									that.getCodebutton = false
								}
							}, 1000)
						}
					})
					
				}else{
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
				}
			},
			// 提交申请
			submit(){
				if(this.readtype){
					if(!this.shopName){
						this.shopName = '商户名称不能为空'
						return false
					}
					if(!this.shoptype){
						this.shoptype = '主营分类不能为空'
						return false
					}
					if(!this.adminName){
						this.adminName = '管理员姓名不能为空'
						return false
					}
					if(!this.phone){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('手机号码不能为空',{duration:'long'})
						// #endif
						return false
					}
					if(!this.code){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('请填写验证码',{duration:'long'})
						// #endif
						return false
					}
					if(!this.businessLicense){
						// // #ifdef APP-PLUS
						// plus.nativeUI.toast('请上传您的营业执照',{duration:'long'})
						// // #endif
						// return false
					}
					if(!this.idCardOne){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('请上传您的身份证人像面',{duration:'long'})
						// #endif
						return false
					}
					if(!this.idBei){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('请上传您的身份证国徽面',{duration:'long'})
						// #endif
						return false
					}
					// idCardOneType:0,
					// idBeiType:0,
					// businessLicenseType:0,
					// trademarkType:0
					if(this.idCardOneType == 1  || this.idBeiType == 1 || this.businessLicenseType == 1 || this.trademarkType == 1){
						// #ifdef APP-PLUS
						plus.nativeUI.toast('请等待图片上传完成',{duration:'long'})
						// #endif
						return false
					}
				}else{
					// #ifdef APP-PLUS
					plus.nativeUI.toast('请认真阅读协议',{duration:'long'})
					return 
					// #endif
				}
					// 发送请求
					const obj = {
						shop_name:this.shopName,
						shop_leal:this.adminName,
						shop_tel:this.phone,
						shop_business_license:this.Obj.businessLicense,
						card_photo:this.Obj.idCardOne,
						card_coat:this.Obj.idBei,
						brand:this.brand || '',
						brand_code:this.adminCard || '',
						brand_img:this.Obj.trademark || '',
						type:this.enterType,
						shop_cate:this.shoptype,
						code:this.code
					}
					
					// 发送提交审核请求
					enterShop(obj,this.token).then(res => {
						if(res.data.code == 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast('提交成功',{duration:'long'})
							// #endif
							this.$store.commit('setUserIsSubmit',true)
							this.isSubmit = true
							this.isSubText = '您的提交已经再受理中，请耐心等待审核~~~~'
						}else{
							this.msg = res.data.msg
							this.show1 = true 
						}
						
						
					})
				
			},
			//选择商家入驻类型
			enterTypeClick(num){
				if(num == 0){
					this.enterType = 1
					uni.setNavigationBarTitle({
					    title: '个人入驻'
					});
				}else if(num == 1){
					this.enterType = 2
					uni.setNavigationBarTitle({
					    title: '企业入驻'
					});
				}
				this.shade = false
			},
			// 发起手机相册请求
			openPhone(item){
				uni.chooseImage({
					count:1,
					success:(res) => {
						this[item] = res.tempFilePaths[0]
						console.log(item)
						this[item+'Type'] = 1
						upload(this.token,res.tempFilePaths[0]).then(res => {
							this.Obj[item] = res.url
							this[item+'Type'] = 2
							console.log(this[item])
						})
					}
				})
			},
			tipsClick(item){
				this[item] = ''
			},
			//确认退出
			delAddressClcik(){
				uni.navigateBack({})
			},
			//阅读协议
			readClick(){
				this.readtype = !this.readtype
			},
			reset(){
				this.shopName = ''
				this.shoptype = ''
				this.adminName = ''
				this.phone = ''
				this.code = ''
				this.idCardOne = ''
				this.idBei = ''
				this.businessLicense = ''
				this.trademark = ''
				this.brand = ''
				this.adminCard = ''
			},
		}
	}
</script>

<style lang="scss">
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
	page{
		height: 100%;
	}
	.page-1{
		height: 100%;
	}
	.is-submit{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $uni-text-color;
		font-size:$uni-font-size-lg ;
	}
	.tips{
		color: #e54d42 !important;
		
	}
	.check-box-input{
		position: relative;
	}
	.input-icon{
		position: absolute;
		right: 15upx;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
