exports.create = ()=>{
   const {Page,ScrollView,Button,TextView,Picker} = require('tabris');
   console.log(localStorage.getItem('dataServer'));
   const themeColor = "#00c853";
   let createNavigationView;  
   const executeNavigationView = require("../helpers/navigationViewAnimation.js")(createNavigationView, false);
   const homePage = new Page({title:`MCT`,background: `#eeeeee`}).appendTo(executeNavigationView);
   const scrollView = new ScrollView({top:0,right:0,left:0,bottom:0}).appendTo(homePage);
   const selectCampaignText = new TextView({top:60,left:15,right:15,text:"Selectionnez la campagne",textColor:'#616161',font:"22px roboto"}).appendTo(scrollView);
   let dataCampaign = JSON.parse(localStorage.getItem('dataServer'));
       dataCampaign = dataCampaign.campagnes;
   const campagnesArray = dataCampaign.map((campaignInfos)=>{
            return {name:campaignInfos.name,campaignPassword:campaignInfos.pass_plan,priceFirstLeaf:campaignInfos.p_feuil1,priceSecondLeaf:campaignInfos.p_feuil2,priceThirdLeaf:campaignInfos.p_feuil3,priceXleaf:campaignInfos.p_feuil_x,priceCutLeaf:campaignInfos.p_coupe,tauxRefraction:campaignInfos.refrac,priceTriage:campaignInfos.p_triage};
        });
   const pickerCampaign = new Picker({top:['prev()',10],left:15,right:15,itemCount:campagnesArray.length,itemText:(index) => campagnesArray[index].name,selectionIndex:0}).appendTo(scrollView);
   const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Suivant",background: themeColor,elevation:0})
   .on('select',()=>{
       const campaignInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
             campaignInfos.campaignName = campagnesArray[pickerCampaign.selectionIndex].name;
             campaignInfos.campaignPassword = campagnesArray[pickerCampaign.selectionIndex].campaignPassword;
             campaignInfos.campaignPriceFirstLeaf = campagnesArray[pickerCampaign.selectionIndex].priceFirstLeaf;
             campaignInfos.campaignPriceSecondLeaf = campagnesArray[pickerCampaign.selectionIndex].priceSecondLeaf;
             campaignInfos.campaignPriceThirdLeaf = campagnesArray[pickerCampaign.selectionIndex].priceThirdLeaf;
             campaignInfos.campaignPriceXLeaf = campagnesArray[pickerCampaign.selectionIndex].priceXleaf;
             campaignInfos.campaignPriceCutLeaf = campagnesArray[pickerCampaign.selectionIndex].priceCutLeaf;
             campaignInfos.campaignTauxRefraction = campagnesArray[pickerCampaign.selectionIndex].tauxRefraction;
             campaignInfos.campaignPriceTriage = campagnesArray[pickerCampaign.selectionIndex].priceTriage;
       localStorage.setItem('storeMctUserInfos',JSON.stringify(campaignInfos));
       require("./selectOurArea.js")(executeNavigationView);
   }).appendTo(scrollView);;
       require('../modules/createDataBase.js')();
};