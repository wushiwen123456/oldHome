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

// 保存用户头像
export function saveFiles(url){
	
	return new Promise((resolve,reject) => {
		uni.downloadFile({
			url:url,
			header:{
				'content-type': 'application/x-www-form-urlencoded'
			},
			success:(res) => {
				resolve(res)
			},
			fail:(err) => {
				reject(err)
			}
		})
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
// 获取当前用户入驻信息
export function isStatus(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/apply_status'),
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
		method:"GET",
		hideModel:true
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

// 删除用户地址方法
export function removeAddress(addressId,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/remove_user_address'),
		data:{
			addressId
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 获取用户的收藏
export function profileCollect(page,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/get_user_collect_product'),
		data:{
			limit:5,
			page
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 获取收藏店铺列表
export function getCollectStore(page,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/shop_collect_list'),
		data:{
			limit:5,
			page
		},
		header:{
			token
		}
	})
}

// 个人订单
export function userOrder(type,page,limit,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/get_user_order_list'),
		data:{
			type:type,
			page,
			limit,
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 获取用户优惠券
export function getUserDiscounts(types,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/coupons_api/get_use_coupons'),
		data:{
			types
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 获取用户拼团信息
export function myPooking(type,token){
	if(type) {
		return http({
			url:replaceImage('http://www.test.com/ebapi/user_api/get_user_pink'),
			data:{
				type
			},
			header:{
				token
			}
		})
	}else {
		return http({
			url:replaceImage('http://www.test.com/ebapi/user_api/get_user_pink'),
			header:{
				token
			}
		})
	}
	
}
// 获取用户积分
export function userIntegral(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_integral_list'),
		header:{
			token
		}
	})
}

// 商户入驻申请
export function enterShop(data,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/enter_shop'),
		data:{
			...data
		},
		header:{
			token
		},
		method:"POST"
	})
}

// 聊天列表
export function chatList(token){
	return http({
		url:replaceImage('http://jn.51kdd.com/ebapi/user_api/get_liao_list'),
		header:{
			token
		}
	})
}

// 聊天数据
export function chatData(token,group_id){
	return http({
		url:replaceImage('http://jn.51kdd.com/ebapi/user_api/get_service_message'),
		data:{
			group_id
		},
		header:{
			token
		}
	})
}

// 用户提现接口
export function userTiXian(data,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_extract'),
		data:{
			...data
		},
		header:{
			token
		},
		method:"POST"
	})
}

// 余额明细
export function userBalance(page,limit,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_money_list'),
		data:{
			page,
			limit
		},
		header:{
			token
		}
	})
}

export function userRefund(page,limit,token){
	return http({
		url:replaceImage('http://jn.51kdd.com/ebapi/user_api/order_after_list'),
		data:{
			page,limit
		},
		header:{
			token
		}
	})
}