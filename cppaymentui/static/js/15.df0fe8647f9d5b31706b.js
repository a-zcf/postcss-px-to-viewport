webpackJsonp([15],{MFHj:function(n,a,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"accountadmin.vue",sourceRoot:""}])},OLfl:function(n,a,e){var t=e("MFHj");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);e("rjj0")("f5215716",t,!1,{})},a17Q:function(n,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("P9l9"),s=e("fxnj"),o=e.n(s),i={name:"accountadmin",data:function(){return{supplierName:"",address:"",phone:"",contact:"",announcement:"",url:"",name:"",headImg:"",shopCodeImg:""}},mounted:function(){var n=this;n.$postRequest(t.supplierInfo).then(function(a){if(0===a.data.code){var e=a.data.data.supplierInfo,t=e.supplierName,s=e.address,o=e.phone,i=e.contact,c=e.announcement;n.supplierName=t,n.address=s,n.phone=o,n.contact=i,n.announcement=c;var l=a.data.data.supplierInfo.activity,d=l.url,r=l.name,u=l.headImg;n.url=d,n.name=r,n.headImg=u,n.shopCodeImg=a.data.data.supplierInfo.shopCodeImg}});var a=location.href.split("#")[0];n.$postRequest(t.getJssdkConfig,{url:a}).then(function(n){if(0===n.data.code){var a=n.data.data.config,e=a.appId,t=a.nonceStr,s=a.signature,i=a.timestamp;o.a.config({debug:!1,appId:e,timestamp:i,nonceStr:t,signature:s,jsApiList:["chooseImage","uploadImage","downloadImage"]}),o.a.error(function(n){alert(n)})}}).catch(function(n){console.log(n)})},methods:{preservationInfo:function(){var n=this,a={supplierName:n.supplierName,address:n.address,phone:n.phone,contact:n.contact,announcement:n.announcement,activity:{url:n.url,name:n.name,headImg:n.headImg},shopCodeImg:n.shopCodeImg};n.$postRequest(t.supplierUpdate,a).then(function(a){0===a.data.code?(n.$toast.success("保存成功"),n.$router.push({path:"/"})):n.$toast.fail("保存失败")}).catch(function(n){console.log(n)})},addImage:function(){this.addImg(!0)},addCodeImage:function(){this.addImg(!1)},addImg:function(n){var a=this;o.a.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(e){var s=e.localIds;o.a.uploadImage({localId:s.toString(),isShowProgressTips:1,success:function(e){var s=e.serverId;a.$postRequest(t.fileUpload,{mediaId:s}).then(function(e){0===e.data.code&&(!0===n?a.headImg=e.data.data.url:a.shopCodeImg=e.data.data.url)})},fail:function(n){alert("上传失败...")}})},fail:function(n){alert("添加失败...")}})}}},c=function(){var n=this,a=n.$createElement,e=n._self._c||a;return e("div",{staticClass:"accountadmin"},[e("div",{staticClass:"edit-preservation",on:{click:n.preservationInfo}},[e("span",[n._v("保存")])]),n._v(" "),e("div",{staticClass:"edit-content"},[e("van-field",{staticClass:"vav-edit",attrs:{type:"text",border:!0,clearable:"",label:"店铺名称",placeholder:"请输入店铺名称"},model:{value:n.supplierName,callback:function(a){n.supplierName=a},expression:"supplierName"}}),n._v(" "),e("van-field",{staticClass:"vav-edit",attrs:{type:"text",border:!0,clearable:"",label:"联系人",placeholder:"请输入联系人"},model:{value:n.contact,callback:function(a){n.contact=a},expression:"contact"}}),n._v(" "),e("van-field",{staticClass:"vav-edit",attrs:{type:"tel",border:!0,clearable:"",label:"电话",placeholder:"请输入电话"},model:{value:n.phone,callback:function(a){n.phone=a},expression:"phone"}}),n._v(" "),e("van-field",{staticClass:"vav-edit",attrs:{type:"text",border:!0,clearable:"",label:"店铺位置",placeholder:"请输入店铺位置"},model:{value:n.address,callback:function(a){n.address=a},expression:"address"}}),n._v(" "),e("van-field",{staticClass:"textarea",attrs:{label:"店铺公告",type:"textarea",placeholder:"请输入店铺公告"},model:{value:n.announcement,callback:function(a){n.announcement=a},expression:"announcement"}}),n._v(" "),e("p",{staticClass:"hdgg-text"},[n._v("活动公告：")]),n._v(" "),e("van-field",{staticClass:"vav-edit",attrs:{type:"text",border:!0,clearable:"",label:"输入名称",placeholder:"请输活动入名称"},model:{value:n.name,callback:function(a){n.name=a},expression:"name"}}),n._v(" "),e("van-field",{staticClass:"vav-edit",attrs:{type:"text",border:!0,clearable:"",label:"跳转链接",placeholder:"请输入跳转链接"},model:{value:n.url,callback:function(a){n.url=a},expression:"url"}}),n._v(" "),e("div",{staticClass:"add-img"},[e("span",[n._v("添加活动图片：")]),n._v(" "),""!=n.headImg?e("img",{staticClass:"img",attrs:{src:n.headImg},on:{click:n.addImage}}):n._e(),n._v(" "),""==n.headImg?e("div",{staticClass:"iconfont icon-shiliangzhinengduixiang58 shangchuan-but",on:{click:n.addImage}}):n._e()]),n._v(" "),e("div",{staticClass:"add-img"},[e("span",[n._v("添加二维码：")]),n._v(" "),""!=n.shopCodeImg?e("img",{staticClass:"img",attrs:{src:n.shopCodeImg},on:{click:n.addCodeImage}}):n._e(),n._v(" "),""==n.shopCodeImg?e("div",{staticClass:"iconfont icon-shiliangzhinengduixiang58 shangchuan-but",on:{click:n.addCodeImage}}):n._e()])],1)])};c._withStripped=!0;var l={render:c,staticRenderFns:[]},d=l;var r=!1;var u=e("VU/8")(i,d,!1,function(n){r||e("OLfl")},null,null);u.options.__file="src/views/accountadmin/accountadmin.vue";a.default=u.exports}});
//# sourceMappingURL=15.df0fe8647f9d5b31706b.js.map