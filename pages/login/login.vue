<template>
	<view class="content-logoin">
		<canvas disable-scroll="true" class="text-width" :style="{height:windowHeight + 'px'}">
			<!-- 头部图片 -->
			<view class="login-image">
				<image src="/static/logo/logo.png"></image>
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
					<view class="login-message">
						<image src="../../static/password.png"></image>
						<input class="input-textlength" v-model="password" password="true" placeholder="请输入密码" />
					</view>
				</view>
				<view class="login-function">
					<view @tap="showModal">忘记密码？</view>
					<view @tap="forgetClick">新用户注册</view>
				</view>
			</view>
			
			<!-- 登录 防抖 -->
			<wButton text="登 录" :rotate="isRotate"  @click.native="startLogin()" ></wButton>
		</canvas>
		
	</view>
</template>

<script>
	import wButton from '@/components/watch-login/watch-button.vue' //button
	
	// 导入注册方法
	import { login } from '@/network/login'

	export default {
		components:{
			wButton
		},
		data() {
			return {
				windowHeight:0,//屏幕高度
				phone:'',//手机号
				password:'',//密码
				isRotate: false, //是否加载旋转
				modalName:'',//忘记密码
			}
		},
		onLoad(option) {
			if(!!Object.keys(option).length){
				this.phone = option.phone
				
			}
			
			var that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.windowHeight = res.windowHeight
			        console.log('屏幕高度为'+res.windowHeight);
			    }
			});
			
		},
		computed:{
			
		},
		methods: {
			//注册
			forgetClick(){
				uni.navigateTo({
					url:'register'
				})
			},
			//登录
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
				console.log(that.password.length)
				if(that.password.length < 6){
					uni.showToast({
						title:'密码最少为6位',
						icon:'none'
					})
					return
				}
				that.isRotate = true
				setTimeout(function() {that.isRotate = false}, 5000);
				let data = {
					phone:that.phone,
					pwd:that.password
				}
				console.log(this.$store.state.userInfo)

				login(data).then(res => {
						const token = res.data.data.token
						uni.setStorage({
							key:"token",
							data:token,
						})
						this.$store.commit('login',token)
						uni.showToast({
							title:'登录成功',
							icon:'none'
						})
						const pages  = getCurrentPages()
						if(pages.length == 1){
							uni.switchTab({
								url:"../Home/home"
							})
						}else{
							uni.navigateBack()
						}
				}).catch(res => {
					if(res.data.code == 400){
						uni.showToast({
							title:'用户名或密码错误',
							icon:'none'
						})
						this.phone = ''
						this.password = ''
					}
				})
			},
			//忘记密码
			showModal(){
				uni.navigateTo({
					url:'forget'
				})
			},
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
	.login-function{
		padding:0 56upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26upx;
		color: #727272;
	}
	.password-edit{
		font-size: 50upx;
		color: #D92319;
	}
	.input-textlength{
		width: 90%;
	}
</style>
