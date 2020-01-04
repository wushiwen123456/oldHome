<template>
	<view class="content-logoin">
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
						<input class="input-textlength" v-model="phone" placeholder="请输入手机号码" />
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
						<input class="input-textlength" v-model="password" password="true" placeholder="请重置密码" />
					</view>
				</view>
			</view>
			<!-- 登录 防抖 -->
			<wButton text="重 置" :rotate="isRotate"  @click.native="startLogin()" ></wButton>
		</canvas>
		<x-modal v-model="show1" title="提示" :text="msg" @cancel="reset" @confirm="reset"/>
	</view>
</template>

<script>
	import wButton from '@/components/watch-login/watch-button.vue' //button
	
	// 注册,发送验证码方法：
	import {resetPwd,sendCode} from '@/network/login'
	export default {
		components:{
			wButton
		},
		data() {
			return {
				windowHeight:0,//屏幕高度
				phone:'',//手机号
				password:'',//密码
				code:'',//验证码
				isRotate: false, //是否加载旋转
				modalName:'',//忘记密码
				codeTip:"获取验证码",
				currentTime: '60', //倒数计时
				getCodebutton:false,//防止重复提交
				show1:false,
				msg:''
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
			// 改密方法
			startLogin(){
				var that = this
				// 防抖动
				if(that.isRotate) return
				if(!(/^1[3456789]\d{9}$/.test(that.phone))){
					uni.showToast({
						title:'手机号格式有误',
						icon:'none'
					})
					return
				}
				if(that.password.length < 6){
					uni.showToast({
						title:'密码最少为6位',
						icon:'none'
					})
					return
				}
				if(!that.code.length){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return
				}
				that.isRotate = true
				let data = {
					phone:that.phone,
					pwd:that.password,
					code:that.code
				}
				
				resetPwd(data).then(res => {
						if(res.data.code == 200){
							// #ifdef APP-PLUS
							plus.nativeUI.toast('重置密码成功',{duration:'long'})
							// #endif
							that.isRotate = false
							uni.navigateBack()
						}else{
							this.msg = res.data.msg
							this.show1 = true
							that.isRotate = false
						}
				}).catch(res => {
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				})
			},
			reset(){
				this.password = ''
			}
		}
	}
</script>

<style>
	.content-logoin{
		background: #FFFFFF;
		height: 100vh;
	}
	.login-image{
		border-top: #E1E1E1 2upx solid;
		padding-top: 60upx;
		text-align: center;
	}
	.login-image image{
		height: 134upx;
		width: 134upx;
		border-radius: 30upx;
		-webkit-box-reflect: below 0px -webkit-linear-gradient(bottom, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 100%);
	}
	.login-all{
		border-bottom: #DCDCDC 2upx solid;
		margin: 19upx 56upx;
	}
	.login-message{
		display: flex;
		align-items: center;
		padding: 40upx 0;
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
	.password-edit{
		font-size: 50upx;
		color: #D92319;
	}
	.input-textlength{
		width: 90%;
	}
</style>

