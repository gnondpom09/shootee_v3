import{d as S,u as A,r,a as M,c as R,w as t,b as o,o as b,e,f as a,g as _,h as U,t as D,i as F,s as H}from"./index-CIosSCPW.js";const T={lines:"text-center"},W={key:0},z=S({__name:"LoginPage",setup(j){const k=A(),c=r(""),i=r(""),n=r(""),v=M();function w(){H(k,c.value,i.value).then(s=>{console.log("Successfully logged in!",s),v.push("/tabs")}).catch(s=>{switch(s.code){case"auth/invalid-email":n.value="Invalid email";break;case"auth/user-not-found":n.value="No account with that email was found";break;case"auth/wrong-password":n.value="Incorrect password";break;default:n.value="Email or password was incorrect";break}})}function h(){window.alert("reset password")}return(s,u)=>{const g=o("ion-back-button"),d=o("ion-buttons"),V=o("ion-title"),C=o("ion-toolbar"),x=o("ion-header"),p=o("ion-input"),m=o("ion-item"),f=o("ion-button"),N=o("NavLink"),P=o("router-link"),y=o("ion-card"),B=o("ion-content"),I=o("ion-page");return b(),R(I,null,{default:t(()=>[e(x,null,{default:t(()=>[e(C,null,{default:t(()=>[e(d,{slot:"start"},{default:t(()=>[e(d,{slot:"start"},{default:t(()=>[e(g,{defaultHref:"/tabs/home"})]),_:1})]),_:1}),e(V,null,{default:t(()=>[a("Login")]),_:1})]),_:1})]),_:1}),e(B,null,{default:t(()=>[e(y,null,{default:t(()=>[e(m,null,{default:t(()=>[e(p,{type:"text",label:"email",labelPlacement:"stacked",modelValue:c.value,"onUpdate:modelValue":u[0]||(u[0]=l=>c.value=l)},null,8,["modelValue"])]),_:1}),e(m,null,{default:t(()=>[e(p,{type:"password",label:"Password",labelPlacement:"stacked",modelValue:i.value,"onUpdate:modelValue":u[1]||(u[1]=l=>i.value=l)},null,8,["modelValue"])]),_:1}),_("div",T,[_("p",null,[a(" Mot de passe perdu ? "),e(f,{click:h,fill:"clear"},{default:t(()=>[a(" Réinitialiser ")]),_:1})]),_("p",null,[a(" Pas encore inscrit ? "),e(P,{to:"/register",custom:""},{default:t(({href:l,navigate:L,isActive:E})=>[e(N,{active:E,href:l,onClick:L},{default:t(()=>[a("Créer un compte")]),_:2},1032,["active","href","onClick"])]),_:1})])]),n.value?(b(),U("p",W,D(n.value),1)):F("",!0)]),_:1}),e(f,{onClick:w,expand:"full"},{default:t(()=>[a(" Se connecter ")]),_:1})]),_:1})]),_:1})}}});export{z as default};