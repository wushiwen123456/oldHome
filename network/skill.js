// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


// 获取秒杀详情
export function getDetailSkill(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/seckill_api/seckill_detail'),
		data:{
			id
		},
		header:{
			token
		},
		method:"POST"
	})
}