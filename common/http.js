const http = (options) => {
	console.log(options)
	if(options.mask != false){
		options.mask = true
	}
	return new Promise((resolve,reject) => {
		if(!options.hideModel){
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
					reject(res)
				}
				
			},
			fail:(err) => {
				reject(err)
			},
			complete:() => {
				if(!options.hideModel){
					uni.hideLoading()
				}
			}
		})
	})
}
export default http