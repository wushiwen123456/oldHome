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