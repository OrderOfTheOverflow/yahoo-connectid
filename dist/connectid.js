!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.default=e.exports,e.exports.__esModule=!0},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),c=function(e,t){if("string"==typeof e&&e)if(window.crypto&&crypto.subtle&&crypto.subtle.digest){var r=new TextEncoder("utf-8").encode(e.trim().toLowerCase());crypto.subtle.digest("SHA-256",r).then((function(e){var r=Array.from(new Uint8Array(e));t(r.map((function(e){return("00"+e.toString(16)).slice(-2)})).join(""))}))}else t("");else t("")};function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=function(){var e={};try{e=JSON.parse(localStorage.getItem("yahoo-connectid"))||{}}catch(e){}return e},s=function(e){try{localStorage.setItem("yahoo-connectid",JSON.stringify(e))}catch(e){}},p=function(e){if(!e)return!1;return(new Date-new Date(e))/36e5<360},f=function(e){var t=e.hashedEmail,r=function(){try{return JSON.parse(localStorage.getItem("yahoo-connectid"))||{}}catch(e){return{}}}();return!t||t&&t===r.hashedEmail?{connectId:r.connectId,isStale:p(r.lastUpdated)}:null},d=function(e){return a({},u()[e]||{})},l=function(e,t){var r=a(a({},u()),{},o()({},e,t));s(r)},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0,n=new XMLHttpRequest,o=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&");n.onreadystatechange=function(e){if(n.readyState===XMLHttpRequest.DONE)if(0===n.status||n.status>=200&&n.status<400)try{r(JSON.parse(n.responseText))}catch(e){r()}else r()};try{n.withCredentials=!0,n.open("GET","".concat(e,"?").concat(o),!0),n.send(t)}catch(e){}};function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g={};g.syncHashedEmail=function(e){var t=e.pixelId,r=e.hashedEmail,n=e.gdpr,o=e.gdprConsent,c=e.usPrivacy,i=e.yahoo1p;if(t&&r){var a=d(r);if(a.connectid)if(function(e){if(!e)return!1;return(new Date-new Date(e))/36e5<360}(a.connectid.lastUpdated))return;var u="https://ups.analytics.yahoo.com/ups/".concat(t,"/fed"),s=b(b(b(b({he:r},void 0!==n?{gdpr:n}:{}),void 0!==o?{gdpr_consent:o}:{}),void 0!==c?{us_privacy:c}:{}),void 0!==i?{"1p":i}:{});y(u,s,(function(e){e&&l(r,b(b({},a),{},{connectid:{value:e.connectid,lastUpdated:(new Date).toISOString()}}))}))}},g.syncIds=function(e){e.hashedEmail&&g.syncHashedEmail(e)};var v=g;function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){o()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=function(e,t){var r=e.pixelId,n=e.email,o=e.gdpr,i=e.gdprConsent,a=e.usPrivacy,u=e.yahoo1p;r?function(e,t){!e||e.indexOf("@")<0?t(e):c(e,t)}(n,(function(e){v.syncIds(j(j(j(j(j({pixelId:r},e?{hashedEmail:e}:{}),void 0!==o?{gdpr:o}:{}),void 0!==i?{gdprConsent:i}:{}),void 0!==a?{usPrivacy:a}:{}),void 0!==u?{yahoo1p:u}:{}));var n=f({hashedEmail:e});t(n?{connectid:n.connectId}:{})})):t({})};t.default={getIds:m};"undefined"!=typeof exports&&(exports.getIds=m)}]);