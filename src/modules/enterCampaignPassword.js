module.exports = ()=>{
  return new Promise((resolve,reject)=>{
    const {ScrollView,TextView,TextInput,Button,Popover,NavigationView,Page} = require('tabris');
    const messageInfo = require('../helpers/alertDialog.js');
    const themeColor = "#00c853";
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const popover = new Popover({width: 300, height: 400}).open();
    const popoverNavigationView = new NavigationView({left:0,right:0,top:0,bottom:0,toolbarColor:themeColor, titleTextColor:"#fff"}).appendTo(popover.contentView);
    const selectCampaignPassword = new Page({title:'Validation de la campagne'}).appendTo(popoverNavigationView);
    const scrollView = new ScrollView({top:0,left:0,right:0,bottom:0,background:'#eeeeee'}).appendTo(selectCampaignPassword);
    const textPassword = new TextView({top:['prev()',20],left:15,text:"MOT DE PASSE CAMPAGNE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
    const inputPassword = new TextInput({left:15,right:15,top:['prev()',15],message:"Mot de passe",type:"password",textColor:"#757575",font:'14px roboto'}).appendTo(scrollView);
    const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Terminer",background: themeColor,elevation:0})
    .on('select',()=>{
      if(inputPassword.text === ''){
        messageInfo('Validation de la campagne','Veuillez entrer votre mot de passe de campagne.','Ok compris','Annuler');  
      }else if(inputPassword.text !== userInfos.campaignPassword){
        messageInfo('Validation de la campagne','Le mot de passe que vous avez entré est incorrect.','Réessayer','Annuler'); 
      }else{
        resolve('Mot de passe validé');
        popover.close();
      }
    }).appendTo(scrollView);
  });
};