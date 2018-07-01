module.exports = (navigationView)=>{
    const {Page,ScrollView,CollectionView,ImageView,TextView,Composite} = require('tabris');
    const themeColor = "#00c853";
    const font14px = '14px roboto';
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const selectKnowPlanterPage = new Page({title:"Selectionner un planteur",background:`#fafafa`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
    const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(selectKnowPlanterPage);
    let planterInformations = JSON.parse(localStorage.getItem('dataServer'));
        planterInformations = planterInformations.planteurs;
//        console.log(planterInformations);
        const collectionViewArrayItems = planterInformations.map((planterInfos)=>{
            return {id:planterInfos.id,name:planterInfos.name,longeurSechoir:planterInfos.long_sechoir,remontage:planterInfos.groupeplanteur.remont,picturePlanter:`http://www.adscameroon.com//web/uploads/media/default/0001/01/${planterInfos.image.provider_reference}`,matricule:planterInfos.mat,section:planterInfos.section,comission:planterInfos.commission};
        });
        
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
            view.find("#imageViewCell").set("image", page.picturePlanter);
            view.find("#planterName").set("text", page.name);
            view.find("#planterLongSechoir").set("text", `Long sechoir: ${page.longeurSechoir}`);
        }
     }).on("select", ({index}) => {
        const itemIndex = collectionViewArrayItems[index];
        userInfos.selectedKnownPlanterId = itemIndex.id;
        userInfos.selectedKnownPlanterLongeurSechoir = itemIndex.longeurSechoir;
//        userInfos.planterSelectedName = itemIndex.name;
//        userInfos.planterSelectedLongSechoir = itemIndex.longeurSechoir;
        localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
        require('./displayFullInformationsAboutKnowPlanter.js')(navigationView,{matricule:itemIndex.matricule,name:itemIndex.name,zone:userInfos.zoneName,longueurSechoir:itemIndex.longeurSechoir,picturePlanter:itemIndex.picturePlanter,section:itemIndex.section,comission:itemIndex.comission,remontage:itemIndex.remontage});
//        require("./informationsAboutLeafAndWeight.js")(navigationView,true,itemIndex.remontage);
        
     }).appendTo(scrollView);

}