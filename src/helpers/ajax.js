module.exports = (data,urlToSend) =>{
  "use strict";
  return new Promise((resolve,reject)=>{
     let xhr = new XMLHttpRequest();
     xhr.addEventListener("load", () =>{
      let xhrResponse = JSON.parse(xhr.responseText);
      resolve(xhrResponse);
     });
     xhr.addEventListener("error", () =>{
       resolve("Pas de connexion internet");
     });
     xhr.responseType = "text";
     xhr.open('POST',urlToSend, true);
     xhr.send(data);
  });
 };