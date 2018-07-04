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
                 // On crée la base de donées et les tables ainsi que les champs
                 const createDataBase = require('../modules/createDataBase.js')();
                       createDataBase.then((responseCreate)=>{
                           if(responseCreate === "Création de la base de donnée ok"){
                              // On peut entrer les données dans la base de données 
                              const planterInfos = response.planteurs;
                              const campaignInfos = response.campagnes;
                              const areaInfos = response.zones;
                              const infosPlantersTable = planterInfos.map((infos)=>{
                                 return {id:infos.id,name:infos.name,telephone:infos.phone,section:infos.section,commission:infos.commission,matricule:infos.mat,longSechoir:infos.long_sechoir,image:`http://www.adscameroon.com//web/uploads/media/default/0001/01/${infos.image.provider_reference}`,groupeplanteur:infos.groupeplanteur,know:infos.know};
                              });
                              const infosCampaignTable = campaignInfos.map((infos)=>{
                                 return {id:infos.id,name:infos.name,passwordPlan:infos.pass_plan,prixFeuille1:infos.p_feuil1,prixFeuille2:infos.p_feuil2,prixFeuille3:infos.p_feuil3,prixFeuilleX:infos.p_feuil_x,prixCoupe:infos.p_coupe,tauxRefraction:infos.refrac,prixTriage:infos.p_triage};
                              });
                              const infosAreaTable = areaInfos.map((infos)=>{
                                 return {id:infos.id,name:infos.name}; 
                              });
                              const populateDataBase = require('../modules/firstPopulateDataBase.js')(infosPlantersTable,infosCampaignTable,infosAreaTable);
                                    populateDataBase.then((responsePopulate)=>{
                                        if(responsePopulate === "All insertions are a success"){
                                          localStorage.setItem('storeMctUserInfos',JSON.stringify({login:login.text}));
                                           pDialog("",false,false);
//                                           executeNavigationView.dispose();
//                                           require("./home.js").create();
                                        }else{
                                           console.log(responsePopulate);  
                                        } 
                                    });
                           }else{
                               console.log(responseCreate);
                           }
                       });
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
