// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


export function getPinkDetail(id,token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/pink_api/combination_detail'),
		data:{
			id
		},
		header:{
			token
		},
		method:"POST"
	})
}

// 获取个人拼团列表
export function getUserPink(token,type){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/get_user_pink'),
		data:{
			type
		},
		header:{
			token
		}
	})
}