	// 获取个人信息
	import { saveFiles } from '@/network/getProfileData'
	// 用户头像存储到本地
	export function saveAvatar(avatar){
		// 把头像储存到本地
		console.log(avatar)
		// #ifdef APP-PLUS
		return new Promise((resolve,reject) => {
			saveFiles(avatar).then(res => {
				if(res.statusCode == 200){
					console.log('临时保存头像成功')
					const path = res.tempFilePath
					uni.saveFile({
						tempFilePath:path,
						success(res2) {
							var savedFilePath = res2.savedFilePath
							console.log('本地头像保存成功' + savedFilePath)
							// 保存到缓存
							uni.setStorage({
								key:'integrlUrl',
								data:savedFilePath
							})
							console.log('缓存保存成功')
							resolve(savedFilePath)
						},
						fail:(err2)=> {
							plus.nativeUI.toast(err2,{duration:'long'})
							reject()
						}
					})
				}
			}).catch(err => {
				plus.nativeUI.toast(err,{duration:'long'})
				reject()
			})
		})
				
		// #endif
	}