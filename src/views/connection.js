exports.create = () =>{
  "use strict";
  const {Page,ScrollView,ImageView,TextInput,Button,TextView} = require('tabris');
  let labelAnim = require('../helpers/animateLabel.js');
  const messageInfo = require('../helpers/alertDialog.js');
  const pDialog = require("../plugins/pDialog.js");
  const themeColor = "#00c853";
  require('../modules/tabrisUi.js')(`dark`, '#008c3a' , themeColor);
  const font14px = "14px roboto, noto";
  let createnavigationView;
  const executeNavigationView = require("../helpers/navigationViewAnimation.js")(createnavigationView,true);
        executeNavigationView.on('disappear',function(){this.dispose();});
  const connexionView = new Page({title: `Se connecter`,background:`#ffffff`}).appendTo(executeNavigationView);
  
  const scrollView = new ScrollView({left:0,right:0,top:0,background: "#fafafa",bottom:0}).appendTo(connexionView);
  const imageView = new ImageView({layoutData:{centerX: 0,width: 250,height: 150,top:40},image:"src/img/logo.jpg",scaleMode: "fit", id:"logo"}).appendTo(scrollView);
  const labelIdentifiant = new TextView({top:["prev()", 25],left:"10%",text:"IDENTIFIANT",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const login = new TextInput({layoutData:{top:["prev()", 0],left:"10%",right:"10%"},font: font14px,message: "Votre nom d'utilisateur",borderColor:"#e0e0e0",id:'login'}).appendTo(scrollView);
  const labelPassword = new TextView({top:["prev()", 20],left:"10%",text:"MOT DE PASSE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const password = new TextInput({layoutData:{top:["prev()", 0],left:"10%",right:"10%"},font: font14px,message: "Votre mot de passe",type:"password",borderColor:"#e0e0e0",id:'password'}).appendTo(scrollView);
  const button = new Button({layoutData:{ top:["prev()", 40],left:"10%",right:"10%"},font: font14px,textColor:"#fff",text:"Connexion",background: themeColor,elevation:0
  }).on("select", () =>{
     if(login.text === '' || password.text === ''){
       messageInfo('Connexion','Le couple login mot de passe que avez entré est incorrect.','Ok compris','Annuler');
     }else{
       pDialog("Vérification de vos données de connexion",false,true);
       const ajax = require('../helpers/ajax.js')(null,`http://www.adscameroon.com/web/app_dev.php/android/login/${login.text}/${password.text}`);
             ajax.then((response)=>{
              if(response.statut === 1){
                 localStorage.setItem('dataServer',JSON.stringify(response));
                 localStorage.setItem('storeMctUserInfos',JSON.stringify({login:login.text}));
                 pDialog("",false,false);
                 require("./home.js").create();
              }else{
                 messageInfo('Connexion','Impossible de se connecter veuillez réessayer ultérieurement.','Ok compris','Annuler');
              }
             });
     }
}).appendTo(scrollView);

const input = connexionView.find('TextInput');
      input.on({
        focus: function(){
         const id = this.id;
         if(id === 'login'){
          labelAnim(labelIdentifiant,'focus');
         }else if(id === 'password'){
          labelAnim(labelPassword,'focus');
         }
        },
        blur: function(){
         const id = this.id;
         if(id === 'login'){
          labelAnim(labelIdentifiant,'blur');
         }else if(id === 'password'){
          labelAnim(labelPassword,'blur');
         }
        }
      });

return executeNavigationView;
};
