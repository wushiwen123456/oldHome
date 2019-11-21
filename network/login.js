// 登录注册相关的方法方法
import http from '@/common/http.js'

// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'

/*
	登录方法
	option：Object
		{
			phone:String
			pwd:String
		}
*/
export function login (option) {
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/user_login'),
		method:"POST",
		data:{
			phone:option.phone,
			pwd:option.pwd
		}
	})
}


/*
	注册方法:
	
**/

export function register(option){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/user_register'),
		method:"POST",
		data:{
			phone:option.phone,
			code:option.code,
			pwd:option.pwd,
			name:option.name,
			card:option.card,
			sex:option.sex
		}
	})
}


/*
	验证码获取接口方法：
	
**/

export function sendCode(phone){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/send_sms_code'),
		method:"GET",
		data:{
			phone
		}
	})
}


/*
	改密方法：
	phone:手机号
	pwd：密码
	code：短信验证码
**/
export function resetPwd(option){
	return http({
		url:replaceImage('http://www.test.com/ebapi/public_api/reset_pwd'),
		method:"POST",
		data:{
			phone:option.phone,
			pwd:option.pwd,
			code:option.code
		}
	})
}

