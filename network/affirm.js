// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 获取订单详情
export function getAffirmInfo(cartId,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/chai_order'),
		data:{
			cartId
		},
		header:{
			token
		},
		method:"POST"
	})
}

// 获取用户默认收货地址
export function getAddress(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_default_address'),
		header:{
			token
		},
		method:"GET"
	})
}

// 获取用户所有收货地址
export function getAllAddress(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_address_list'),
		header:{
			token
		},
		method:'GET'
	})
}