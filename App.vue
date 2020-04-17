<script>
import { getVersion } from 'js_sdk/version_check.js'
import  {
	noNetWorkChat,
	noNetWork,
	charCompare
} 	from '@/utils/chat'
import computedTime from 'utils/computedTime'
	// 导入登录方法
import { login } from '@/network/login'
	// 获取个人信息
import { getProfileData } from '@/network/getProfileData'

// 导入工具类
import { replaceImage } from '@/utils/dealUrl'

//保存头像到本地
import { saveAvatar } from '@/utils/storage'

import Vue from 'vue'
	export default {
		data(){
			return {
				localVersion:''
			}
		},
		onLaunch(){
			// 获取本地用户缓存列表
			const userInfoList = uni.getStorageSync('userInfoList')
			
			// 判断本地缓存是否有数据
			if(userInfoList.length){
				let userInfo = uni.getStorageSync(userInfoList[userInfoList.length - 1])
				console.log(userInfo)
				// 获取本地最后一个用户的缓存
				// let userInfo = allUserInfo[userKeys[userKeys.length - 1]]
				// 获取上次一保存时间
				const saveTime = userInfo.saveTime,
				dealTime = computedTime(saveTime)//计算上次保存的时间
				
				// 没有超过7天
				if(dealTime){
					const userData = userInfo.userData
					// 执行登录方法
					let data = {
						phone:userData.username,
						pwd:userData.password
					}
					login(data).then(res => {
						if(res.data.code == 200){
							console.log('异步登录成功')
							// 刷新储存信息token
							const token = res.data.data.token,
							date = new Date().getTime()
							// uni.setStorage({
							// 	key:"userData",
							// 	data:{
							// 		token:token,
							// 		username:data.phone,
							// 		password:data.pwd,
							// 		saveTime:date
							// 	},
							// })
							userInfo.saveTime = date
							// 将token存储到vuex中
							this.$store.commit('login',token)

							// 读取缓存中的个人信息，并存入vuex
							// this.saveProfile(token,userInfo)
							// 个人数据存入vuex
							this.$store.commit('setUserData',userInfo.Message_key || {})
							// 读取聊天记录
							this.getUserChatMessages(token)		
							console.log(this.$store.state)
						}else{
							// #ifdef APP-PLUS
							plus.nativeUI.toast('连接服务器失败',{duration:'long'})
							// #endif
							console.log('异步登录失败，请重新登陆')
							// uni.reLaunch({
							// 	url:'pages/login/login'
							// })
						}
					})
				}else{
					// 超过7天，跳转到登录
					// #ifdef APP-PLUS
					plus.nativeUI.toast('登录已失效，请重新登录',{duration:'long'})
					// #endif
					console.log('缓存时间已超时，请登录')
					// // 清理用户缓存
					// uni.removeStorage({
					// 	key:'userInfo'
					// })
					uni.reLaunch({
						url:'pages/login/login'
					})
				}
				
				
				
			}else{
				// 清理用户缓存
				// uni.removeStorage({
				// 	key:'Message_key'
				// })
				uni.reLaunch({
					url:'pages/login/login'
				})
			}
			// 获取版本号
			this.getVersion()
			// 商铺消息监听
			this.monitorMessages()
			
			// colorUI相关
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			Vue.prototype.ColorList = [{
					title: '嫣红',
					name: 'red',
					color: '#e54d42'
				},
				{
					title: '桔橙',
					name: 'orange',
					color: '#f37b1d'
				},
				{
					title: '明黄',
					name: 'yellow',
					color: '#fbbd08'
				},
				{
					title: '橄榄',
					name: 'olive',
					color: '#8dc63f'
				},
				{
					title: '森绿',
					name: 'green',
					color: '#39b54a'
				},
				{
					title: '天青',
					name: 'cyan',
					color: '#1cbbb4'
				},
				{
					title: '海蓝',
					name: 'blue',
					color: '#0081ff'
				},
				{
					title: '姹紫',
					name: 'purple',
					color: '#6739b6'
				},
				{
					title: '木槿',
					name: 'mauve',
					color: '#9c26b0'
				},
				{
					title: '桃粉',
					name: 'pink',
					color: '#e03997'
				},
				{
					title: '棕褐',
					name: 'brown',
					color: '#a5673f'
				},
				{
					title: '玄灰',
					name: 'grey',
					color: '#8799a3'
				},
				{
					title: '草灰',
					name: 'gray',
					color: '#aaaaaa'
				},
				{
					title: '墨黑',
					name: 'black',
					color: '#333333'
				},
				{
					title: '雅白',
					name: 'white',
					color: '#ffffff'
				},
			]
			
			
		},
		onHide: function() {
			console.log('App Hide')
		},
		onShow() {
			 // #ifdef APP-PLUS
			 var args= plus.runtime.arguments;
			     if(args){  
			         // 处理args参数，如直达到某新页面等  
			 		console.log(args)
			     } 
			// #endif
		},
		methods: {
			//版本信息
			getVersion(){
				getVersion()
			},
			/*
				待修改
				userInfo{
					userData:{}//用户账号数据
					message_key:{}//用户信息数据
					avatarUser:{}//用户头像数据
				}
			*/
			// 获取用户个人信息，存储到vuex中
			saveProfile(token,userInfo){
				getProfileData(token).then(res => {
					if(res.data.code == 200){
						const data = res.data.data
						data.avatar = replaceImage(data.avatar)
						// // 存入缓存
						// uni.setStorage({
						// 	key:'Message_key',
						// 	data,
						// 	success:(res) => {
						// 		console.log('个人信息写入缓存成功')
						// 	}
						// })
						// const obj = UserInfo
						
						// 获取本地头像文件缓存
						// const localAvatar = uni.getStorageSync('integrlUrl')
						const localAvatar = userInfo.Message_key.localAvatar
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
										data.localAvatar = res
									}).catch(err => {
										console.log('本地头像保存失败')
									})
								}
							})
						}else{
							// #ifdef APP-PLUS
							// 读取文件失败，执行保存用户网络头像到本地操作
							saveAvatar(data.avatar).then(res => {
								// 存入vuex中
								this.$store.commit('setLocalAvatar',res)
								// 存入缓存对象中
								userInfo.Message_key.localAvatar = res
							}).catch(err => {
								console.log('本地头像保存失败')
							})
							//  #endif
						}
						// 刷新缓存中的用户数据
						userInfo.Message_key = {...data}
						
						// 个人数据存入vuex
						this.$store.commit('setUserData',data)
						console.log(data)
					}
				})
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
			
			// 监听Scoket消息
			monitorMessages(){
				console.log('开始监听消息')
				uni.$on('getMessage' , (res)=> {
					console.log('消息监听成功，已发送至vuex存储')
					this.$store.commit('dealSocketMessage',res)
				})
			}
					
		}	
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	video{
		position: relative;
		z-index: -1;
	}
	.havor-class{
		background-color: #f5f5f5;
	}
	.base-bgc{
		background-color: #CD3233;
	}
	.userNodes{
		height: 350upx;
		color: #8C8C8C;
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.empty-img{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.inputstyle{
		width: 100%;
	}
	.loading-oldhome{
		width: 100%;
		height: 100%;
		background-color: #f00;
	}
	.loading{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 150upx;
			height: 150upx;
			position: relative;
			border-radius: 50%;
		}
	}
	.load-img::before,.load-img::after{
		content:'';
		display: block;
		position: absolute;
		width: 100%;
		height: 0;
		z-index: 999;
		background-color: rgba(0,0,0,.8);
	}
	.load-img::before{
		animation: loaderrrr 2s linear infinite;
	}
	@keyframes loaderrrr {
		0%{
			height: 100%;
		}
		100%{
			height: 0%;
		}
	}
	.tab-bar-bottom{
		width: 290upx;
		justify-content: space-around;
		.tab-bar-item{
			width: 80upx;
		}
	}
</style>
