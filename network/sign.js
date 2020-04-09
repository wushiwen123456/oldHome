var http = 'http://jn.51kdd.com/'

// 引入ajax
import http2 from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 引入计算时间方法
import  { getTimeUntilNow } from '@/utils/dealData'

/**
 * 签到页面所需数据
 */

export function sign_index(token,loading=false) {
if (loading) uni.showLoading({title: '加载中...'})

return new Promise(function(resolve,reject) {
	uni.request({
		url: http +'ebapi/user_api/sign_index',
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			'token': token
		},
		success: res => {
			if(res.data.code == 200){
				let data = res.data.data
				resolve(data)
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		},
		fail: (err) => {
			reject(err)
		},
		complete() {
			if (loading) uni.hideLoading()
		}
	})
})
}


/**
 * 签到接口
 */
export function sign(token,loading=false) {
if (loading) uni.showLoading({title: '加载中...'})

return new Promise(function(resolve,reject) {
	console.log(http)
	uni.request({
		url: http +'ebapi/user_api/sign',
		method: 'GET',
		header: {
			'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			'token': token
		},
		success: res => {
			if(res.data.code == 200){
				let data = res.data.data
				resolve(data)
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'none'
				})
			}
		},
		fail: () => {
		},
		complete() {
			if (loading) uni.hideLoading()
		}
	})
})
}


// 上传图片接口
export function upload(token,_url,show = false)  {
	console.log(_url)
	return new Promise(function(resolve,reject) {
		const url = http +'ebapi/public_api/upload'
		console.log(token)
	uni.uploadFile({
		url: url,
		filePath: _url,
		header: {
			'token': token
		},
		name:'specialname',
		formData: {
			'filename': 'specialname',
		},
		success: res => {
			const _data = res.data
			let data = JSON.parse(_data)
			if(data.code == 200){
				if(!show){
					uni.showToast({
						title:data.msg,
						icon:'none'
					})
				}
				resolve(data.data)
			} else {
				if(!show){
					uni.showToast({
						title:data.msg,
						icon:'none'
					})
				}
			}
		},
		files:(err) => {
			console.log(err)
		}
	})
	})
}

/**
 * 首页新品,搜索分页,分类列表接口
 * @param {Object} data
 */
export function get_product_list(data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/store_api/get_product_list',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

export function test(data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'admin/liao/test',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

export function send_message(data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'admin/liao/send_message',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			},
			data:data,
			success: res => {
				resolve(res)
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

/**
 * 聊天记录接口
 */
export function get_service_message(token,data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/get_service_message',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}
/**
 * @param {token} String
 * @param {group_id} String
 * 聊天记录删除接口
 */
export function removeChatMessages(group_id,token){
	console.log()
	return http2({
		url:replaceImage('http://www.test.com/ebapi/user_api/remove_message'),
		data:{
			group_id
		},
		header:{
			token
		},
		showModel:true
	})
}
/**
 * 个人信息修改
 */
export function edit_user(token,data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/edit_user',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					resolve(data)
				}else{
					// #ifdef APP-PLUS
					plus.nativeUI.toast(res.data.msg,{duration:'long'})
					// #endif
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

/**
 * 用户积分兑换记录
 */
export function user_integral(token,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/user_integral',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					data.forEach(function(item){
						var date = new Date(item.pay_time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						var Y = date.getFullYear() + '年';
						var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
						var D = date.getDate() + '日 ';
						var h = date.getHours() + ':';
						var m = date.getMinutes();
						item.pay_time = Y + M + D + h + m ;
						item.popu = false
					})
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

/**
 * 用户积分兑换记录删除
 */
export function user_integral_remove(token,data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/user_integral_remove',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

/**
 * 浏览记录
 */
export function user_visit(token,data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/user_visit',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res.data.data
					data.forEach(function(item){
						var date = new Date(item.add_time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						// var Y = date.getFullYear() + '年';
						// var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
						// var D = date.getDate() + '日 ';
						// var h = date.getHours() + ':';
						// var m = date.getMinutes();
						// item.add_time = Y + M + D + h + m ;
						item.add_time = getTimeUntilNow(item.add_time)
						item.popu = false
						item.info.image = replaceImage(item.info.image)
					})
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}



/**
 * 浏览记录删除
 */
export function remove_visit(token,data,loading) {
	if(loading) loading.open()
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/remove_visit',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) loading.close()
			}
		})
	})
}

/**
 * 用户确认收货接口
 */
export function user_take_order(token,data,loading) {
	if(loading) uni.showLoading({title:'确认收货中'})
	return new Promise(function(resolve,reject) {
		uni.request({
			url: http +'ebapi/user_api/user_take_order',
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
				'token': token
			},
			data:data,
			success: res => {
				if(res.data.code == 200){
					let data = res
					resolve(data)
				}
			},
			fail: () => {
			},
			complete() {
				if(loading) uni.hideLoading()
			}
		})
	})
}