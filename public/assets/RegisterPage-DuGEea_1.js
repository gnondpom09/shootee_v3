import{d as B,u as N,r as s,a as R,c as A,w as t,b as o,o as f,e,f as b,h as E,t as S,i as j,j as q}from"./index-yxnoeXk1.js";import{c as D}from"./user.service-B7xz8fRb.js";const F={key:0},T=B({__name:"RegisterPage",setup(H){const v=N(),u=s(""),i=s(""),d=s(""),p=s(""),_=s(""),V=R();function k(){d.value===p.value?q(v,u.value,d.value).then(async a=>{console.log("registration success!",a),await D(a.user.uid,i.value,u.value),V.push("/tabs")}).catch(a=>{_.value=a.message}):alert("Les mots de passe ne sont pas identiques")}return(a,l)=>{const g=o("ion-back-button"),m=o("ion-buttons"),w=o("ion-title"),P=o("ion-toolbar"),x=o("ion-header"),r=o("ion-input"),c=o("ion-item"),y=o("ion-button"),U=o("ion-card"),h=o("ion-content"),C=o("ion-page");return f(),A(C,null,{default:t(()=>[e(x,null,{default:t(()=>[e(P,null,{default:t(()=>[e(m,{slot:"start"},{default:t(()=>[e(m,{slot:"start"},{default:t(()=>[e(g,{defaultHref:"/tabs/home"})]),_:1})]),_:1}),e(w,null,{default:t(()=>[b("S'enregistrer")]),_:1})]),_:1})]),_:1}),e(h,null,{default:t(()=>[e(U,null,{default:t(()=>[e(c,null,{default:t(()=>[e(r,{type:"text",label:"email",labelPlacement:"stacked",modelValue:u.value,"onUpdate:modelValue":l[0]||(l[0]=n=>u.value=n)},null,8,["modelValue"])]),_:1}),e(c,null,{default:t(()=>[e(r,{type:"text",label:"pseudo",labelPlacement:"stacked",modelValue:i.value,"onUpdate:modelValue":l[1]||(l[1]=n=>i.value=n)},null,8,["modelValue"])]),_:1}),e(c,null,{default:t(()=>[e(r,{type:"password",label:"Password",labelPlacement:"stacked",modelValue:d.value,"onUpdate:modelValue":l[2]||(l[2]=n=>d.value=n)},null,8,["modelValue"])]),_:1}),e(c,null,{default:t(()=>[e(r,{type:"password",label:"Repeat password",labelPlacement:"stacked",modelValue:p.value,"onUpdate:modelValue":l[3]||(l[3]=n=>p.value=n)},null,8,["modelValue"])]),_:1}),_.value?(f(),E("p",F,S(_.value),1)):j("",!0),e(y,{onClick:k,expand:"block",fill:"clear",shape:"round"},{default:t(()=>[b(" Créer mon compte ")]),_:1})]),_:1})]),_:1})]),_:1})}}});export{T as default};