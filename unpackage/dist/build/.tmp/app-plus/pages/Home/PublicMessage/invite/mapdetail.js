(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/PublicMessage/invite/mapdetail"],{"236e":function(t,i,n){"use strict";var o=function(){var t=this,i=t.$createElement,n=(t._self._c,t.__map(t.info,function(i,n){var o=t.isItemChoose(i),e=t.isMinDistance(i);return{$orig:t.__get_orig(i),m0:o,m1:e}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},e=[];n.d(i,"a",function(){return o}),n.d(i,"b",function(){return e})},3298:function(t,i,n){"use strict";n.r(i);var o=n("236e"),e=n("f663");for(var a in e)"default"!==a&&function(t){n.d(i,t,function(){return e[t]})}(a);n("fea6");var s=n("2877"),u=Object(s["a"])(e["default"],o["a"],o["b"],!1,null,null,null);i["default"]=u.exports},"3b35":function(t,i,n){"use strict";(function(t,o){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;n("702d"),n("cadc");var e=function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"ae8a"))},a={components:{uniPopup:e},data:function(){return{data:"一、【薪资待遇】：\n1、短期工：140-160/天可申请长白班，包吃住；按天计算工资，做满时间，可结现。\n2、场施工：试用期工资3500-3800，一个月转正后3800元-5680元。\n二、招聘要求：\n1、年龄16-48周岁，男女不限\n2、学历不限，身体健康、服从工作安排",token:"",info:[],type:"",title:"map",latitude:"",longitude:"",covers:[{latitude:39.909,longitude:116.39742,iconPath:"/static/logo/logo.png"},{latitude:39.9,longitude:116.39,iconPath:"/static/logo/logo.png"}],mapControls:[{position:{left:15,top:35,width:34,height:34},id:1,iconPath:"/static/iconfont/mylocation.png",clickable:!0}],isMap:!1,m_latitude:"",m_longitude:"",polyline:[]}},onLoad:function(){var t=this.$store.state.publicMessage;t.length?this.setmap(t):plus.nativeUI.toast("网络好像出了点问题")},methods:{goMessage:function(){t.makePhoneCall({phoneNumber:this.info.phone})},setmap:function(t){var i=this;this.isMap=!1;var n=this.$store.state.userInfo.address,e=n.latitude,a=n.longitude;this.m_latitude=e,this.m_longitude=a,this.latitude=e,this.longitude=a;var s=t.map(function(t){var i=t.coord.split(",");return{latitude:i[0],longitude:i[1],iconPath:"/static/iconfont/location.svg",width:40,height:40,callout:{content:t.title,fontSize:16,borderRadius:10,color:"#333333",padding:10,display:"ALWAYS"}}});s.unshift({latitude:this.m_latitude,longitude:this.m_longitude,iconPath:"/static/iconfont/mylocation2.png",width:40,height:40,callout:{content:"我的位置",fontSize:16,borderRadius:10,color:"#333333",padding:10,display:"ALWAYS"}});var u=t.find(function(t){return t.isChoose});this.polyline=[{points:[{latitude:this.m_latitude,longitude:this.m_longitude},{latitude:u.coord.split(",")[0],longitude:u.coord.split(",")[1]}],color:"#CD3233",width:"20",dottedLine:!0,arrowLine:!0,borderWidth:20}],console.log(o(s," at pages\\Home\\PublicMessage\\invite\\mapdetail.vue:147")),this.covers=s,this.info=t,this.$nextTick(function(){i.isMap=!0})},changeLine:function(t){var i=this;t.isChoose||(this.info.forEach(function(t){t.isChoose=!1}),this.isMap=!1,this.polyline=[{points:[{latitude:this.m_latitude,longitude:this.m_longitude},{latitude:t.coord.split(",")[0],longitude:t.coord.split(",")[1]}],color:"#CD3233",width:"20",dottedLine:!0,arrowLine:!0,borderWidth:20}],t.isChoose=!0,this.$nextTick(function(){i.isMap=!0}))},controltap:function(){var t=this;this.isMap=!1,this.latitude=this.m_latitude,this.longitude=this.m_longitude,this.$nextTick(function(){t.isMap=!0})},goNavigation:function(i){var n=i.coord.split(",");t.openLocation({latitude:1*n[0],longitude:1*n[1],success:function(i){console.log(o(i," at pages\\Home\\PublicMessage\\invite\\mapdetail.vue:209"));var n=t.createMapContext("map");n.moveToLocation()}})},goPhone:function(i){t.makePhoneCall({phoneNumber:i.phone})},isMinDistance:function(t){if(t.km)return t.km<=Math.min.apply(Math,this.info.map(function(t){return t.km}))?"距您最近":""},isItemChoose:function(t){return t.isChoose?"当前选中":""}}};i.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},affd:function(t,i,n){},b2184:function(t,i,n){"use strict";(function(t){n("dead"),n("921b");o(n("66fd"));var i=o(n("3298"));function o(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,n("6e42")["createPage"])},f663:function(t,i,n){"use strict";n.r(i);var o=n("3b35"),e=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(i,t,function(){return o[t]})}(a);i["default"]=e.a},fea6:function(t,i,n){"use strict";var o=n("affd"),e=n.n(o);e.a}},[["b2184","common/runtime","common/vendor"]]]);