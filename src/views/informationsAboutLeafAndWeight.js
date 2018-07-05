module.exports = (navigationView,isKnowPlanter,remontageNumber)=>{
  const {Page,ScrollView,Button,TextView,TextInput,Composite,RadioButton,CheckBox} = require('tabris');
  const messageInfo = require('../helpers/alertDialog.js');
//    const toast = require('../plugins/toast.js');
  const themeColor = "#00c853";
  const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
  const knownPlanterPage = new Page({title:"Formulaire",background:`#eeeeee`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
  const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(knownPlanterPage);
  const compositeFirstLeaf = new Composite({top:0,left:0,right:0}).appendTo(scrollView);
  const firstLeafText = new TextView({top:15,left:15,text:"1ERE FEUILLE INTEGRE LONG",textColor:"#212121",font:"16px roboto, noto"}).appendTo(compositeFirstLeaf);
  const inputWeightFirstLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,}).appendTo(compositeFirstLeaf);
  
  const compositeSecondLeaf = new Composite({top:['prev()',0],left:0,right:0}).appendTo(scrollView);    
  const secondLeafText = new TextView({top:['prev()',20],left:15,text:"2IEME FEUILLE INTEGRE LONG",textColor:"#212121",font:"16px roboto, noto"}).appendTo(compositeSecondLeaf);
  const inputWeightSecondLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(compositeSecondLeaf);
     
  const compositeThirdLeaf = new Composite({top:['prev()',0],left:0,right:0}).appendTo(scrollView)
  const thirdLeafText = new TextView({top:['prev()',20],left:15,text:"3IEME FEUILLE INTEGRE LONG",textColor:"#212121",font:"16px roboto, noto"}).appendTo(compositeThirdLeaf);
  const inputWeightThirdLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(compositeThirdLeaf);
    
  const compositeXLeaf = new Composite({top:['prev()',0],left:0,right:0}).appendTo(scrollView);
  const xLeafText = new TextView({top:['prev()',20],left:15,text:"X LONG",textColor:"#212121",font:"16px roboto, noto"}).appendTo(compositeXLeaf);
  const inputWeightXLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(compositeXLeaf);

const compositeCutLeaf = new Composite({top:['prev()',0],left:0,right:0}).appendTo(scrollView);
const cutLeafText = new TextView({top:['prev()',20],left:15,text:"COUPE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(compositeCutLeaf);
const inputWeightCutLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(compositeCutLeaf);

const checkTirage = new CheckBox({left:15,top:['prev()',20],text:"Le tirage est t'il bon?",checkedTintColor:themeColor}).appendTo(scrollView);       
const button = new Button({top:['prev()',15],left:15,right:15,text:'Suivant',textColor:'#ffffff',background:themeColor})
.on('select',()=>{
  if(inputWeightFirstLeaf.text === "" || inputWeightSecondLeaf.text === "" || inputWeightThirdLeaf.text === "" || inputWeightXLeaf.text === "" ||  inputWeightCutLeaf.text === "" || checkTirage.checked === false){
      messageInfo('Planteur connu','Veuillez remplir tout les champs.','Ok compris','Annuler');
  }else{
      userInfos.weightFirstLeaf = inputWeightFirstLeaf.text;
      userInfos.weightSecondLeaf = inputWeightSecondLeaf.text;
      userInfos.weightThirdLeaf = inputWeightThirdLeaf.text;
      userInfos.weightXLeaf = inputWeightXLeaf.text;
      userInfos.weightCutLeaf = inputWeightCutLeaf.text;
      userInfos.verificationTirage = checkTirage.checked;
      if(isKnowPlanter === true){
        const remontage = messageInfo('Planteur connu','Voulez vous faire un remontage?','Oui','Non');
            remontage.then((response)=>{
               if(response === "button ok"){
                 userInfos.withRemontage = true;
                 localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
                 require("./remontageChoice.js")(navigationView,remontageNumber);               
               }else{
                 // Affichage du récapitulatif sans remontage
                 userInfos.withRemontage = false;
                 localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
                 require('./displayBilanAllOperations.js')(navigationView);
               }
            });  
      }
  }  
}).appendTo(scrollView);
    
};