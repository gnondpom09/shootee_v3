System.register(["./index-legacy-_zzK64wa.js","./user.service-legacy-Bya5s0g4.js"],(function(e,l){"use strict";var a,t,u,n,o,s,d,r,c,i,m,p,f,v,b;return{setters:[e=>{a=e.d,t=e.u,u=e.r,n=e.a,o=e.c,s=e.w,d=e.b,r=e.o,c=e.e,i=e.f,m=e.h,p=e.t,f=e.i,v=e.j},e=>{b=e.c}],execute:function(){const l={key:0};e("default",a({__name:"RegisterPage",setup(e){const a=t(),_=u(""),V=u(""),g=u(""),y=u(""),k=u(""),h=n();function w(){g.value===y.value?v(a,_.value,g.value).then((async e=>{console.log("registration success!",e),await b(e.user.uid,V.value,_.value),h.push("/tabs")})).catch((e=>{k.value=e.message})):alert("Les mots de passe ne sont pas identiques")}return(e,a)=>{const t=d("ion-back-button"),u=d("ion-buttons"),n=d("ion-title"),v=d("ion-toolbar"),b=d("ion-header"),h=d("ion-input"),P=d("ion-item"),x=d("ion-button"),U=d("ion-card"),j=d("ion-content"),C=d("ion-page");return r(),o(C,null,{default:s((()=>[c(b,null,{default:s((()=>[c(v,null,{default:s((()=>[c(u,{slot:"start"},{default:s((()=>[c(u,{slot:"start"},{default:s((()=>[c(t,{defaultHref:"/tabs/home"})])),_:1})])),_:1}),c(n,null,{default:s((()=>[i("S'enregistrer")])),_:1})])),_:1})])),_:1}),c(j,null,{default:s((()=>[c(U,null,{default:s((()=>[c(P,null,{default:s((()=>[c(h,{type:"text",label:"email",labelPlacement:"stacked",modelValue:_.value,"onUpdate:modelValue":a[0]||(a[0]=e=>_.value=e)},null,8,["modelValue"])])),_:1}),c(P,null,{default:s((()=>[c(h,{type:"text",label:"pseudo",labelPlacement:"stacked",modelValue:V.value,"onUpdate:modelValue":a[1]||(a[1]=e=>V.value=e)},null,8,["modelValue"])])),_:1}),c(P,null,{default:s((()=>[c(h,{type:"password",label:"Password",labelPlacement:"stacked",modelValue:g.value,"onUpdate:modelValue":a[2]||(a[2]=e=>g.value=e)},null,8,["modelValue"])])),_:1}),c(P,null,{default:s((()=>[c(h,{type:"password",label:"Repeat password",labelPlacement:"stacked",modelValue:y.value,"onUpdate:modelValue":a[3]||(a[3]=e=>y.value=e)},null,8,["modelValue"])])),_:1}),k.value?(r(),m("p",l,p(k.value),1)):f("",!0),c(x,{onClick:w,expand:"block",fill:"clear",shape:"round"},{default:s((()=>[i(" Créer mon compte ")])),_:1})])),_:1})])),_:1})])),_:1})}}}))}}}));
