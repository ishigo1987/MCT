module.exports = (navigationView,dataToDisplay)=>{
    const {Page,ScrollView,Button,TextView,ImageView} = require('tabris');
    const themeColor = "#00c853";
    
    const fullInformationsPlanter = new Page({title:"Plus d'informations sur...",background:`#eeeeee`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
    
    const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(fullInformationsPlanter);
    
    const picturePlanter = new ImageView({top:0,left:0,right:0,height:250,image:{src:dataToDisplay.picturePlanter},scaleMode:'stretch'}).appendTo(scrollView);
    
    const matriculeText = new TextView({top:['prev()',15],left:15,right:15,text:'MATRICULE',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const matriculeTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.matricule,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterNameText = new TextView({top:['prev()',5],left:15,right:15,text:'NOM DU PLANTEUR',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterNameTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.name,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterZoneText = new TextView({top:['prev()',5],left:15,right:15,text:'ZONE',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterZoneTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.zone,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterComissionText = new TextView({top:['prev()',5],left:15,right:15,text:'COMISSION',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterComissionTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.comission,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterSectionText = new TextView({top:['prev()',5],left:15,right:15,text:'SECTION',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterSectionTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.section,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterLongSechoirText = new TextView({top:['prev()',5],left:15,right:15,text:'LONGEUR SECHOIR',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterLongSechoirTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.longueurSechoir,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
    const planterRemontageLevelText = new TextView({top:['prev()',5],left:15,right:15,text:'TAUX DE SONDAGE',textColor:"#212121",font:"20px roboto"}).appendTo(scrollView);
    
    const planterRemontageLevelTextValue = new TextView({top:['prev()',5],left:15,right:15,text:dataToDisplay.remontage,textColor:themeColor,font:'18px roboto'}).appendTo(scrollView);
    
     const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Suivant",background: themeColor,elevation:0})
    .on('select',()=>{
       require("./informationsAboutLeafAndWeight.js")(navigationView,true,dataToDisplay.remontage);
    }).appendTo(scrollView);
}