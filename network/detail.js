// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

// 获取商品详情页的信息
export function getDetailData(shopId,token){
	return http({
		method:"GET",
		url:replaceImage('http://www.test.com/ebapi/store_api/details'),
		data:{
			id:shopId
		},
		header:{
			token
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
		},
		showModel:true
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
		},
		showModel:true
	})
}


// 根据商铺id获取优惠信息
// id:商铺id
export function getShopDiscount(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/coupons_api/get_shop_coupon'),
		data:{
			limit:20,
			page:1,
			shop_id:id
		},
		header:{
			token
		}
	})
}

// 优惠券领取接口
export function getDisCount(couponId,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/coupons_api/user_get_coupon'),
		data:{
			couponId,//购物券id
		},
		header:{
			token
		}
	})
}

// 收藏商品接口
/*
	productId:商品id，可以为数组
	category:product:普通商品；seckill：秒杀商品；bargain：砍价商品
*/
export function collectProduct(productId,category,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/collect_product'),
		data:{
			productId,
			category,
		},
		header:{
			token
		}
	})
}

// 取消收藏接口
export function unCollectProduct(productId,category,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/uncollect_product'),
		data:{
			productId,
			category
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 取消收藏接口2
export function unCollectProduct2(productId,token){

	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/uncollect_product'),
		data:{
			productId
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 获取店铺信息
export function getStoreInfo(shop_id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/shop_index'),
		data:{
			shop_id
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 收藏店铺
export function collectStoring(shop_id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/shop_collect'),
		data:{
			shop_id
		},
		header:{
			token
		},
		method:"GET"
	})
}

// 取消收藏店铺
export function unCollectStore(shop_id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/del_collect'),
		data:{
			shop_id  //收藏id 批量删除 逗号拼接 1,2
		},
		header:{
			token
		}
	})
}
export function productCommont(productId){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/product_reply_list'),
		data:{
			productId
		}
	})
}
