// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'
// 主页数据:
export function getHomeData(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/index')
	})
}

// 主页商品列表数据：	
export function getDetailData(obj){
	const flag = obj.showModel
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/get_product_list'),
		data:{
			...obj
		},
		showModel:flag || ''
	})
}


// 获取秒杀页面数据
export function secKillData(time,pages){
	return http({
		url:replaceImage('http://www.test.com/ebapi/seckill_api/seckill_list'),
		data:{
			time,
			offset:(pages - 1)*5+1,
			limit:5
		},
		method:"POST"
	})
}

// 获取秒杀时间列表
export function getSecKillData(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/seckill_api/seckill_index')
	})
}


// 获取拼团数据
export function getCombinationListData(pageNum,pageSize){
	return http({
		url:replaceImage('http://www.test.com/ebapi/pink_api/get_combination_list'),
		method:"POST",
		data:{
			limit:pageSize,
			offset:(pageNum-1)*pageSize+1
		}
	})
}

// 获取优惠券列表
export function getDiscounts(page,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/coupons_api/get_issue_coupon_list'),
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

// 获取省列表
export function getProvince(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/get_province'),
	})
}

// 公益信息面板
export function pubsicGood(obj,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/get_cate'),
		data:{
			weidu:obj.latitude,
			jingdu:obj.longitude
		},
		header:{
			token
		}
	})
}
// 获取公益信息分类数据
export function pubDetailData(data,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/get_public_info'),
		data:{
			...data
		},
		header:{
			token
		}
	})
}