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
		method:"POST"
	})
}


