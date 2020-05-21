/**
 * 
 * @param {时间戳} date 
 * @param {格式：yyyy-MM-dd hh:mm:ss}} fmt 
 * 时间戳格式化函数
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

  // 2、时间戳转换为距离现在多长时间
  // mss:时间戳,10位
export function getTimeUntilNow(mss) {
      var days = parseInt(mss / (1000 * 60 * 60 * 24));
    if (days > 0) {
         return days + " 天前";
    };
     var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
     if (hours > 0) {
        return hours + " 小时前 ";
     };
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
     if (minutes > 0) {
         return minutes + " 分钟前 ";
     };
     var seconds = (mss % (1000 * 60)) / 1000;
     return "刚刚 ";
 }
 
 /*
  * JSON数组去重
  * @param: [array] json Array
  * @param: [string] 唯一的key名，根据此键名进行去重
  */
export function uniqueArray(array, key){
   var result = [array[0]];
   for(var i = 1; i < array.length; i++){
     var item = array[i];
     var repeat = false;
     for (var j = 0; j < result.length; j++) {
       if (item[key] == result[j][key]) {
         repeat = true;
         break;
       }
     }
     if (!repeat) {
       result.push(item);
     }
   }
   return result;
 }