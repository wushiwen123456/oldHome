<template>
	<view class="content">
		<canvas disable-scroll="true" class="text-width" :style="{height:windowHeight + 'px'}">
			<!-- 头部图片 -->
			<view class="login-image">
				<image src="../../static/logo/logo.png"></image>
			</view>
			<!-- 表单 -->
			<view>
				<view class="login-all">
					<view class="login-message">
						<image src="../../static/phone.png"></image>
						<input class="input-textlength" confirm-type="done" v-model="phone" placeholder="请输入手机号码" />
					</view>
				</view>
				<view class="login-all">
					<view class="flex align-center justify-between">
						<view class="login-message">
							<image src="../../static/name.png"></image>
							<input class="input-textlength" v-model="code" placeholder="请输入验证码" />
						</view>
						<view  class="solid-left">
							<view class="margin-left" @tap="getCode">{{codeTip}}</view>
						</view>
					</view>
				</view>
				<view class="login-all">
					<view class="login-message">
						<image src="../../static/password.png"></image>
						<input class="input-textlength" confirm-type="done" v-model="password" password="true" placeholder="请输入密码" />
					</view>
				</view>
				<view class="login-all">
					<view class="login-message">
						<image src="../../static/name.png"></image>
						<input class="input-textlength" confirm-type="done" v-model="nickname" placeholder="实名认证" />
					</view>
				</view>
				<view @tap="shopTypeClick" class="login-all">
					<view class="login-message">
						<image src="../../static/nannv.png"></image>
						<input class="input-textlength" disabled :value="sex" placeholder="请选择性别" />
					</view>
				</view>
				<view class="login-all">
					<view class="login-message">
						<image src="../../static/idnum.png"></image>
						<input class="input-textlength" confirm-type="done" v-model="idnum" type="idcard" placeholder="输入身份证号" />
					</view>
				</view>
			</view>
			
			<!-- 登录 防抖 -->
			<wButton text="注 册" :rotate="isRotate"  @click.native="startLogin()" ></wButton>
			
			<!-- 男女选择 -->
			<w-picker mode="selector" :defaultVal="[0]" @confirm="onConfirm" ref="picker" themeColor="#f00" :selectList="selectList"></w-picker>
			
		</canvas>
		
		
	</view>
</template>

<script>
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import wPicker from "@/components/w-picker/w-picker.vue";
	
	// 注册,发送验证码方法：
	import {register,sendCode} from '@/network/login'
	
	// 判断按钮是否加载中
	import {loading} from '@/utils/dealUrl.js'
	
	export default {
		components:{
			wButton,
			wPicker
		},
		data() {
			return {
				windowHeight:0,//屏幕高度
				phone:'',//手机号
				password:'',//密码
				nickname:'',//姓名
				idnum:'',//身份证号
				men:-1,//0男？1女
				isRotate: false, //是否加载旋转
				selectList:[{
					label:"男",
					value:0
				},{
					label:"女",
					value:1
				}],
				sex:'',//男女
				code:'',//验证码,
				codeTip:"获取验证码",
				currentTime: '60', //倒数计时
				getCodebutton:false,
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
		methods: {
			// 验证码发送
			getCode(){
				var that = this;
				var currentTime = that.currentTime;
				if((/^1[3456789]\d{9}$/).test(that.phone)){
					if(that.getCodebutton){ return }
					that.getCodebutton = true
					
					// 发送验证码
					sendCode(that.phone).then(res => {
						if(res.data.code == 200){
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
			//注册
			startLogin(){
				var that = this
				// 防抖动
				if(that.isRotate) return
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return
				}
				console.log(that.password.length)
				if(that.password.length < 6){
					uni.showToast({
						title:'密码最少为6位',
						icon:'none'
					})
					return
				}
				var regName =/^[\u4e00-\u9fa5]{2,4}$/;  
				if(!regName.test(that.nickname)){
					uni.showToast({
						title:'请输入真实姓名',
						icon:'none'
					})
					return
				}
				if(that.men < 0){
					uni.showToast({
						title:'请选择性别',
						icon:'none'
					})
					return
				}
				let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
				if(!(reg.test(this.idnum))){  
					uni.showToast({
						title:'请输入正确的身份证号',
						icon:'none'
					})
				    return false
				}
				that.isRotate = true
				
				setTimeout(function(){
					that.isRotate = false
				},3000)
				
				let data = {
					phone:that.phone,
					pwd:that.password,
					name:that.nickname,
					card:that.idnum,
					sex:that.men,
					code:that.code
				}
				register(data).then(res => {
						// 注册成功,跳转到登录
						uni.navigateTo({
							url:`login?phone=${data.phone}`,
						})
				}).catch(res => {
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				})
				
			},
			//男女选择开关
			shopTypeClick(){
				this.$refs.picker.show();
			},	
			//选择男女
			onConfirm(val){
				console.log(JSON.stringify(val))
				this.sex= val.result
				this.men = val.checkArr.value
				console.log(this.men)
			},
			codeTap(){
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
				}else{
					sendCode(this.phone).then(res => {
						if(res.data.code == 200){
							this.isSend = true
							let t = setInterval(()=> {
								if(this.downTime != 0){
									this.downTime--
								}else{
									clearInterval(t)
									this.isSend =false
									return 
								}
							},1000)
							this.downTime = 60
							
						}else{
							uni.showToast({
								title:'未知错误',
								icon:'none'
							})
						}
					})
				}
				
			}
			
			
		},
		computed:{
			codeText(){
				if(!this.isSend){
					return '发送验证码'
				}else{
					return '等待中'+this.downTime
				}
			}
		}
	}
</script>

<style>
	
	.content{
		background: #FFFFFF;
		min-height: 100vh;
	}
	.login-image{
		border-top: #E1E1E1 2upx solid;
		padding-top: 60upx;
		text-align: center;
	}
	.login-image image{
		height: 134upx;
		width: 134upx;
		border-radius: 20upx;
		-webkit-box-reflect: below 0px -webkit-linear-gradient(bottom, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 100%);
	}
	.login-all{
		border-bottom: #DCDCDC 2upx solid;
		margin: 19upx 56upx;
	}
	.login-message{
		display: flex;
		align-items: center;
		padding: 20upx 0;
		position: relative;
	}
	.login-message image{
		height: 40upx;
		width: 40upx;
		margin-right: 20upx;
	}
	.login-message input{
		font-size: 30upx;
		color: #525253;
	}
	.login-function{
		padding:0 56upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #727272;
	}
	.picker{
		color: grey;
	}
	.input-textlength{
		width: 90%;
	}
</style>
