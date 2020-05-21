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
						<input class="input-textlength" v-model="password" @confirm="startLogin" password="true" placeholder="请输入密码" />
					</view>
				</view>
				<view class="login-function">
					<view @tap="showModal">忘记密码？</view>
					<view @tap="forgetClick">新用户注册</view>
				</view>
			</view>
			
			<!-- 登录 防抖 -->
			<wButton v-if="isShowButton" text="登 录" :rotate="isRotate"  @click.native="startLogin()" ></wButton>
		</canvas>
		<x-modal  v-model="show1" title='提示' :text="msg" @cancel="reset" @confirm="reset" />
	</view>
</template>

<script>
	import wButton from '@/components/watch-login/watch-button.vue' //button
	
	// 导入注册方法
	import { login } from '@/network/login'
	
	// 获取个人信息
	import { getProfileData } from '@/network/getProfileData'
	
	// 聊天记录列表
	import  {
		noNetWorkChat,
		noNetWork,
		charCompare
	} 	from '@/utils/chat'
	
	// 导入工具类
	import { replaceImage } from '@/utils/dealUrl'
	
	//保存头像到本地
	import { saveAvatar } from '@/utils/storage'
	
	export default {
		components:{
			wButton
		},
		data() {
			return {
				show1:false,
				windowHeight:0,//屏幕高度
				phone:'',//手机号
				password:'',//密码
				isRotate: false, //是否加载旋转
				modalName:'',//忘记密码
				msg:'',
				isShowButton:true
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
				if(that.password.length < 6){
					uni.showToast({
						title:'密码最少为6位',
						icon:'none'
					})
					return
				}
				that.isRotate = true
				let data = {
					phone:that.phone,
					pwd:that.password
				}

				login(data)
				.catch(res => {
					that.msg = res.data ? res.data.msg : '登陆失败'
					that.show1 = true
					that.isRotate = false
				})
				.then(res => {
					console.log(res)
					if(res.data.code == 200){
						const token = res.data.data.token,
						date = new Date().getTime()						
						// 将登录信息保存格式
						const userInfo = {}
						userInfo.userData = {
							username:that.phone,
							password:that.password
						}
						userInfo.saveTime = date
						
						// 判断缓存列表中有没有这个账号数据
						const userInfoList = uni.getStorageSync('userInfoList') || []
						const dataIndex = userInfoList.findIndex(x => {
							return x == that.phone
						})
						console.log(dataIndex)
						// 如果有则使用缓存的数据，如果没有则存入缓存
						if(~dataIndex){	
							let userInfoStorage = uni.getStorageSync(that.phone)
							// 个人数据存入vuex
							that.$store.commit('setUserData',userInfoStorage.Message_key || {})
							userInfoStorage.userData = userInfo.userData
							userInfoStorage.saveTime = userInfo.saveTime
							// 刷新缓存数据
							uni.setStorage({
								key:that.phone,
								data:userInfoStorage,
								success:() => {
									console.log('刷新缓存成功')
								}
							})
							// 刷新缓存列表
							userInfoList.push(userInfoList.splice(dataIndex,1)[0]) 
							console.log(userInfoList)
							uni.setStorage({
								key:'userInfoList',
								data:userInfoList,
								success:() => {
									console.log('刷新缓存成功')
								}
							})
							
						}else{
							// 个人数据存入缓存
							uni.setStorage({
								key:that.phone,
								data:userInfo,
								success:() => {
									console.log('新建个人缓存数据成功')
								}
							})
							// 缓存列表更新
							userInfoList.push(that.phone)
							uni.setStorage({
								key:'userInfoList',
								data:userInfoList,
								success:() => {
									console.log('缓存列表更新.....')
								}
							})
							
						}
						
						// 将token存储到vuex中
						that.$store.commit('login',token)

						// 读取聊天记录
						that.getUserChatMessages(token)
						
						// 获取用户个人信息，且存入缓存
						// this.getProfileData(token)
						
						// #ifdef APP-PLUS
						plus.nativeUI.toast('登录成功',{duration:'long'})
						// #endif
						uni.switchTab({
							url:'../Home/home'
						})
					}else{
						that.msg = res.data.msg
						that.show1 = true
					}
					that.isRotate = false
				})
				
			},
			//忘记密码
			showModal(){
				uni.navigateTo({
					url:'forget'
				})
			},
			reset(){
				this.password = ''
			},
			
			// 获取用户聊天记录
			getUserChatMessages(token){
				this.$store.dispatch('getUserChatList',token)
				.then(res => {
					// 将数据和缓存中的数据进行对比,返回结果数组
					const resArr = charCompare(res)
					// 将数据存储到vuex中
					this.$store.commit('setUserChatMessages',resArr)
					console.log('获取聊天记录成功，返回合并后的聊天记录')
					console.log(this.$store.state.userChatMessages)
				})
				.catch(err => {
					switch (err) {
						case '1':
							// 连接服务器失败
							noNetWork()
							break
					}
				})
			},
			
			// 获取用户个人信息
			getProfileData(token){
				getProfileData(token).then(res => {
					if(res.data.code == 200){
						const data = res.data.data
						data.avatar = replaceImage(data.avatar)
						// 存入缓存
						uni.setStorage({
							key:'Message_key',
							data,
							success:(res) => {
								console.log('个人信息写入缓存成功')
							}
						})
						// 获取本地头像文件缓存
						const localAvatar = uni.getStorageSync('integrlUrl')
						// 根据缓存路径读取本地文件，判断是否有这个文件
						if(localAvatar){
							uni.getSavedFileInfo({
								filePath:localAvatar,
								success:(res) => {
									if(res.size){
										// 有缓存文件，写入vuex中
										console.log('本地头像路径获取成功')
										this.$store.commit('setLocalAvatar',localAvatar)
										console.log(this.$store.state.userInfo.localAvatar)
									}
								},
								fail:err => {
									// 读取文件失败，执行保存用户网络头像到本地操作
									saveAvatar(data.avatar).then(res => {
										// 存入vuex中
										this.$store.commit('setLocalAvatar',res)
										console.log('网络图片写入本地成功')
									}).catch(err => {
										console.log('本地头像保存失败')
									})
								}
							})
						}else{
							// 读取文件失败，执行保存用户网络头像到本地操作
							saveAvatar(data.avatar).then(res => {
								// 存入vuex中
								this.$store.commit('setLocalAvatar',res)
								console.log('网络图片写入本地成功')
							}).catch(err => {
								console.log('本地头像保存失败')
							})
						}
						
						// 个人数据存入vuex
						this.$store.commit('setUserData',data)
							
					}
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
