<<<<<<< HEAD
import e from"axios";import t from"js-cookie";import r from"jsonwebtoken";import{JwksClient as n}from"jwks-rsa";const o="https://api.userfront.com/v0/",i=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g;function s(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}const a=function(){try{return Promise.resolve(e.get({url:o+"auth/refresh",headers:{authorization:"Bearer "+f.accessToken}})).then(function(e){if(!e||!e.data||!e.data.tokens)throw new Error("Problem refreshing tokens.");P(e.data.tokens),c()})}catch(e){return Promise.reject(e)}},c=function(){try{let n;function t(t){if(n)return t;Object.assign(f.user,(({store:t,afterUpdate:n})=>{if(!t.idToken)throw new Error("User: Missing ID token");if(!t.accessToken)throw new Error("User: Missing access token");const i={},s=r.decode(t.idToken),a=["email","username","name","image","data","confirmedAt","createdAt","updatedAt","mode","userId","userUuid","tenantId","isConfirmed"];for(const e of a)i[e]=s[e];return{...i,update:function(r){try{let a;function i(e){return a?e:(n&&"function"==typeof n&&n(),Promise.resolve())}if(!s.userId)throw new Error("API resource update error: Missing ID");if(!r||Object.keys(r).length<1)throw new Error("Missing user properties to update");const c=function(n,i){try{var a=Promise.resolve(e.put({url:`${o}tenants/${t.tenantId}/users/${s.userId}`,headers:{authorization:"Bearer "+t.accessToken},payload:r})).then(function(){})}catch(e){return i(e)}return a&&a.then?a.then(void 0,i):a}(0,function(e){throw new Error(e.message)});return Promise.resolve(c&&c.then?c.then(i):i(c))}catch(e){return Promise.reject(e)}}}})({store:f,afterUpdate:a}))}if(!f.idToken)throw new Error("ID token has not been set.");if(!f.accessToken)throw new Error("Access token has not been set.");const i=s(function(){return Promise.resolve(u(f.idToken)).then(function(){})},function(e){throw e});return Promise.resolve(i&&i.then?i.then(t):t(i))}catch(e){return Promise.reject(e)}},u=function(e){try{let i,a;function t(t){if(i)return t;if(!a)throw new Error("Public key not found");try{r.verify(e,a)}catch(e){throw new Error("Token verification failed")}return Promise.resolve()}if(!e)throw new Error("Missing token");const c=s(function(){const t=r.decode(e,{complete:!0});if(!t.header||!t.header.kid)throw new Error("Token kid not defined");const i=new n({jwksUri:`${o}tenants/${f.tenantId}/jwks/${f.mode}`,requestHeaders:{origin:window.location.origin}});return Promise.resolve(i.getSigningKey(t.header.kid)).then(function(e){a=e.getPublicKey()})},function(e){throw e});return Promise.resolve(c&&c.then?c.then(t):t(c))}catch(e){return Promise.reject(e)}};let d=[];const h=e=>{try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(i))}catch(e){return!0}},f={mode:h()?"test":"live",user:{}};function m(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function l(e){if(!e)throw new Error("Missing provider");if(!f.tenantId)throw new Error("Missing tenant ID");let t=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${f.tenantId}&origin=${window.location.origin}`;const r=m("redirect");return r&&(t+="&redirect="+encodeURIComponent(r)),t}function w(e){try{document}catch(e){return}if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&(window.location.href=`${t.pathname}${t.hash}${t.search}`)}function k(e,r,n){const o=`${n}.${f.tenantId}`;r=r||{secure:"live"===f.mode,sameSite:"Lax"},"refresh"===n&&(r.sameSite="Strict"),t.set(o,e,r)}function p(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}function v(){p(f.accessTokenName),p(f.idTokenName),p(f.refreshTokenName),f.accessToken=void 0,f.idToken=void 0,f.refreshToken=void 0}function g(){f.accessToken=t.get(f.accessTokenName),f.idToken=t.get(f.idTokenName),f.refreshToken=t.get(f.refreshTokenName)}function P(e){k(e.access.value,e.access.cookieOptions,"access"),k(e.id.value,e.id.cookieOptions,"id"),k(e.refresh.value,e.refresh.cookieOptions,"refresh"),g()}let y=!1;var T={addInitCallback:function(e){e&&"function"==typeof e&&d.push(e)},accessToken:function(){return f.accessToken=t.get(f.accessTokenName),f.accessToken},getQueryAttr:m,idToken:function(){return f.idToken=t.get(f.idTokenName),f.idToken},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");f.tenantId=e,f.accessTokenName="access."+e,f.idTokenName="id."+e,f.refreshTokenName="refresh."+e,g(),f.idToken&&c();try{d.length>0&&d.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),d=[]}catch(e){}},isTestHostname:h,login:function({method:t,email:r,username:n,emailOrUsername:i,password:s,token:a,uuid:u}){try{if(!t)throw new Error('Userfront.login called without "method" property');switch(t){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=l(e);window.location.assign(t)}(t));case"password":return function({email:t,username:r,emailOrUsername:n,password:i}){try{return Promise.resolve(e.post(o+"auth/basic",{tenantId:f.tenantId,emailOrUsername:t||r||n,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");P(e.tokens),c(),w(m("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({email:r,username:n,emailOrUsername:i,password:s});case"link":return function(t,r){try{return t||(t=m("token")),r||(r=m("uuid")),t&&r?Promise.resolve(e.put(o+"auth/link",{token:t,uuid:r,tenantId:f.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");P(e.tokens),c(),w(m("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(a,u);default:throw new Error('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},logout:function(){try{if(!f.accessToken)return Promise.resolve(v());const t=s(function(){return Promise.resolve(e.get(o+"auth/logout",{headers:{authorization:"Bearer "+f.accessToken}})).then(function({data:e}){v(),w(e.redirectTo)})},function(){v()});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},redirectIfLoggedIn:function(){try{if(!f.accessToken)return Promise.resolve(v());const t=s(function(){return Promise.resolve(e.get(o+"self",{headers:{authorization:"Bearer "+f.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&w(e.tenant.loginRedirectPath)})},function(){v()});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},refresh:a,registerUrlChangedEventListener:function(){if(!y){y=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},resetPassword:function({uuid:t,token:r,password:n}){try{if(r||(r=m("token")),t||(t=m("uuid")),!r||!t)throw new Error("Missing token or uuid");return Promise.resolve(e.put(o+"auth/reset",{tenantId:f.tenantId,uuid:t,token:r,password:n})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");P(e.tokens),c(),w(m("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},sendLoginLink:function(t){try{return Promise.resolve(s(function(){return Promise.resolve(e.post(o+"auth/link",{email:t,tenantId:f.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(t){try{return Promise.resolve(s(function(){return Promise.resolve(e.post(o+"auth/reset/link",{email:t,tenantId:f.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},setMode:function(){try{const t=s(function(){return Promise.resolve(e.get(`${o}tenants/${f.tenantId}/mode`)).then(function({data:e}){f.mode=e.mode||"test"})},function(){f.mode="test"});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setCookie:k,signup:function({method:t,username:r,name:n,email:i,password:s}){try{if(!t)throw new Error('Userfront.signup called without "method" property');switch(t){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=l(e);window.location.assign(t)}(t));case"password":return function({username:t,name:r,email:n,password:i}){try{return Promise.resolve(e.post(o+"auth/create",{tenantId:f.tenantId,username:t,name:r,email:n,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");P(e.tokens),c(),w(m("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({username:r,name:n,email:i,password:s});default:throw new Error('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}},store:f,get user(){return f.user},verifyToken:u};export default T;
=======
import e from"js-cookie";import t from"axios";const n="https://api.userfront.com/v0/",r=/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g;function o(e){try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}}const i={mode:o()?"test":"live"};function a(){i.accessToken=e.get(i.accessTokenName),i.idToken=e.get(i.idTokenName),i.refreshToken=e.get(i.refreshTokenName)}function s(t,n,r){const o=`${r}.${i.tenantId}`;n=n||{secure:"live"===i.mode,sameSite:"Lax"},"refresh"===r&&(n.sameSite="Strict"),e.set(o,t,n)}function c(t){e.remove(t),e.remove(t,{secure:!0,sameSite:"Lax"}),e.remove(t,{secure:!0,sameSite:"None"}),e.remove(t,{secure:!1,sameSite:"Lax"}),e.remove(t,{secure:!1,sameSite:"None"})}function u(){c(i.accessTokenName),c(i.idTokenName),c(i.refreshTokenName),i.accessToken=void 0,i.idToken=void 0,i.refreshToken=void 0}function d(e){if(window.location.href&&!(window.location.href.indexOf(`${e}=`)<0))return decodeURIComponent(window.location.href.split(`${e}=`)[1].split("&")[0])}function h(e){try{document}catch(e){return}if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&window.location.assign(`${t.pathname}${t.hash}${t.search}`)}function l(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}function m(e){if(!e)throw new Error("Missing provider");if(!i.tenantId)throw new Error("Missing tenant ID");let t=`https://api.userfront.com/v0/auth/${e}/login?tenant_id=${i.tenantId}&origin=${window.location.origin}`;const n=d("redirect");return n&&(t+=`&redirect=${encodeURIComponent(n)}`),t}const f="https://auth.userfront.net";let w;function p(e){if(e&&e.origin===f&&e.data&&e.data.type){if(200!==e.data.status&&"logout"!==e.data.type)return console.warn(`Problem with ${e.data.type} request.`);switch(e.data.type){case"exchange":console.log("exchange");break;case"refresh":s((t=e.data.body.tokens).access.value,t.access.cookieOptions,"access"),s(t.id.value,t.id.cookieOptions,"id"),s(t.refresh.value,t.refresh.cookieOptions,"refresh"),a();break;case"logout":console.log("logout");break;default:return}var t}}let k=[],v=!1;var g={addInitCallback:function(e){e&&"function"==typeof e&&k.push(e)},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");i.tenantId=e,i.accessTokenName=`access.${e}`,i.idTokenName=`id.${e}`,i.refreshTokenName=`refresh.${e}`,function(){try{if(w)return;w=document.createElement("iframe"),w.src=f,w.id="uf-auth-frame",w.style.width="0px",w.style.height="0px",w.style.display="none",document.body.appendChild(w),function(){try{window.addEventListener("message",p)}catch(e){}}()}catch(e){}}(),a();try{k.length>0&&k.forEach(t=>{t&&"function"==typeof t&&t({tenantId:e})}),k=[]}catch(e){}},registerUrlChangedEventListener:function(){if(!v){v=!0;try{history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))})}catch(e){}var e}},logout:function(){try{if(!i.accessToken)return Promise.resolve(u());const e=function(e,r){try{var o=Promise.resolve(t.get(`${n}auth/logout`,{headers:{authorization:`Bearer ${i.accessToken}`}})).then(function({data:e}){u(),h(e.redirectTo)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){u()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setMode:function(){try{const e=function(e,r){try{var o=Promise.resolve(t.get(`${n}tenants/${i.tenantId}/mode`)).then(function({data:e}){i.mode=e.mode||"test"})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){i.mode="test"});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},login:function({method:e,email:t,username:n,emailOrUsername:r,password:o,token:a,uuid:s}){try{if(!e)throw new Error('Userfront.login called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=m(e);window.location.assign(t)}(e));case"password":return function({email:e,username:t,emailOrUsername:n,password:r}){try{return Promise.resolve(axios.post(`${apiUrl}auth/basic`,{tenantId:i.tenantId,emailOrUsername:e||t||n,password:r})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(d("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({email:t,username:n,emailOrUsername:r,password:o});case"link":return function(e,t){try{return e||(e=d("token")),t||(t=d("uuid")),e&&t?Promise.resolve(axios.put(`${apiUrl}auth/link`,{token:e,uuid:t,tenantId:i.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");setCookiesAndTokens(e.tokens),redirectToPath(d("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(a,s);default:throw new Error('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},resetPassword:function({uuid:e,token:t,password:n}){try{if(t||(t=d("token")),e||(e=d("uuid")),!t||!e)throw new Error("Missing token or uuid");return Promise.resolve(axios.put(`${apiUrl}auth/reset`,{tenantId:i.tenantId,uuid:e,token:t,password:n})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(d("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},sendLoginLink:function(e){try{return Promise.resolve(l(function(){return Promise.resolve(axios.post(`${apiUrl}auth/link`,{email:e,tenantId:i.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(e){try{return Promise.resolve(l(function(){return Promise.resolve(axios.post(`${apiUrl}auth/reset/link`,{email:e,tenantId:i.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},signup:function({method:e,username:t,name:n,email:r,password:o}){try{if(!e)throw new Error('Userfront.signup called without "method" property');switch(e){case"azure":case"facebook":case"github":case"google":case"linkedin":return Promise.resolve(function(e){if(!e)throw new Error("Missing provider");const t=m(e);window.location.assign(t)}(e));case"password":return function({username:e,name:t,email:n,password:r}){try{return Promise.resolve(axios.post(`${apiUrl}auth/create`,{tenantId:i.tenantId,username:e,name:t,email:n,password:r})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");setCookiesAndTokens(e.tokens),redirectToPath(d("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({username:t,name:n,email:r,password:o});default:throw new Error('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}},store:i,accessToken:function(){return i.accessToken=e.get(i.accessTokenName),i.accessToken},idToken:function(){return i.idToken=e.get(i.idTokenName),i.idToken},redirectIfLoggedIn:function(){try{if(!i.accessToken)return Promise.resolve(u());if(d("redirect"))return Promise.resolve(h(d("redirect")));const e=function(e,r){try{var o=Promise.resolve(t.get(`${n}self`,{headers:{authorization:`Bearer ${i.accessToken}`}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&h(e.tenant.loginRedirectPath)})}catch(e){return r()}return o&&o.then?o.then(void 0,r):o}(0,function(){u()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},isTestHostname:o};export default g;
>>>>>>> main
//# sourceMappingURL=userfront-core.module.js.map
