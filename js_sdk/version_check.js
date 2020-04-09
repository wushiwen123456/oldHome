import { app_update } from '@/network/login.js'

//版本信息
					function getVersion(show){
						if(show){
							uni.showLoading({
								title:'加载中',
								mask:true
							})
						}
						console.log('开始请求最高版本')
						// #ifdef APP-PLUS
						app_update().then(res =>{
							let VersionUrlMessage = res.data.data
							 
							// var localVersion = plus.runtime.version.split('.').join('') * 1 
							console.log('版本号' + plus.runtime.versionCode)
							var localVersion = plus.runtime.versionCode
							console.log('当地版本' + localVersion)
							console.log('网络版本' + VersionUrlMessage.num)
							if( Math.floor(VersionUrlMessage.num * 10)  > localVersion ){
								uni.showModal({
									title:'更新提醒',
									content:'发	现新版本,是否进行更新？',
									success: function (res) {
										if (res.confirm) {
											let url= VersionUrlMessage.upUrl
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
																installbutton(res.savedFilePath);  
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
								
							}else{
								if(show){
									plus.nativeUI.toast('已经是最新版本了',{duration:'long'})
									uni.hideLoading()
								}
							}
						})
						// #endif
					}
					//安装
					function installbutton(path){
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
					}
					
export {getVersion}