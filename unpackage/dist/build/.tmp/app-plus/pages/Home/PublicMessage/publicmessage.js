(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/PublicMessage/publicmessage"],{"2b55":function(n,t,e){"use strict";e.r(t);var i=e("a695"),a=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);t["default"]=a.a},"6c3a":function(n,t,e){"use strict";e.r(t);var i=e("d8e3"),a=e("2b55");for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);e("f406");var c,u=e("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);t["default"]=s.exports},"7c63":function(n,t,e){},"85f4":function(n,t,e){"use strict";(function(n){e("dead"),e("921b");i(e("66fd"));var t=i(e("6c3a"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},a695:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=e("f607"),a=function(){return e.e("components/tui-collapse/tui-collapse").then(e.bind(null,"d752"))},o=function(){return e.e("components/list-cell/list-cell").then(e.bind(null,"0919"))},c={components:{tuiCollapse:a,tuiListCell:o},data:function(){return{token:"",userInfo:{username:"",address:{}},dataList:[],current:-1,publicList:[{image:"../../../static/publica.png",name:"报警电话",phone:"110"},{image:"../../../static/publicb.png",name:"火警电话",phone:"119"},{image:"../../../static/publicc.png",name:"急救电话",phone:"120"},{image:"../../../static/publicd.png",name:"交通事故",phone:"122"},{image:"../../../static/publice.png",name:"高速救援",phone:"12122"},{image:"../../../static/publicf.png",name:"供电线路",phone:"13713257960"},{image:"../../../static/publicg.png",name:"供暖电话",phone:"68890222"},{image:"../../../static/publich.png",name:"燃气公司",phone:"037163796760"},{image:"../../../static/publicj.png",name:"有线电视",phone:"96196"},{image:"../../../static/publick.png",name:"供水电话",phone:"037167680000"}],cateList:[],jingdu:"",weidu:""}},onLoad:function(){var t=this;this.$store.getters.isToken?(this.token=this.$store.getters.isToken,this.$store.dispatch("getUserLocation").then(function(n){t.dealWps(n)}).catch(function(e){plus.nativeUI.toast("获取地理位置失败",{duration:"long"}),t.$refs.loading&&t.$refs.loading.close(),n.navigateBack()})):n.showModal({title:"是否去登陆？",content:"此部分内容需要登陆查看",success:function(t){t.confirm&&n.navigateTo({url:"../../login/login"})}})},onReady:function(){this.$refs.loading.open()},methods:{goGongqiu:function(){n.navigateTo({url:"supply/supply"})},goZhaoPin:function(){n.navigateTo({url:"invite/invite"})},change3:function(n){this.current=this.current==n.index?-1:n.index},goPhone:function(t){n.makePhoneCall({phoneNumber:t.phone})},dealWps:function(n){this.$store.commit("setUserAddress",n);var t=n.latitude,e=n.longitude;this.pubsicGood({latitude:t,longitude:e},this.token)},pubsicGood:function(n,t){var e=this;(0,i.pubsicGood)(n,t).then(function(n){if(e.$refs.loading.close(),200==n.data.code){var t=n.data.data;e.dataList=t.map(function(n){return{name:n.cate_name,image:n.pic||"",intro:n.son,disabled:!1}})}})},publicdetailClick:function(t){n.navigateTo({url:"publicdetail?id="+t.id})}}};t.default=c}).call(this,e("6e42")["default"])},d8e3:function(n,t,e){"use strict";var i,a=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",function(){return a}),e.d(t,"c",function(){return o}),e.d(t,"a",function(){return i})},f406:function(n,t,e){"use strict";var i=e("7c63"),a=e.n(i);a.a}},[["85f4","common/runtime","common/vendor"]]]);