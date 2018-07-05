module.exports = (navigationView)=>{
 "use strict";
    const themeColor = "#00c853";
//    const toast = require('../plugins/toast.js');
    const {Page,ScrollView,Button,TextView,Picker} = require('tabris');
    const messageInfo = require('../helpers/alertDialog.js');
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const selectOurAreaPage = new Page({title:`Selection de la zone`,background: `#eeeeee`}).appendTo(navigationView);
    const scrollView = new ScrollView({top:0,right:0,left:0,bottom:0}).appendTo(selectOurAreaPage);
    const introText = new TextView({left:15,right:15,top:15,textColor:'#424242',text:"Veuillez choisir la zone d'achat dans laquelle vous vous trouvez",font:'16px roboto'}).appendTo(scrollView);
    let dataZones = JSON.parse(localStorage.getItem('dataServer'));
        dataZones = dataZones.zones;
    let zonesArray = dataZones.map((zoneName)=>{
            return {name:zoneName.name};
        });
        zonesArray.unshift({name:"Sélectionnez votre zone"});
    const typeOfPlanter = [{type:'Sélectionnez votre type de planteur'},{type:'Planteur connu'},{type:'Planteur inconnu'}];
    const pickerSellArea = new Picker({top:['prev()',30],left:15,right:15,itemCount:zonesArray.length,itemText:(index) => zonesArray[index].name,selectionIndex:0}).appendTo(scrollView);
    const pickerTypeOfPlanter = new Picker({top:['prev()',30],left:15,right:15,itemCount:typeOfPlanter.length,itemText:(index) => typeOfPlanter[index].type,selectionIndex:0}).appendTo(scrollView);
    
    const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Suivant",background: themeColor,elevation:0})
    .on('select',()=>{
       if(pickerSellArea.selectionIndex === 0){
         messageInfo('MCT','Veuillez choisir votre zone','Ok compris','Annuler'); 
       }else{
          if(pickerTypeOfPlanter.selectionIndex === 2){
             // Vue planteur non connu 
             userInfos.zoneName = zonesArray[pickerSellArea.selectionIndex].name;
             localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
             require("./unknowPlanter.js")(navigationView);
          }else{
              // Vue planteur connu
              userInfos.zoneName = zonesArray[pickerSellArea.selectionIndex].name;
              localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
              require("./selectKnownPlanter.js")(navigationView);
          }
             userInfos.zoneName = zonesArray[pickerSellArea.selectionIndex].name;
             localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
             require("./selectKnownPlanter.js")(navigationView);
       }
    }).appendTo(scrollView);
};