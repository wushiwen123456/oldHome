(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/my"],{"3f3a":function(t,e,n){"use strict";n.r(e);var i=n("ef09"),a=n("b919");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("bf5d");var s=n("2877"),r=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"9f00":function(t,e,n){},b919:function(t,e,n){"use strict";n.r(e);var i=n("cfa7"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},bf5d:function(t,e,n){"use strict";var i=n("9f00"),a=n.n(i);a.a},c5cd:function(t,e,n){"use strict";(function(t){n("dead"),n("921b");i(n("66fd"));var e=i(n("3f3a"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},cfa7:function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("0ef8"),o=n("2f62"),s=n("6cba"),r=(n("3dc2"),u(n("8f99")));function u(t){return t&&t.__esModule?t:{default:t}}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){l(t,e,n[e])})}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={data:function(){return{mytrue:!1,username:"",avatar:"",integral:"",now_money:"",sex:"",product_collect:"",shop_collect:"",visit:"",uid:"",red_packet:"",show1:!1,isLoading:!1,userInfo:{}}},onShow:function(){if(this.isToken){this.mytrue=!0;var e=t.getStorageSync("Message_key");console.log(i(e," at pages\\My\\my.vue:165")),Object.keys(e).length?(this.userInfo=e,this.isLoading=!1):this.isLoading=!0,this.isLoading&&this.$refs.loading&&this.$refs.loading.open(),this.getProfileData(e)}else this.mytrue=!1},onNavigationBarButtonTap:function(e){if(this.mytrue){var n=e.index;if(0==n){var i=getCurrentPages(),a=i[i.length-1],o=a.$getAppWebview();o.hideTitleNViewButtonRedDot({index:n}),t.navigateTo({url:"Inform/inform"})}else t.navigateTo({url:"Seeting/seeting"})}else this.show1=!0},methods:{getProfileData:function(e){var n=this,o=this.isToken;(0,a.getProfileData)(o).then(function(o){if(200==o.data.code){var r=o.data.data;r.avatar=(0,s.replaceImage)(r.avatar);var u=!0;if(0!=Object.keys(e).length){var c=Object.keys(e);c.forEach(function(t,n){e[c[n]]!=r[c[n]]&&(u=!1)})}else u=!1;if(!u){n.userInfo=r,n.isLoading&&n.$refs.loading&&n.$refs.loading.close(),t.setStorage({key:"Message_key",data:r,success:function(){console.log(i("个人信息写入缓存成功"," at pages\\My\\my.vue:240"))}});var l=r.avatar;(0,a.saveFiles)(l).then(function(e){if(200==e.statusCode){var n=e.tempFilePath;t.saveFile({tempFilePath:n,success:function(e){var n=e.savedFilePath;t.setStorage({key:"integrlUrl",data:n})},fail:function(t){plus.nativeUI.toast(t,{duration:"long"})}})}}).catch(function(t){plus.nativeUI.toast(t,{duration:"long"})})}}})},loginClick:function(){t.navigateTo({url:"../login/login"})},collectClick:function(){this.mytrue?t.navigateTo({url:"MyshopMessage/collect"}):this.show1=!0},attrntionClick:function(){this.mytrue?t.navigateTo({url:"MyshopMessage/attention"}):this.show1=!0},integralShopCick:function(){this.mytrue?t.navigateTo({url:"../Home/Integral/integralShop"}):this.show1=!0},discountsClick:function(){this.mytrue?t.navigateTo({url:"Discounts/mydiscounts"}):this.show1=!0},footprintClick:function(){this.mytrue?t.navigateTo({url:"Footprint/footprint"}):this.show1=!0},myOrderClick:function(e){this.mytrue?t.navigateTo({url:"MyOrder/myorder?index="+e}):this.show1=!0},refundClick:function(){this.mytrue?t.navigateTo({url:"MyBooking/refund/refund"}):this.show1=!0},MybookingClick:function(){this.mytrue?t.navigateTo({url:"MyBooking/mybooking"}):this.show1=!0},enterClick:function(){this.mytrue?t.navigateTo({url:"Enter/enter"}):this.show1=!0},addressClick:function(){this.mytrue?t.navigateTo({url:"address/AllAddress"}):this.show1=!0},intrgralDetailClick:function(){this.mytrue?t.navigateTo({url:"../Home/Integral/intrgralDetail"}):this.show1=!0},discountscententClick:function(){this.mytrue?t.navigateTo({url:"Discounts/DiscpuntsCentent"}):this.show1=!0},my_zuji:function(){this.mytrue?t.navigateTo({url:""}):this.show1=!0},mySet:function(){this.mytrue?t.navigateTo({url:"Mydata/mydata"}):this.show1=!0},shareObj:function(){var e=this;if(this.mytrue){var n=this,a=n.uid,o={href:"http://jn.51kdd.com/index.html#/?spread_uid=".concat(a),title:"老家商城",desc:"快来玩呀",imgUrl:"/static/logo/logo.png"},s=[{icon:"/static/sharemenu/wechatfriend.png",text:"微信好友"},{icon:"/static/sharemenu/wechatmoments.png",text:"朋友圈"},{icon:"/static/sharemenu/copyurl.png",text:"复制"},{icon:"/static/sharemenu/more.png",text:"更多"}];this.shareObj=(0,r.default)(o,s,function(e){console.log(i("点击按钮的序号: "+e," at pages\\My\\my.vue:452"));var n={href:o.href||"",title:o.title||"",summary:o.desc||"",success:function(t){console.log(i("success:"+JSON.stringify(t)," at pages\\My\\my.vue:458"))},fail:function(t){console.log(i("fail:"+JSON.stringify(t)," at pages\\My\\my.vue:461"))}};switch(e){case 0:n.provider="weixin",n.scene="WXSceneSession",n.type=0,n.imageUrl=o.imgUrl||"",t.share(n);break;case 1:n.provider="weixin",n.scene="WXSenceTimeline",n.type=0,n.imageUrl=o.imgUrl||"",t.share(n);break;case 2:t.setClipboardData({data:o.href,complete:function(){t.showToast({title:"已复制到剪贴板"})}});break;case 3:plus.share.sendWithSystem({type:"web",title:o.title||"",thumbs:[o.imgUrl||""],href:o.href||"",content:o.desc||""});break}}),this.$nextTick(function(){e.shareObj.alphaBg.show(),e.shareObj.shareMenu.show()})}else this.show1=!0},erWeiShare:function(){this.mytrue?t.navigateTo({url:"erweimaShare/erweimaShare"}):this.show1=!0},goQianbao:function(){this.mytrue?t.navigateTo({url:"MyBalance/MyBalance"}):this.show1=!0},goQiandao:function(){this.mytrue?t.navigateTo({url:"../Home/qiandao"}):this.show1=!0},goLogin:function(){t.navigateTo({url:"../login/login"})}},computed:c({},(0,o.mapGetters)(["isToken"]))};e.default=f}).call(this,n("6e42")["default"],n("0de9")["default"])},ef09:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})}},[["c5cd","common/runtime","common/vendor"]]]);