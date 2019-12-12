// 引入ajax
import http from '@/common/http'
// 引入替换Url的方法
import {replaceImage} from '@/utils/dealUrl'


// 商品分类接口
export function getCategory(){
	return http({
		url:replaceImage('http://www.test.com/ebapi/store_api/get_product_category')
	})
}