import e from"axios";import t from"js-cookie";function o(e,t){try{var o=e()}catch(e){return t(e)}return o&&o.then?o.then(void 0,t):o}const{apiUrl:n,privateIPRegex:r}={apiUrl:"https://api.userfront.com/v0/",privateIPRegex:/((^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.))\d{1,3}\.\d{1,3}/g},s=e=>{try{const t=e||window.location.hostname;return!(!t.match(/localhost/g)&&!t.match(r))}catch(e){return!0}},i={mode:s()?"test":"live"};function a(e,o,n){const r=`${n}.${i.tenantId}`;o=o||{secure:"live"===i.mode,sameSite:"Lax"},"refresh"===n&&(o.sameSite="Strict"),t.set(r,e,o)}function c(e){t.remove(e),t.remove(e,{secure:!0,sameSite:"Lax"}),t.remove(e,{secure:!0,sameSite:"None"}),t.remove(e,{secure:!1,sameSite:"Lax"}),t.remove(e,{secure:!1,sameSite:"None"})}var u={setMode:function(){try{const t=o(function(){return Promise.resolve(e.get(`${n}tenants/${i.tenantId}/mode`)).then(function({data:e}){i.mode=e.mode||"test"})},function(){i.mode="test"});return Promise.resolve(t&&t.then?t.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},init:function(e,t={}){if(!e)return console.warn("Userfront initialized without tenant ID");i.tenantId=e,i.accessTokenName="access."+e,i.idTokenName="id."+e,i.refreshTokenName="refresh."+e},isTestHostname:s,logout:function(){try{const r=t.get(i.accessTokenName);if(!r)return Promise.resolve();const s=o(function(){return Promise.resolve(e.get(n+"auth/logout",{headers:{authorization:"Bearer "+r}})).then(function({data:e}){c(i.accessTokenName),c(i.idTokenName),c(i.refreshTokenName),window.location.href=e.redirectTo})},function(){});return Promise.resolve(s&&s.then?s.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},setCookie:a,signup:function({username:t,name:o,email:r,password:s}){try{return Promise.resolve(e.post(n+"auth/create",{tenantId:i.tenantId,username:t,name:o,email:r,password:s})).then(function({data:e}){if(!e.tokens)throw new Error("Please try again.");a(e.tokens.access.value,e.tokens.access.cookieOptions,"access"),a(e.tokens.id.value,e.tokens.id.cookieOptions,"id"),a(e.tokens.refresh.value,e.tokens.refresh.cookieOptions,"refresh"),window.location.href=e.redirectTo})}catch(e){return Promise.reject(e)}},store:i};export default u;
//# sourceMappingURL=userfront-core.module.js.map
