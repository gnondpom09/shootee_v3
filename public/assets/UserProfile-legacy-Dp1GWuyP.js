System.register(["./user.service-legacy-BcDJZKnS.js","./index-legacy-B44unjLR.js","./usePhotoGallery-legacy-BR_Gb_7W.js","./_plugin-vue_export-helper-legacy-DgAO6S8O.js"],(function(e,t){"use strict";var a,l,n,i,o,u,r,d,s,c,v,f,h,_,p,b,g,m,y,x,k,w,C;return{setters:[e=>{a=e.a,l=e.g,n=e.b,i=e.r},e=>{o=e.d,u=e.a,r=e.k,d=e.c,s=e.w,c=e.b,v=e.o,f=e.e,h=e.f,_=e.l,p=e.g,b=e.i,g=e.t,m=e.h,y=e.D,x=e.F,k=e.I},e=>{w=e.u},e=>{C=e._}],execute:function(){var t=document.createElement("style");t.textContent=".profile[data-v-46b61163]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:33%}\n",document.head.appendChild(t);const P={class:"profile"},j=["src"],E=["src"];e("default",C(o({__name:"UserProfile",setup(e){var t;const{takePhotoAndSave:o,photos:C,getPhotoFromLibrary:O}=w(),S=u(),q=r(),F=a(),I=l(null===(t=q.value)||void 0===t?void 0:t.uid),M={header:"Modifier mon avatar",buttons:[{text:"Prendre une photo",handler:()=>{!async function(){var e,t;I.value&&(await o(),I.value.avatar=null!==(e=null===(t=C.value[0])||void 0===t?void 0:t.webviewPath)&&void 0!==e?e:I.value.avatar,n(I.value.id,I.value.avatar))}()}},{text:"Ouvrir la bibliothèque",handler:()=>{!async function(){var e,t;I.value&&(await O(),I.value.avatar=null!==(e=null===(t=C.value[0])||void 0===t?void 0:t.webviewPath)&&void 0!==e?e:I.value.avatar,n(I.value.id,I.value.avatar))}()}},{text:"Cancel",role:"cancel",data:{action:"cancel"}}]};function U(){S.push("/account")}function z(){S.push("/settings")}return(e,t)=>{const a=c("ion-title"),l=c("ion-toolbar"),n=c("ion-header"),o=c("ion-avatar"),u=c("ion-button"),r=c("ion-label"),w=c("ion-list-header"),C=c("ion-item"),O=c("ion-item-option"),S=c("ion-item-options"),q=c("ion-item-sliding"),A=c("ion-list"),D=c("ion-icon"),G=c("ion-fab-button"),H=c("ion-fab-list"),L=c("ion-fab"),T=c("ion-content"),B=c("ion-page");return v(),d(B,null,{default:s((()=>[f(n,null,{default:s((()=>[f(l,null,{default:s((()=>[f(a,{class:"oswald-title"},{default:s((()=>[h("SHOOTEE")])),_:1})])),_:1})])),_:1}),_(I)?(v(),d(T,{key:0},{default:s((()=>[p("div",P,[_(I).avatar?(v(),d(o,{key:0},{default:s((()=>[p("img",{src:_(I).avatar},null,8,j)])),_:1})):b("",!0),f(u,{id:"open-action-sheet",expand:"block",fill:"clear"},{default:s((()=>[h(" Modifier l'avatar ")])),_:1}),p("h3",null,g(_(I).pseudo),1)]),f(A,null,{default:s((()=>[f(w,null,{default:s((()=>[f(r,null,{default:s((()=>[h("Users")])),_:1})])),_:1}),(v(!0),m(x,null,y(_(F),(e=>(v(),d(q,{key:e.id},{default:s((()=>[f(C,null,{default:s((()=>[f(o,null,{default:s((()=>[p("img",{src:e.avatar},null,8,E)])),_:2},1024),f(r,null,{default:s((()=>[h(g(e.email),1)])),_:2},1024)])),_:2},1024),f(S,{side:"end"},{default:s((()=>[f(O,{color:"danger",onClick:t=>_(i)(e.id)},{default:s((()=>[h("delete")])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),128))])),_:1}),f(L,{slot:"fixed",vertical:"bottom",horizontal:"end"},{default:s((()=>[f(G,null,{default:s((()=>[f(D,{icon:"chevron-up"})])),_:1}),f(H,{side:"top"},{default:s((()=>[f(G,{onClick:z},{default:s((()=>[f(D,{name:"settings-outline"})])),_:1}),f(G,{onClick:U},{default:s((()=>[f(D,{name:"person-circle-outline"})])),_:1})])),_:1})])),_:1}),f(_(k),{trigger:"open-action-sheet",header:M.header,buttons:M.buttons},null,8,["header","buttons"])])),_:1})):b("",!0)])),_:1})}}}),[["__scopeId","data-v-46b61163"]]))}}}));
