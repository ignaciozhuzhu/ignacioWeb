 export var fetch_get = (url, data) => {
   function queryParams(params) {
     return Object.keys(params)
       .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
       .join('&');
   }
   let options = {
     redirect: 'error',
     method: 'GET',
     credentials: 'include'
   };
   if (data) {
     url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(data);
     //delete data;
   }
   return fetch(url, options);
 }