// 登录注册相关的方法方法
import http from '@/common/http.js'

// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 获取个人信息
export function getProfileData(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/my'),
		header:{
			token,
		}
	})
}

// 获取用户所有地址
export function getProfileAllAddress(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_address_list'),
		header:{
			token
		},
		method:"GET"
	})
}

// 添加、修改收货地址
export function addAddress(data,token) {
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/edit_user_address'),
		data:{
			id:data.id,
			is_default:data.is_default,
			real_name:data.real_name,
			post_code:data.post_code,
			phone:data.phone,
			detail:data.detail,
			address:data.address
		},
		header:{
			token
		},
		method:"POST"
	})
}

// 获取个人优惠信息
export function getUserDiscount(types,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/coupons_api/get_use_coupons'),
		data:{
			types
		},
		header:{
			token
		}
	})
}

// 获取用户默认收货地址
export function getAddress(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_default_address'),
		header:{
			token:token
		},
		method:"GET"
	})
}

// 获取用户所有收货地址
export function getAllAddress(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_address_list'),
		header:{
			token:token
		},
		method:'GET'
	})
}

// 设置用户默认收货地址
export function setDefaultAddress(addressId,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/set_user_default_address'),
		data:{
			addressId:addressId
		},
		header:{
			token
		},
		method:"GET"
	})
}