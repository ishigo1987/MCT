module.exports = (navigationView,isKnowPlanter,remontageNumber)=>{
  const {Page,ScrollView,Button,TextView,TextInput,Composite,RadioButton,CheckBox} = require('tabris');
  const messageInfo = require('../helpers/alertDialog.js');
//    const toast = require('../plugins/toast.js');
  const themeColor = "#00c853";
  const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
  const knownPlanterPage = new Page({title:"Formulaire",background:`#eeeeee`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
  const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(knownPlanterPage);
  const firstLeafText = new TextView({top:15,left:15,text:"PREMIERE QUALITE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const inputWeightFirstLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,}).appendTo(scrollView);
     
  const secondLeafText = new TextView({top:['prev()',20],left:15,text:"DEUXIEME QUALITE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const inputWeightSecondLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(scrollView);
     
  const thirdLeafText = new TextView({top:['prev()',20],left:15,text:"TROISIEME QUALITE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const inputWeightThirdLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(scrollView);
    
  const xLeafText = new TextView({top:['prev()',20],left:15,text:"QUATRIEME QUALITE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const inputWeightXLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(scrollView);

  const cutLeafText = new TextView({top:['prev()',20],left:15,text:"COUPE",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
  const inputWeightCutLeaf = new TextInput({left:15,right:15,top:['prev()',5],message:"Poids",keyboard:'number',textColor:"#757575",font:'14px roboto',autoCorrect:true,id:'inputWeight'}).appendTo(scrollView);

 const checkTirage = new CheckBox({left:15,top:['prev()',20],text:"Le triage est t'il bon?",checkedTintColor:themeColor}).appendTo(scrollView);       
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
      }else{
          localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
          require('./displayBilanAllOperations.js')(navigationView);
      }
  }  
}).appendTo(scrollView);
    
};