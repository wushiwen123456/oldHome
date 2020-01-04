const http = (options) => {
	console.log(options)
	if(options.mask != false){
		options.mask = true
	}
	return new Promise((resolve,reject) => {
		if(options.showModel){
			uni.showLoading({
				title:'加载中...',
				// 是否显示透明蒙层，防止触摸穿透，默认：false
				mask:options.mask 
			})
		}
		uni.request({
			method:options.method,
			url:options.url,
			data:options.data,
			header:options.header,
			success:(res) => {
				const code = res.data.code
				if(res){
					resolve(res)
				}else{
					// #ifdef APP-PLUS
					plus.nativeUI.toast('连接服务器失败',{duration:'long'})
					// #endif
					reject(res)
				}
				
			},
			fail:(err) => {
				reject(err)
			},
			complete:() => {
				if(options.showModel){
					uni.hideLoading()
				}
			}
		})
	})
}
export default http