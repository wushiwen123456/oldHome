(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/My/Mydata/mydata"],{"0c8b":function(t,a,e){"use strict";e.r(a);var n=e("6792"),o=e("349d");for(var i in o)"default"!==i&&function(t){e.d(a,t,function(){return o[t]})}(i);e("3faa");var s=e("2877"),u=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);a["default"]=u.exports},"349d":function(t,a,e){"use strict";e.r(a);var n=e("8a5c"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=o.a},"3faa":function(t,a,e){"use strict";var n=e("b220"),o=e.n(n);o.a},6792:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return o})},"8a5c":function(t,a,e){"use strict";(function(t,n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=e("49da"),i=function(){return Promise.all([e.e("common/vendor"),e.e("components/w-picker/w-picker")]).then(e.bind(null,"d694"))},s=function(){return Promise.all([e.e("common/vendor"),e.e("components/yq-avatar/yq-avatar")]).then(e.bind(null,"734e"))},u={components:{wPicker:i,avatar:s},data:function(){return{nickname:"",sextype:0,birth:"",phone:"",adddress:"",urls:["../../../static/bottomh.png","../../../static/bottomh.png"],avatar:""}},onLoad:function(){var a=t.getStorageSync("Message_key");this.nickname=a.nickname,this.sextype=a.sex,this.urls[1]=a.avatar,this.phone=a.account,this.birth=a.birthday},onNavigationBarButtonTap:function(){var a={};a=this.avatar?{avatar:this.avatar,nickname:this.nickname,sex:this.sextype,birthday:this.birth}:{nickname:this.nickname,sex:this.sextype,birthday:this.birth},(0,o.edit_user)(a).then(function(a){t.showToast({title:"修改成功",icon:"none"}),setTimeout(function(){t.switchTab({url:"../my"})},1500)})},methods:{sexnanClick:function(){this.sextype=1},sexnvClick:function(){this.sextype=2},shopTypeClick:function(){this.$refs.date.show()},onConfirm:function(t){console.log(n(t.result," at pages\\My\\Mydata\\mydata.vue:131")),this.birth=t.result},doBefore:function(){console.log(n("doBefore"," at pages\\My\\Mydata\\mydata.vue:135"))},clk:function(t){this.$refs.avatar.fChooseImg(t,{selWidth:"350upx",selHeight:"350upx",expWidth:"260upx",expHeight:"260upx",inner:t?"true":"false"})},doUpload:function(a){var e=this;console.log(n(a," at pages\\My\\Mydata\\mydata.vue:145")),this.$set(this.urls,a.index,a.path),t.showLoading({title:"上传中"}),console.log(n("+++++++++++++++++"," at pages\\My\\Mydata\\mydata.vue:148")),console.log(n(a.path," at pages\\My\\Mydata\\mydata.vue:149")),console.log(n("+++++++++++++++++"," at pages\\My\\Mydata\\mydata.vue:150"));var i=a.path;(0,o.upload)(i).then(function(a){e.avatar=a.url,console.log(n(e.urls[1]," at pages\\My\\Mydata\\mydata.vue:154")),t.hideLoading()})}}};a.default=u}).call(this,e("6e42")["default"],e("0de9")["default"])},"9f05":function(t,a,e){"use strict";(function(t){e("20d5"),e("921b");n(e("66fd"));var a=n(e("0c8b"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},b220:function(t,a,e){}},[["9f05","common/runtime","common/vendor"]]]);