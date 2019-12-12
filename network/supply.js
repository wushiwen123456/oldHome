// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


// 获取供求列表
export function getSupplyList(page,limit,cate,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/msg_api/gq_list'),
		data:{
			page,limit,cate
		},
		header:{
			token
		}
	})
}