webpackJsonp([3],{"8J/w":function(n,i,t){n.exports=t.p+"static/img/head-1.db582a1.png"},JXTs:function(n,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=t("P9l9"),a=t("fxnj"),o=t.n(a),e={name:"index",data:function(){return{noticeList:[],show:!1,showsHowMarquee:!1,img:t("8J/w"),imgList:[],licence:"",phone:"",shopLoginUrl:""}},mounted:function(){var n=this;n.$postRequest(s.notice).then(function(i){0===i.data.code&&(i.data.data.list.length<=0?n.showsHowMarquee=!1:(n.showsHowMarquee=!0,n.noticeList=i.data.data.list))}),n.$postRequest(s.slider).then(function(i){if(0===i.data.code)if(i.data.data.list.length<=0){var t={imageUrl:n.img};n.imgList.push(t)}else n.imgList=i.data.data.list});var i=location.href.split("#")[0];n.$postRequest(s.getJssdkConfig,{url:i}).then(function(n){if(0===n.data.code){var i=n.data.data.config,t=i.appId,s=i.timestamp,a=i.nonceStr,e=i.signature;o.a.config({debug:!1,appId:t,timestamp:s,nonceStr:a,signature:e,jsApiList:["scanQRCode"]}),o.a.ready(function(){}),o.a.error(function(n){})}}),n.$getRequest(s.getThirdIndexUrl).then(function(i){if(0==i.data.code){var t=i.data.data.shopLoginUrl;n.shopLoginUrl=t}})},methods:{See:function(n){window.location.href=n},clickNoticeList:function(){this.show=!0},clickOk:function(){this.show=!1},clickSingleBinding:function(){var n=this;o.a.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(i){var t=i.resultStr;n.$router.push({path:"/singlebinding",query:{result:t}})}})},clickBatchBinding:function(){var n=this;o.a.scanQRCode({needResult:1,scanType:["qrCode","barCode"],success:function(i){var t=i.resultStr;n.$router.push({path:"/batchbinding",query:{result:t}})}})},clickShopLoginUrl:function(){window.location=this.shopLoginUrl}}},c=function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("div",{staticClass:"index"},[t("div",{directives:[{name:"show",rawName:"v-show",value:n.showsHowMarquee,expression:"showsHowMarquee"}],staticClass:"haed-notice"},[t("van-notice-bar",{attrs:{"left-icon":"volume-o",scrollable:!1,color:"#1989fa",background:"#ecf9ff"}},[t("van-swipe",{staticClass:"notice-swipe",attrs:{vertical:"",autoplay:3e3,"show-indicators":!1}},n._l(n.noticeList,function(i,s){return t("van-swipe-item",{key:s,on:{click:n.clickNoticeList}},[n._v(n._s(s+1+"、")+n._s(i))])}),1)],1)],1),n._v(" "),t("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"#1d62f0"}},n._l(n.imgList,function(i,s){return t("van-swipe-item",{key:s},[t("img",{attrs:{src:i.imageUrl},on:{click:function(t){return n.See(i.linkPage)}}})])}),1),n._v(" "),t("div",{staticClass:"list"},[t("ul",[t("router-link",{attrs:{to:"/businessadmin"}},[t("li",[t("i",{staticClass:"iconfont icon-left-yingyeguanli font-i"}),n._v(" "),t("span",[n._v("营业管理")]),n._v(" "),t("i",{staticClass:"iconfont icon-gengduo1"})])]),n._v(" "),t("router-link",{attrs:{to:"/consumeradmin"}},[t("li",[t("i",{staticClass:"iconfont icon-xiaofeizhedongcha font-i"}),n._v(" "),t("span",[n._v("消费者管理")]),n._v(" "),t("i",{staticClass:"iconfont icon-gengduo1"})])]),n._v(" "),t("router-link",{attrs:{to:"/accountadmin"}},[t("li",[t("i",{staticClass:"iconfont icon-zhanghuguanli font-i"}),n._v(" "),t("span",[n._v("账户管理")]),n._v(" "),t("i",{staticClass:"iconfont icon-gengduo1"})])]),n._v(" "),t("li",{on:{click:n.clickShopLoginUrl}},[t("i",{staticClass:"iconfont icon-gexinghuashezhi"}),n._v(" "),t("span",[n._v("个性化设置")]),n._v(" "),t("i",{staticClass:"iconfont icon-gengduo1"})])],1)]),n._v(" "),t("div",{staticClass:"list"},[t("div",{staticClass:"but"},[t("div",{staticClass:"but-icon",on:{click:n.clickSingleBinding}},[t("i",{staticClass:"iconfont icon-anniu icon-anniu01"}),n._v(" "),t("p",{staticClass:"icon-anniu01"},[n._v("单个绑定")])]),n._v(" "),t("div",{staticClass:"but-icon",on:{click:n.clickBatchBinding}},[t("i",{staticClass:"iconfont icon-piliangtianjia icon-piliangtianjia01"}),n._v(" "),t("p",{staticClass:"icon-piliangtianjia01"},[n._v("批量绑定")])])])]),n._v(" "),t("van-overlay",{staticClass:"notice-overlay",attrs:{show:n.show}},[t("div",{staticClass:"wrapper"},[t("h3",[n._v("公告")]),n._v(" "),n._l(n.noticeList,function(i,s){return t("p",{key:s},[n._v("\n        "+n._s(s+1+"、")+n._s(i)+"\n      ")])}),n._v(" "),t("button",{on:{click:n.clickOk}},[n._v("好的")])],2)])],1)};c._withStripped=!0;var l={render:c,staticRenderFns:[]},r=l;var u=!1;var d=t("VU/8")(e,r,!1,function(n){u||t("kqbP")},null,null);d.options.__file="src/views/index/index.vue";i.default=d.exports},kqbP:function(n,i,t){var s=t("oWqY");"string"==typeof s&&(s=[[n.i,s,""]]),s.locals&&(n.exports=s.locals);t("rjj0")("07532416",s,!1,{})},oWqY:function(n,i,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"index.vue",sourceRoot:""}])}});
//# sourceMappingURL=3.947af521aca540c6a5a8.js.map