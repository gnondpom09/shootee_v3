import{a as $,g as j,b as k,r as J}from"./user.service-CgTDfGLV.js";import{d as K,a as Q,k as W,c as _,w as t,b as o,o as s,e,f as c,l as a,g as u,i as x,t as y,h as X,D as Y,F as Z,I as tt}from"./index-CIosSCPW.js";import{u as et}from"./usePhotoGallery-DzinbSj0.js";import{_ as ot}from"./_plugin-vue_export-helper-DlAUqK2U.js";const nt={class:"profile"},at=["src"],it=["src"],lt=K({__name:"UserProfile",setup(st){var h;const{takePhotoAndSave:C,photos:p,getPhotoFromLibrary:w}=et(),f=Q(),P=W(),U=$(),n=j((h=P.value)==null?void 0:h.uid),v={header:"Modifier mon avatar",buttons:[{text:"Prendre une photo",handler:()=>{B()}},{text:"Ouvrir la bibliothèque",handler:()=>{F()}},{text:"Cancel",role:"cancel",data:{action:"cancel"}}]};function A(){f.push("/account")}function S(){f.push("/settings")}async function B(){var i,l;n.value&&(await C(),n.value.avatar=(l=(i=p.value[0])==null?void 0:i.webviewPath)!=null?l:n.value.avatar,k(n.value.id,n.value.avatar))}async function F(){var i,l;n.value&&(await w(),n.value.avatar=(l=(i=p.value[0])==null?void 0:i.webviewPath)!=null?l:n.value.avatar,k(n.value.id,n.value.avatar))}return(i,l)=>{const I=o("ion-title"),N=o("ion-toolbar"),T=o("ion-header"),b=o("ion-avatar"),V=o("ion-button"),g=o("ion-label"),E=o("ion-list-header"),L=o("ion-item"),O=o("ion-item-option"),D=o("ion-item-options"),M=o("ion-item-sliding"),q=o("ion-list"),d=o("ion-icon"),m=o("ion-fab-button"),z=o("ion-fab-list"),G=o("ion-fab"),H=o("ion-content"),R=o("ion-page");return s(),_(R,null,{default:t(()=>[e(T,null,{default:t(()=>[e(N,null,{default:t(()=>[e(I,{class:"oswald-title"},{default:t(()=>[c("SHOOTEE")]),_:1})]),_:1})]),_:1}),a(n)?(s(),_(H,{key:0},{default:t(()=>[u("div",nt,[a(n).avatar?(s(),_(b,{key:0},{default:t(()=>[u("img",{src:a(n).avatar},null,8,at)]),_:1})):x("",!0),e(V,{id:"open-action-sheet",expand:"block",fill:"clear"},{default:t(()=>[c(" Modifier l'avatar ")]),_:1}),u("h3",null,y(a(n).pseudo),1)]),e(q,null,{default:t(()=>[e(E,null,{default:t(()=>[e(g,null,{default:t(()=>[c("Users")]),_:1})]),_:1}),(s(!0),X(Z,null,Y(a(U),r=>(s(),_(M,{key:r.id},{default:t(()=>[e(L,null,{default:t(()=>[e(b,null,{default:t(()=>[u("img",{src:r.avatar},null,8,it)]),_:2},1024),e(g,null,{default:t(()=>[c(y(r.email),1)]),_:2},1024)]),_:2},1024),e(D,{side:"end"},{default:t(()=>[e(O,{color:"danger",onClick:ct=>a(J)(r.id)},{default:t(()=>[c("delete")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(G,{slot:"fixed",vertical:"bottom",horizontal:"end"},{default:t(()=>[e(m,null,{default:t(()=>[e(d,{icon:"chevron-up"})]),_:1}),e(z,{side:"top"},{default:t(()=>[e(m,{onClick:S},{default:t(()=>[e(d,{name:"settings-outline"})]),_:1}),e(m,{onClick:A},{default:t(()=>[e(d,{name:"person-circle-outline"})]),_:1})]),_:1})]),_:1}),e(a(tt),{trigger:"open-action-sheet",header:v.header,buttons:v.buttons},null,8,["header","buttons"])]),_:1})):x("",!0)]),_:1})}}}),mt=ot(lt,[["__scopeId","data-v-46b61163"]]);export{mt as default};
