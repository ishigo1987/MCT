exports.create = ()=>{
   const {Page,ScrollView,Button,TextView,Picker} = require('tabris');
//   console.log(localStorage.getItem('dataServer'));
   const themeColor = "#00c853";
   let createNavigationView;  
   const executeNavigationView = require("../helpers/navigationViewAnimation.js")(createNavigationView, false);
   const homePage = new Page({title:`MCT`,background: `#eeeeee`}).appendTo(executeNavigationView);
   const retriveDataCampaign = require('../modules/retrieveDataCampaignToDatabase.js')();
         retriveDataCampaign.then((response)=>{
             if(response.Message === "Data retrieves with success"){
                   const requestResult = response.RequestResult;
                   const j = requestResult.length;
                 console.log(requestResult);
                 console.log(j);
                 console.log(requestResult.item(0).name);
                   let campagnesArray = [];
                   for(let i=0; i<j; i++){
                     campagnesArray.push({campaignId:requestResult.item(i).id,campaignName:requestResult.item(i).name,campaignPassword:requestResult.item(i).password_plan,campaignPriceFirstLeaf:RequestResult.item(i).prix_feuille1,campaignPriceSecondLeaf:requestResult.item(i).prix_feuille2,campaignPriceThirdLeaf:requestResult.item(i).prix_feuille3,campaignPriceXLeaf:requestResult.item(i).prix_feuille_x,campaignPriceCutLeaf:requestResult.item(i).prix_coupe,campaignTauxRefraction:requestResult.item(i).taux_refraction,campaignPriceTriage:requestResult.item(i).prix_triage});   
                   }
                   console.log(campagnesArray);
                   const scrollView = new ScrollView({top:0,right:0,left:0,bottom:0}).appendTo(homePage);
                   const selectCampaignText = new TextView({top:60,left:15,right:15,text:"Selectionnez la campagne",textColor:'#616161',font:"22px roboto"}).appendTo(scrollView);
//                   let dataCampaign = JSON.parse(localStorage.getItem('dataServer'));
//                     dataCampaign = dataCampaign.campagnes;
//                   const campagnesArray = dataCampaign.map((campaignInfos)=>{
//                  return {name:campaignInfos.name,campaignPassword:campaignInfos.pass_plan,priceFirstLeaf:campaignInfos.p_feuil1,priceSecondLeaf:campaignInfos.p_feuil2,priceThirdLeaf:campaignInfos.p_feuil3,priceXleaf:campaignInfos.p_feuil_x,priceCutLeaf:campaignInfos.p_coupe,tauxRefraction:campaignInfos.refrac,priceTriage:campaignInfos.p_triage};
//                 });
                 const pickerCampaign = new Picker({top:['prev()',10],left:15,right:15,itemCount:campagnesArray.length,itemText:(index) => campagnesArray[index].name,selectionIndex:0}).appendTo(scrollView);
                 const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Suivant",background: themeColor,elevation:0})
                 .on('select',()=>{
                    const campaignInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
                    campaignInfos.campaignId = campagnesArray[pickerCampaign.selectionIndex].campaignId;
                    campaignInfos.campaignName = campagnesArray[pickerCampaign.selectionIndex].campaignName;
                    campaignInfos.campaignPassword = campagnesArray[pickerCampaign.selectionIndex].campaignPassword;
                    campaignInfos.campaignPriceFirstLeaf = campagnesArray[pickerCampaign.selectionIndex].campaignPriceFirstLeaf;
                    campaignInfos.campaignPriceSecondLeaf = campagnesArray[pickerCampaign.selectionIndex].campaignPriceSecondLeaf;
                    campaignInfos.campaignPriceThirdLeaf = campagnesArray[pickerCampaign.selectionIndex].campaignPriceThirdLeaf;
                    campaignInfos.campaignPriceXLeaf = campagnesArray[pickerCampaign.selectionIndex].campaignPriceXLeaf;
                    campaignInfos.campaignPriceCutLeaf = campagnesArray[pickerCampaign.selectionIndex].campaignPriceCutLeaf;
                    campaignInfos.campaignTauxRefraction = campagnesArray[pickerCampaign.selectionIndex].campaignTauxRefraction;
                    campaignInfos.campaignPriceTriage = campagnesArray[pickerCampaign.selectionIndex].campaignPriceTriage;
                    localStorage.setItem('storeMctUserInfos',JSON.stringify(campaignInfos));
                      console.log(localStorage.getItem(storeMctUserInfos));
                    require("./selectOurArea.js")(executeNavigationView);
                }).appendTo(scrollView);
            }else{
                console.log(response);
            }
        });
};