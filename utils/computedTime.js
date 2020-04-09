/**
 * 计算用户信息是否保存超过7天
 */
export default function(oldTime){
	let new_time = new Date().getTime()//获取当前时间
	// 计算当前时间和上一次保存userData的时间是否超过7天
	return new_time - 7*86400000 < oldTime
}