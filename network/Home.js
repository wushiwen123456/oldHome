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
export function getDetailData(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/get_product_list')
	})
}


// 获取秒杀页面数据
export function secKillData(option){
	return http({
		url:replaceImage('http://www.test.com/ebapi/seckill_api/seckill_list'),
		data:{
			offset:option.offset,
			limit:option.limit
		}
	})
}

// 获取秒杀时间列表
export function getSecKillData(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/seckill_api/seckill_index')
	})
}