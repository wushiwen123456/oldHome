<script>
import { replaceImage } from '@/utils/dealUrl'
import { app_update } from '@/network/login.js'
import Vue from 'vue'
	export default {
		data(){
			return {
				localVersion:''
			}
		},
		onLaunch: function() {
			const value = uni.getStorageSync('token')
			if(value){
				this.$store.commit('login',value)
				uni.setStorageSync(
					'token',
					value
				)
			}
			else{
				uni.reLaunch({
					url:'pages/login/login'
				})
			}
			// 获取版本号
			this.getVersion()
			
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
						var that = this;
						console.log('开始请求最高版本')
						// #ifdef APP-PLUS
						app_update().then(res =>{
							that.VersionUrlMessage = res.data.data
							 
							var localVersion = plus.runtime.version.split('.').join('') * 1 
							console.log(Math.floor(that.VersionUrlMessage.num * 100))
							console.log(localVersion)
							if( Math.floor(that.VersionUrlMessage.num * 100)  > localVersion ){
								uni.showModal({
									title:'更新提醒',
									content:'发现新版本,是否进行更新？',
									success: function (res) {
										if (res.confirm) {
											let url= that.VersionUrlMessage.upUrl
											console.log(url);
											console.log('用户点击确定');
											plus.nativeUI.toast('已在后台开始下载任务',{duration:'long'})
											const downloadTask = uni.downloadFile({
												url: url, 
												success: (res) => {
													if (res.statusCode === 200) {
														uni.saveFile({
															tempFilePath: res.tempFilePath,
															success: function (res) {
																that.installbutton(res.savedFilePath);  
															}
														});
													}
												},
												fail: (fail) =>{
													console.log('接口请求返回的fail:');
													console.log(fail);
													uni.showToast({
														title:'下载失败'
													})
												}
											});
											
											// let begin = new Date().getTime()
											// let gap = 2000
											// downloadTask.onProgressUpdate((res) => {
											// 	let now = new Date().getTime()
											// 	if (now - begin > gap || res.progress == 100){
											// 		that.loadingPlan = res.progress
											// 	}
											// })
										} else if (res.cancel) {
											console.log('用户点击取消');
											// plus.runtime.quit();
											console.log('取消后退出应用');
										}
									}
								})
								
							}
						})
						// #endif
					},
					//安装
					installbutton(path){
						 plus.runtime.install(path, {  
							force: true  
						}, function () {   
							console.log("加载完成！");  
							uni.navigateBack({  
								delta: 1,  
							});  
						}, function (e) {  
					
							console.log(JSON.stringify(e));  
					
						}); 
					},

		            // 检查是否安卓
		            isandroid(){
		                var that = this;
		                uni.getSystemInfo({  
		                    success:(res) => {  
		                        if(res.platform=="android"){ 
		                            that.AndroidCheckUpdate();  
		                        }  
		                    }  
		                }) 
		            },
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
