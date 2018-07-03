const themeColor = '#00c853';
require('./modules/tabrisUi.js')(`dark`, `#008c3a`, themeColor);
 localStorage.clear();
let storeMctUserInfos = localStorage.getItem("storeMctUserInfos");
if(storeMctUserInfos === null){
  const connectionView = require("./views/connection.js");
        connectionView.create();
 }else{
     // home.js
    const homePage = require("./views/home.js");
          homePage.create();
 }

