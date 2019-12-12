// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'



// 获取地址
export function getProvince(){
	return http({
		url:'https://cdn.jsdelivr.net/npm/form-create/district/province_city_area.js'
	})
}

// 获取小程序二维码
export function getMa(){
	return http({
		url:replaceImage('https://api.weixin.qq.com/wxa/getwxacode?access_token=ACCESS_TOKEN'),
		data:{
			access_token:'28_x4Ny-tZcjdcroGMzVloq2FUBXoRTzmJbmI6pP6yADJuHf8zb9zROpYh7A6r-80PuZendUnPC_6VLIK4JkS0imiU8WgBQjeVUq42mW8QIFmQlVByQTXD9KwV5VymbURzXyQXizzR-k1EHCH12OAEeAIAJVZ',
			path:'pages/index/index'
		}
	})
}