module.exports = (navigationView)=>{
    const {Page,ScrollView,CollectionView,ImageView,TextView,Composite} = require('tabris');
    const themeColor = "#00c853";
    const font14px = '14px roboto';
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const selectKnowPlanterPage = new Page({title:"Selectionner un planteur",background:`#fafafa`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
    const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(selectKnowPlanterPage);
    const retrievePlantersDetails = require('../modules/retrievePlantersDetailsToDb.js')();
          retrievePlantersDetails.then((response)=>{
              if(response.Message === "Data retrieves with success");
                   const requestResult = response.RequestResult;
                   const j = requestResult.length;
                   let collectionViewArrayItems = [];
                   let remontage;
                   for(let i=0; i<j; i++){
//                       console.log(requestResult.item(i).groupeplanteur);
//                       console.log(typeof(requestResult.item(i).groupeplanteur));
//                       remontage = JSON.parse(requestResult.item(i).groupeplanteur);
//                       remontage = remontage.remont;
//                       console.log(remontage);
                       collectionViewArrayItems.push({planterId:requestResult.item(i).id,planterName:requestResult.item(i).name,planterTelephone:requestResult.item(i).telephone,planterSection:requestResult.item(i).section,planterCommission:requestResult.item(i).commission,planterMatricule:requestResult.item(i).matricule,planterLongSechoir:requestResult.item(i).long_sechoir,planterImage:requestResult.item(i).image,planterRemontage:requestResult.item(i).groupeplanteur,planterKnow:requestResult.item(i).know});  
                   }
                  console.log(collectionViewArrayItems);
                  const planterCollectionView = new CollectionView({right:0,bottom:0,top:0,left:0,itemCount:collectionViewArrayItems.length,cellHeight:80,
                    createCell: () => {
                      const cell = new Composite({right:0,bottom:0,top:0,background: "#fff",highlightOnTouch:true});
                      // Bordures
                      new Composite({left:0,bottom:0,right:0,height:0.6,background: "#eeeeee"}).appendTo(cell);
                      const imageViewCell = new ImageView({left: 15,centerY: 0,id: "imageViewCell",width:70,height:70,cornerRadius:35,scaleMode:'stretch'}).appendTo(cell);
                      const planterName = new TextView({left:['#imageViewCell',10],top:15,font: "17px roboto, noto",textColor: "#212121",id: "planterName"}).appendTo(cell);
                      const planterLongSechoir = new TextView({top:['#planterName',5],left:['#imageViewCell',10],font:"14px roboto,noto",textColor: "#616161",id:'planterLongSechoir'}).appendTo(cell);
                      return cell;
                    },
                    updateCell:(view, index) => {
                     let page = collectionViewArrayItems[index];
                      view.find("#imageViewCell").set("image", page.planterImage);
                      view.find("#planterName").set("text", page.planterName);
                      view.find("#planterLongSechoir").set("text", `Long sechoir: ${page.planterLongSechoir}`);
                    }
                  }).on("select", ({index}) => {
                   const itemIndex = collectionViewArrayItems[index];
                   userInfos.selectedKnownPlanterId = itemIndex.planterId;
                   userInfos.selectedKnownPlanterLongeurSechoir = itemIndex.planterLongSechoir;
                   localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
                      console.log({t:itemIndex.planterRemontage});
                    require('./displayFullInformationsAboutKnowPlanter.js')(navigationView,{matricule:itemIndex.planterMatricule,name:itemIndex.planterName,zone:userInfos.zoneName,longueurSechoir:itemIndex.planterLongSechoir,picturePlanter:itemIndex.planterImage,section:itemIndex.planterSection,comission:itemIndex.planterCommission,remontage:itemIndex.planterRemontage});
//                   require("./informationsAboutLeafAndWeight.js")(navigationView,true,itemIndex.remontage);
        
                 }).appendTo(scrollView);
        });
//    let planterInformations = JSON.parse(localStorage.getItem('dataServer'));
//        planterInformations = planterInformations.planteurs;
////        console.log(planterInformations);
//        const collectionViewArrayItems = planterInformations.map((planterInfos)=>{
//            return {id:planterInfos.id,name:planterInfos.name,longeurSechoir:planterInfos.long_sechoir,remontage:planterInfos.groupeplanteur.remont,picturePlanter:`http://www.adscameroon.com//web/uploads/media/default/0001/01/${planterInfos.image.provider_reference}`,matricule:planterInfos.mat,section:planterInfos.section,comission:planterInfos.commission};
//        });
        
    

};