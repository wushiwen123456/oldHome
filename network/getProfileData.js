// 登录注册相关的方法方法
import http from '@/common/http.js'

// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


export function getProfileData(token){
	return http({
		url:replaceImage('http://www.test.com/ebapi/user_api/my'),
		header:{
			token,
		}
	})
}

