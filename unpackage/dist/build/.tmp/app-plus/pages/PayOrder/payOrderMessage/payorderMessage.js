(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/PayOrder/payOrderMessage/payorderMessage"],{"2f59":function(e,t,n){"use strict";var a=n("5a15"),o=n.n(a);o.a},"43c4":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("4ff4");var o=n("58c8"),i=n("6cba"),r=s(n("8f99"));function s(e){return e&&e.__esModule?e:{default:e}}var c=function(){return n.e("components/countdown/countdown").then(n.bind(null,"ceca"))},u=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"8e95"))},l={components:{tuiCountdown:c,MescrollUni:u},data:function(){return{id:"",timeList:[1e3,2e3,3e3,19,24e4],type:1,popupShow:!1,poster:{},dealTime:0,qrShow:!1,canvasId:"default_PosterCanvasId",token:"",order:"",pinkInfo:[],recommendGoods:[],downOption:{use:!0,auto:!0},upOption:{use:!0,auto:!0,page:{num:0,size:10},noMoreSize:5,textNoMore:"-- 没有更多了 --",empty:{tip:"暂无相关数据"},Linder:{}}}},onLoad:function(e){this.token=this.$store.getters.isToken,this.order=this.$store.state.orderKey},methods:{popup:function(){var t=this;if(0!=this.dealTime){var n={href:"http://jn.51kdd.com/index.html#/",title:"老家商城",desc:"我正在来家商城发起拼团，敢和我一起来拼么",imgUrl:"/static/logo/logo.png"},o=[{icon:"/static/sharemenu/wechatfriend.png",text:"微信好友"},{icon:"/static/sharemenu/wechatmoments.png",text:"朋友圈"},{icon:"/static/sharemenu/copyurl.png",text:"复制"},{icon:"/static/sharemenu/more.png",text:"更多"}];this.shareObj=(0,r.default)(n,o,function(t){console.log(e("点击按钮的序号: "+t," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:145"));var o={href:n.href||"",title:n.title||"",summary:n.desc||"",success:function(t){console.log(e("success:"+JSON.stringify(t)," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:151")),a.hideLoading()},fail:function(t){console.log(e("fail:"+JSON.stringify(t)," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:155")),a.hideLoading()}};switch(t){case 0:o.provider="weixin",o.scene="WXSceneSession",o.type=0,o.imageUrl=n.imgUrl||"",a.showLoading({title:"加载中...",mask:!0}),a.share(o);break;case 1:o.provider="weixin",o.scene="WXSenceTimeline",o.type=0,o.imageUrl=n.imgUrl||"",a.showLoading({title:"加载中...",mask:!0}),a.share(o);break;case 2:a.setClipboardData({data:n.href,complete:function(){a.showToast({title:"已复制到剪贴板"})}});break;case 3:plus.share.sendWithSystem({type:"web",title:n.title||"",thumbs:[n.imgUrl||""],href:n.href||"",content:n.desc||""});break}}),this.$nextTick(function(){t.shareObj.alphaBg.show(),t.shareObj.shareMenu.show()})}},getPinkInfo:function(t){var n=this,a=this.order,r=this.token;console.log(e(a," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:212")),console.log(e(r," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:213")),(0,o.getPinkStatus)(a,r).then(function(a){if(200==a.data.code){var o=a.data.data.list;console.log(e(o," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:217"));var r=a.data.data.goodsList;n.type=1==o.length?1:0,o.forEach(function(e){e.userInfo.avatar=(0,i.replaceImage)(e.userInfo.avatar)}),n.dealTuan(o);var s=n.dealTime2(o[0].stop_time);n.dealTime=s,n.pinkInfo=o,n.dealTitle(),r.forEach(function(e){e.image=(0,i.replaceImage)(e.image)}),n.recommendGoods=r,t.endErr()}})},homeClick:function(){a.switchTab({url:"../../Home/home"})},dealTuan:function(e){var t=this;e.forEach(function(e){0==e.k_id&&(t.Linder=e)})},shareShowclose:function(){},dealTime2:function(e){var t=Math.round((new Date).getTime()/1e3);return e>t?e-t:0},dealTitle:function(){console.log(e(this.dealTime," at pages\\PayOrder\\payOrderMessage\\payorderMessage.vue:266")),a.setNavigationBarTitle({title:this.dealTime?"拼团成功":this.pinkInfo.length==this.pinkInfo[0].people?"拼团成功":"拼团失败"})},goMyPicking:function(){a.navigateTo({url:"../../My/MyBooking/mybooking"})},downCallback:function(e){this.getPinkInfo(e)},upCallback:function(e){e.endErr()},detltopText:function(){if(0!=this.pinkInfo.length){if(this.pinkInfo.length==this.pinkInfo[0].people)return"拼团成功";if(0!=this.dealTime){if(1==this.type)return"正在开团中...";var e=this.Linder.userInfo.nickname;return"正在参加".concat(e,"的团")}return"拼团失败，订单已超时"}},goDetail:function(e){var t=e.id;a.navigateTo({url:"../../ShopDetails/shopDetails?id=".concat(t)})},goStoreInfo:function(){a.redirectTo({url:"/pages/My/MyBooking/mybooking"})},restart:function(){a.navigateTo({url:"../../Home/BookingList/bookingList"})}}};t.default=l}).call(this,n("0de9")["default"],n("6e42")["default"])},"5a15":function(e,t,n){},"5fb9":function(e,t,n){"use strict";var a,o=function(){var e=this,t=e.$createElement,n=(e._self._c,e.detltopText());e.$mp.data=Object.assign({},{$root:{m0:n}})},i=[];n.d(t,"b",function(){return o}),n.d(t,"c",function(){return i}),n.d(t,"a",function(){return a})},"94a5":function(e,t,n){"use strict";n.r(t);var a=n("5fb9"),o=n("fa44");for(var i in o)"default"!==i&&function(e){n.d(t,e,function(){return o[e]})}(i);n("2f59");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=c.exports},ab4b:function(e,t,n){"use strict";(function(e){n("dead"),n("921b");a(n("66fd"));var t=a(n("94a5"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},fa44:function(e,t,n){"use strict";n.r(t);var a=n("43c4"),o=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,function(){return a[e]})}(i);t["default"]=o.a}},[["ab4b","common/runtime","common/vendor"]]]);