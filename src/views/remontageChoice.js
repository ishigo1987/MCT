module.exports = (navigationViewToInsert,remontageNumber)=>{
   const {Page,ScrollView,Button,TextView,Picker} = require('tabris');
   const themeColor = "#00c853";
   const remontagePage = new Page({title:"Avec ou sans remontage",background:`#eeeeee`}).on("disappear", function(){this.dispose();}).appendTo(navigationViewToInsert);
   const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(remontagePage);
   const levelRemontageText = new TextView({top:60,left:15,right:15,text:"Indiquez le pourcentage de remontage",textColor:'#616161',font:"22px roboto"}).appendTo(scrollView);
   remontageNumber = remontageNumber / 10; 
   const arrayOfLevelRemontage = Array.apply(null,Array(remontageNumber)).map((currentItem,indexCurrentItem)=>{
       return {levelRemontage:`${indexCurrentItem + 1}0`,};
   });
   const pickerPercentRemontage = new Picker({top:['prev()',20],left:15,right:15,itemCount:arrayOfLevelRemontage.length,itemText:(index) => `${arrayOfLevelRemontage[index].levelRemontage}%`,selectionIndex:0,id:'pickerPercentRemontage'})
   .on('select',()=>{
     displayMontantAchat();
   }).appendTo(scrollView);
   const montantAchatText = new TextView({left:15,top:['#pickerPercentRemontage',40],text:"Montant achat:",textColor:'#757575',font:"20px roboto"}).appendTo(scrollView);
   const montantAchatValue = new TextView({left:['prev()',3],top:['#pickerPercentRemontage',40],text:"",textColor:themeColor,font:"20px roboto"}).appendTo(scrollView);
   const button = new Button({layoutData:{ top:["prev()", 40],left:15,right:15},textColor:"#fff",text:"Suivant",background: themeColor,elevation:0})
   .on('select',()=>{
     const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
           userInfos.remontageLevel = arrayOfLevelRemontage[pickerPercentRemontage.selectionIndex].levelRemontage;
           localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
           require('./displayBilanAllOperations.js')(navigationViewToInsert);
   }).appendTo(scrollView);
   
   function displayMontantAchat(){
     const remontageLevel = arrayOfLevelRemontage[pickerPercentRemontage.selectionIndex].levelRemontage;
     const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
           userInfos.remontageLevel = remontageLevel;
     localStorage.setItem('storeMctUserInfos',userInfos);
     const montantAchat = require('../modules/calculMontantAchat.js')(true,remontageLevel);
     montantAchatValue.text = `${montantAchat} FCFA`;
   }
   displayMontantAchat();
};