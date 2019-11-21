// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 获取商品详情页的信息
export function getDetailData(shopId){
	return http({
		method:"GET",
		url:replaceImage('http://www.test.com/ebapi/store_api/details'),
		data:{
			id:shopId
		}
	})
}

// 添加购物车方法
export function getAddCart(option,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/set_cart'),
		data:{
			productId:option.productId,
			cartNum:option.cartNum,
			uniqueId:option.uniqueId,
			shop_id:option.shop_id
		},
		header:{
			token
		}
	})
}


// 立即购买方法
export function payNow(option,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/auth_api/now_buy'),
		method:"GET",
		data:{
			productId:option.productId,
			cartNum:option.cartNum ,
			uniqueId:option.uniqueId,
			combinationId:option.combinationId,
			secKillId:option.secKillId,
			bargainId:option.bargainId,
			shop_id:option.shop_id
		},
		header:{
			token
		}
	})
}