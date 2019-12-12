// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 请求购物车列表
export function getShopCartData(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/get_cart_list'),
		header:{
			token
		}
	})
}

// 删除购物车
export function removeCart(ids,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/remove_cart'),
		data:{
			ids
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 修改购物车数量
export function changeCartNum(cartId,cartNum,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/change_cart_num'),
		data:{
			cartId,
			cartNum
		},
		header:{
			token
		},
		method:"GET",
		hideModel:true
	})
}

