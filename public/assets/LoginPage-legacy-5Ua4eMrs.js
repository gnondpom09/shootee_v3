System.register(["./index-legacy-BhxHhYY0.js"],(function(e,l){"use strict";var t,a,n,u,o,i,s,r,c,d,f,v,p,m,_;return{setters:[e=>{t=e.d,a=e.u,n=e.r,u=e.a,o=e.c,i=e.w,s=e.b,r=e.o,c=e.e,d=e.f,f=e.g,v=e.h,p=e.t,m=e.i,_=e.s}],execute:function(){const l={lines:"text-center"},b={key:0};e("default",t({__name:"LoginPage",setup(e){const t=a(),h=n(""),w=n(""),g=n(""),k=u();function y(){_(t,h.value,w.value).then((e=>{console.log("Successfully logged in!",e),k.push("/tabs")})).catch((e=>{switch(e.code){case"auth/invalid-email":g.value="Invalid email";break;case"auth/user-not-found":g.value="No account with that email was found";break;case"auth/wrong-password":g.value="Incorrect password";break;default:g.value="Email or password was incorrect"}}))}function V(){window.alert("reset password")}return(e,t)=>{const a=s("ion-back-button"),n=s("ion-buttons"),u=s("ion-title"),_=s("ion-toolbar"),k=s("ion-header"),x=s("ion-input"),P=s("ion-item"),C=s("ion-button"),L=s("NavLink"),S=s("router-link"),I=s("ion-card"),N=s("ion-content"),U=s("ion-page");return r(),o(U,null,{default:i((()=>[c(k,null,{default:i((()=>[c(_,null,{default:i((()=>[c(n,{slot:"start"},{default:i((()=>[c(n,{slot:"start"},{default:i((()=>[c(a,{defaultHref:"/tabs/home"})])),_:1})])),_:1}),c(u,null,{default:i((()=>[d("Login")])),_:1})])),_:1})])),_:1}),c(N,null,{default:i((()=>[c(I,null,{default:i((()=>[c(P,null,{default:i((()=>[c(x,{type:"text",label:"email",labelPlacement:"stacked",modelValue:h.value,"onUpdate:modelValue":t[0]||(t[0]=e=>h.value=e)},null,8,["modelValue"])])),_:1}),c(P,null,{default:i((()=>[c(x,{type:"password",label:"Password",labelPlacement:"stacked",modelValue:w.value,"onUpdate:modelValue":t[1]||(t[1]=e=>w.value=e)},null,8,["modelValue"])])),_:1}),f("div",l,[f("p",null,[d(" Mot de passe perdu ? "),c(C,{click:V,fill:"clear"},{default:i((()=>[d(" Réinitialiser ")])),_:1})]),f("p",null,[d(" Pas encore inscrit ? "),c(S,{to:"/register",custom:""},{default:i((({href:e,navigate:l,isActive:t})=>[c(L,{active:t,href:e,onClick:l},{default:i((()=>[d("Créer un compte")])),_:2},1032,["active","href","onClick"])])),_:1})])]),g.value?(r(),v("p",b,p(g.value),1)):m("",!0)])),_:1}),c(C,{onClick:y,expand:"full"},{default:i((()=>[d(" Se connecter ")])),_:1})])),_:1})])),_:1})}}}))}}}));
