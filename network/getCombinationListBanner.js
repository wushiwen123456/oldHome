import { HOST } from '@/common/const'
// 获取拼团首页banner
export function getCombinationListBanner(){
	return uni.request({
		url:`http://${HOST}/ebapi/pink_api/get_combination_list_banner`
	})
}


// 获取拼团数据
export function getBookingListData(limit=30,offset=0){
	return uni.request({
		url:`http://${HOST}/ebapi/pink_api/get_combination_list`,
		data:{
			limit:limit,
			offset:offset
		},
		method:'POST'
	})
}