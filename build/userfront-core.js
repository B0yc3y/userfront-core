function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("axios")),n=e(require("js-cookie"));function r(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}const{apiUrl:o,privateIPRegex:i}={apiUrl:"https://api.userfront.com/v0/",privateIPRegex:/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g},s=e=>{try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(i))}catch(e){return!0}},a={mode:s()?"test":"live"};function c(e){if(window.location.href&&!(window.location.href.indexOf(e+"=")<0))return decodeURIComponent(window.location.href.split(e+"=")[1].split("&")[0])}function u(e){if(!e)return;const t=document.createElement("a");t.href=e,t.pathname!==window.location.pathname&&(window.location.href=`${t.pathname}${t.hash}${t.search}`)}function d(e,t,r){const o=`${r}.${a.tenantId}`;t=t||{secure:"live"===a.mode,sameSite:"Lax"},"refresh"===r&&(t.sameSite="Strict"),n.set(o,e,t)}function h(e){n.remove(e),n.remove(e,{secure:!0,sameSite:"Lax"}),n.remove(e,{secure:!0,sameSite:"None"}),n.remove(e,{secure:!1,sameSite:"Lax"}),n.remove(e,{secure:!1,sameSite:"None"})}function m(){h(a.accessTokenName),h(a.idTokenName),h(a.refreshTokenName),a.accessToken=void 0,a.idToken=void 0,a.refreshToken=void 0}function l(){a.accessToken=n.get(a.accessTokenName),a.idToken=n.get(a.idTokenName),a.refreshToken=n.get(a.refreshTokenName)}function f(e){d(e.access.value,e.access.cookieOptions,"access"),d(e.id.value,e.id.cookieOptions,"id"),d(e.refresh.value,e.refresh.cookieOptions,"refresh"),l()}let w=!1;module.exports={accessToken:function(){return a.accessToken=n.get(a.accessTokenName),a.accessToken},getQueryAttr:c,idToken:function(){return a.idToken=n.get(a.idTokenName),a.idToken},init:function(e){if(!e)return console.warn("Userfront initialized without tenant ID");a.tenantId=e,a.accessTokenName="access."+e,a.idTokenName="id."+e,a.refreshTokenName="refresh."+e,l()},isTestHostname:s,login:function({method:e,email:n,username:r,emailOrUsername:i,password:s,token:d,uuid:h}){try{if(!e)throw new Error('Userfront.login called without "method" property');switch(e){case"password":return function({email:e,username:n,emailOrUsername:r,password:i}){try{return Promise.resolve(t.post(o+"auth/basic",{tenantId:a.tenantId,emailOrUsername:e||n||r,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");f(e.tokens),u(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({email:n,username:r,emailOrUsername:i,password:s});case"link":return function(e,n){try{return e||(e=c("token")),n||(n=c("uuid")),e&&n?Promise.resolve(t.put(o+"auth/link",{token:e,uuid:n,tenantId:a.tenantId})).then(function({data:e}){if(!e.tokens)throw new Error("Problem logging in.");f(e.tokens),u(c("redirect")||e.redirectTo||"/")}):Promise.resolve()}catch(e){return Promise.reject(e)}}(d,h);default:throw new Error('Userfront.login called with invalid "method" property')}}catch(e){return Promise.reject(e)}},logout:function(){try{if(!a.accessToken)return Promise.resolve(m());const e=r(function(){return Promise.resolve(t.get(o+"auth/logout",{headers:{authorization:"Bearer "+a.accessToken}})).then(function({data:e}){m(),u(e.redirectTo)})},function(){});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},redirectIfLoggedIn:function(){try{if(!a.accessToken)return Promise.resolve(m());const e=r(function(){return Promise.resolve(t.get(o+"self",{headers:{authorization:"Bearer "+a.accessToken}})).then(function({data:e}){e.tenant&&e.tenant.loginRedirectPath&&u(e.tenant.loginRedirectPath)})},function(){m()});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},registerLocationChangeEventListener:function(){var e;!w&&history&&(w=!0,history.pushState=(e=history.pushState,function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("pushstate")),window.dispatchEvent(new Event("urlchanged")),t}),history.replaceState=(e=>function(){var t=e.apply(this,arguments);return window.dispatchEvent(new Event("replacestate")),window.dispatchEvent(new Event("urlchanged")),t})(history.replaceState),window.addEventListener("popstate",()=>{window.dispatchEvent(new Event("urlchanged"))}))},resetPassword:function({uuid:e,token:n,password:r}){try{if(n||(n=c("token")),e||(e=c("uuid")),!n||!e)throw new Error("Missing token or uuid");return Promise.resolve(t.put(o+"auth/reset",{tenantId:a.tenantId,uuid:e,token:n,password:r})).then(function({data:e}){if(!e.tokens)throw new Error("There was a problem resetting your password. Please try again.");f(e.tokens),u(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}},sendLoginLink:function(e){try{return Promise.resolve(r(function(){return Promise.resolve(t.post(o+"auth/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},sendResetLink:function(e){try{return Promise.resolve(r(function(){return Promise.resolve(t.post(o+"auth/reset/link",{email:e,tenantId:a.tenantId})).then(function({data:e}){return e})},function(){throw new Error("Problem sending link")}))}catch(e){return Promise.reject(e)}},setMode:function(){try{const e=r(function(){return Promise.resolve(t.get(`${o}tenants/${a.tenantId}/mode`)).then(function({data:e}){a.mode=e.mode||"test"})},function(){a.mode="test"});return Promise.resolve(e&&e.then?e.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setCookie:d,signup:function({method:e,username:n,name:r,email:i,password:s}){try{if(!e)throw new Error('Userfront.signup called without "method" property');switch(e){case"password":return function({username:e,name:n,email:r,password:i}){try{return Promise.resolve(t.post(o+"auth/create",{tenantId:a.tenantId,username:e,name:n,email:r,password:i})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");f(e.tokens),u(c("redirect")||e.redirectTo||"/")})}catch(e){return Promise.reject(e)}}({username:n,name:r,email:i,password:s});default:throw new Error('Userfront.signup called with invalid "method" property')}}catch(e){return Promise.reject(e)}},store:a};
//# sourceMappingURL=userfront-core.js.map
