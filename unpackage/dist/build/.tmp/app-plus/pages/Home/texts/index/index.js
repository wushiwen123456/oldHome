(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/texts/index/index"],{"06a8":function(t,e,n){"use strict";(function(t){n("dead"),n("921b");o(n("66fd"));var e=o(n("51aaf"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"20bf":function(t,e,n){"use strict";n.r(e);var o=n("58f7"),i=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=i.a},"2a3f":function(t,e,n){},"51aaf":function(t,e,n){"use strict";n.r(e);var o=n("ee1e"),i=n("20bf");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("b513");var a,c=n("f0c5"),s=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=s.exports},"58f7":function(t,e,n){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(n("a34a")),r=n("d27c"),a=n("6cba");function c(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,o,i,r,a){try{var c=t[r](a),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(o,i)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var r=t.apply(e,n);function a(t){s(r,o,i,a,c,"next",t)}function c(t){s(r,o,i,a,c,"throw",t)}a(void 0)})}}var d,l=function(){return n.e("components/t-color-picker").then(n.bind(null,"2780"))},f={components:{"t-color-picker":l},data:function(){return{show:!1,color:{r:255,g:0,b:0,a:.6},isEdit:!1,fontColor:"#000",formats:{},readOnly:!1,placeholder:"开始输入...",editorHeight:300,keyboardHeight:0,isIOS:!1,html:{},isSave:!1,imgList:[]}},onLoad:function(){d=this,this.html=this.$store.state.richHtml},onBackPress:function(t){if(!this.show&&!this.isSave)return this.show=!0,!0},onNavigationBarButtonTap:function(){var t={currentTarget:{id:1}};d.store(t)},methods:{cancel:function(){this.isEdit=!1},open:function(){this.$refs.colorPicker.open(),this.isEdit=!0},hideKey:function(){t.hideKeyboard()},confirm:function(){var t=u(i.default.mark(function t(e){return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.isEdit=!1,t.next=3,e.hex;case 3:this.fontColor=t.sent,this.onStatusChange({detail:{color:e.hex}}),this.$forceUpdate();case 6:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),readOnlyChange:function(){this.readOnly=!this.readOnly},exit:function(){t.navigateBack()},onEditorReady:function(){t.createSelectorQuery().select("#editor").context(function(t){console.log(o(t.context," at pages\\Home\\texts\\index\\index.vue:157")),d.editorCtx=t.context,Object.keys(d.html).length&&d.editorCtx.setContents({html:d.html})}).exec()},undo:function(){this.editorCtx.undo()},redo:function(){this.editorCtx.redo()},blur:function(){this.editorCtx.blur()},format:function(t){var e=t.target.dataset,n=e.name,o=e.value;n&&this.editorCtx.format(n,o)},onStatusChange:function(t){this.formats=t.detail},insertDivider:function(){this.editorCtx.insertDivider({success:function(){console.log(o("insert divider success"," at pages\\Home\\texts\\index\\index.vue:194"))}})},store:function(e){var n=this;this.editorCtx.getContents({success:function(i){1==e.currentTarget.id?console.log(o("保存内容:",i.html," at pages\\Home\\texts\\index\\index.vue:203")):t.navigateTo({url:"../preview/preview?rich=".concat(encodeURIComponent(i.html))}),n.$store.commit("setRichHtml",i.html),console.log(o(i," at pages\\Home\\texts\\index\\index.vue:207")),plus.nativeUI.toast("保存成功",{duration:"long"}),n.isSave=!0,t.navigateBack()}})},clear:function(){this.editorCtx.clear({success:function(t){console.log(o("clear success"," at pages\\Home\\texts\\index\\index.vue:220"))}})},removeFormat:function(){this.editorCtx.removeFormat()},insertDate:function(){var t=new Date,e="".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate());this.editorCtx.insertText({text:e})},insertImage:function(){t.chooseImage({count:1,success:function(e){t.showLoading({mask:!0}),(0,r.upload)(e.tempFilePaths[0],!0).then(function(e){t.hideLoading(),e.url&&(console.log(o(e.url," at pages\\Home\\texts\\index\\index.vue:249")),d.editorCtx.insertImage({src:(0,a.replaceImage)(e.url),data:{id:"abcd",role:"god"},width:"80%",success:function(){console.log(o("insert image success"," at pages\\Home\\texts\\index\\index.vue:258"))}}))})}})}}};e.default=f}).call(this,n("6e42")["default"],n("0de9")["default"])},b513:function(t,e,n){"use strict";var o=n("2a3f"),i=n.n(o);i.a},ee1e:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return o})}},[["06a8","common/runtime","common/vendor"]]]);