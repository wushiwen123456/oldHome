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
		method:"POST",
	})
}

// 提交订单
export function placeOrder(str,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/chai_create_order'),
		data:{
			str
		},
		header:{
			'content-type': 'application/x-www-form-urlencoded',
			token
		},
		method:"POST",
		showModel:true	
	})
} 


// 订单详情:
export function detailOrder(order_id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/get_order_pay_info'),
		data:{
			order_id
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 取消订单
export function cancelOrder(order_id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/cancel_order'),
		data:{
			order_id
		},
		header:{
			token
		}
	})
}

// 单订单支付接口
export function payorder(uni,paytype,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/pay_order'),
		data:{
			uni,
			paytype
		},
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}

// 多商品支付
export function payOrders(uni,paytype,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/pay_order'),
		data:{
			uni,
			paytype
		},
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}

// 积分商城兑换
export function payIntegral(cartId,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/confirm_order'),
		data:{
			cartId
		},
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}

// 积分商城提交
export function gitOrder(obj,token){
	console.log(obj)
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/create_order'),
		data:{
			addressId:obj.addressId,
			mark:obj.mark,
			key:obj.key,
			payType:obj.payType
		},
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}

// 拼团订单状态
export function getPinkStatus(uni,token){
	return http({
		url:replaceImage('http://jn.51kdd.com/ebapi/auth_api/pink_info'),
		data:{
			uni
		},
		header:{
			token
		},
		method:"GET",
		showModel:true
	})
}

// 确认收货
export function affirmOrder(uni,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_take_order'),
		data:{
			uni
		},
		header:{
			token
		},
		showModel:true
	})
}

// 订单评价
export function evalu(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/user_comment_product'),
		data:obj,
		header:{
			token
		},
		method:"POST",
		showModel:true
	})
}

// 物流查询
export function queryLogistics(uni,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/express'),
		data:{
			uni
		},
		header:{
			token
		},
		method:"GET"
	})
}