webpackJsonp([4],{"/SJK":function(n,s,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n","",{version:3,sources:[],names:[],mappings:"",file:"OrderAdmin.vue",sourceRoot:""}])},b5wG:function(n,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=t("P9l9"),a={name:"OrderAdmin",data:function(){return{list:[],loading:!1,finished:!1,exchangeList:[]}},mounted:function(){this.postExchangeListData()},methods:{postExchangeListData:function(){var n=this;this.$postRequest(e.ExchangeList).then(function(s){"0000"===s.data.code&&(n.exchangeList=s.data.data.list)})},onLoad:function(){var n=this;setTimeout(function(){for(var s=0;s<10;s++)n.list.push(n.list.length+1);n.loading=!1,n.list.length>=40&&(n.finished=!0)},1e3)}}},i=function(){var n=this,s=n.$createElement,t=n._self._c||s;return t("div",{staticClass:"order-admin"},[t("ul",[n._l(n.exchangeList,function(s,e){return t("li",{key:e},[t("img",{staticClass:"order-img",attrs:{src:""}}),n._v(" "),t("div",{staticClass:"order-right"},[t("p",{staticClass:"exchange-number"},[n._v("兑换数量："+n._s(s.exchangeNum)+"/份")]),n._v(" "),t("p",{staticClass:"rece-address"},[t("span",{staticClass:"address"},[n._v("收货地址："+n._s(s.adrress))]),n._v(" "),t("span",{staticClass:"state"},[n._v(n._s("0"===s.status?"未发货":"已发货"))])]),n._v(" "),t("p",{staticClass:"shr-dhsj"},[n._v("收货人："+n._s(s.name))]),n._v(" "),t("p",{staticClass:"shr-dhsj"},[n._v("兑换时间："+n._s(s.exchangeTime))])])])}),n._v(" "),""==n.exchangeList?t("van-divider",[n._v("暂无订单数据~~")]):n._e()],2)])};i._withStripped=!0;var r={render:i,staticRenderFns:[]},c=r;var o=!1;var d=t("VU/8")(a,c,!1,function(n){o||t("wSvp")},null,null);d.options.__file="src/views/OrderAdmin/OrderAdmin.vue";s.default=d.exports},wSvp:function(n,s,t){var e=t("/SJK");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);t("rjj0")("0020f4f8",e,!1,{})}});
//# sourceMappingURL=4.da78317108cc3abaa7a9.js.map