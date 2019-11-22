const http = (options) => {
	console.log(options)
	return new Promise((resolve,reject) => {
		uni.showLoading({
			title:'加载中...',
			// 是否显示透明蒙层，防止触摸穿透，默认：false
			mask:true
		})
		uni.request({
			method:options.method,
			url:options.url,
			data:options.data,
			header:options.header,
			success:(res) => {
				// console.log(JSON.stringify(res)+'_______________________________')
				resolve(res)
			},
			fail:(res) => {
				reject(err)
				let code = err.data.code
				switch (code) {
					case 1000:
					
					//
					break
					case 1001:
					
					//
					break
				}
			},
			complete:() => {
				uni.hideLoading()
			}
		})
	})
}
export default http