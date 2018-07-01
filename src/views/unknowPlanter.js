module.exports = (navigationView)=>{
    const {Page,ScrollView,Button,ImageView,TextView,TextInput,Composite} = require('tabris');
    const messageInfo = require('../helpers/alertDialog.js');
//    const toast = require('../plugins/toast.js');
    const themeColor = "#00c853";
    const font14px = '14px roboto';
    let pictureSrc;
    const unknowPlanterPage = new Page({title:"Planteur inconnu",background:`#fafafa`}).on("disappear", function(){this.dispose();}).appendTo(navigationView);
    const scrollView = new ScrollView({left:0,right:0,top:0,bottom:0,background:'#fafafafa'}).appendTo(unknowPlanterPage); 
    
    const picturePlanter = new ImageView({top:20,centerX:0,width:160,height:160,cornerRadius:80,image:{src:'src/img/unknow.png',scaleMode:'stretch',id:'picturePlanter'}}).appendTo(scrollView);
    
    const buttonPicture = new ImageView({centerX:0,top:145,width:55,height:55,elevation:3,highlightOnTouch:true,scaleMode:'stretch',image:{src:'src/icons/cameraMct.png'}})
    .on('tap',()=>{
        const actionSheetOptions = [{title:"L'appareil photo"},{title:"La gallerie"}];
        const actionSheet = require('../helpers/actionSheet.js')('Selectionnez une photo depuis',actionSheetOptions);
              actionSheet.then((responseAs)=>{
                if(responseAs === "L'appareil photo"){
                    getPictureByCameraOrGallery(Camera.PictureSourceType.CAMERA);
                }else{
                    getPictureByCameraOrGallery(Camera.PictureSourceType.SAVEDPHOTOALBUM);
                }
              }); 
    }).appendTo(scrollView);
//    const cameraIcon = new ImageView({centerX:0,centerY:0,width:24,height:24,image:{src:'src/icons/camera.png'}}).appendTo(buttonPicture);
    const labelPlanterName = new TextView({top:["#picturePlanter", 240],left:15,text:"NOM DU PLANTEUR",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
    const planterName = new TextInput({layoutData:{top:["prev()", 0],left:15,right:15},font: font14px,message: "Entrez le nom du planteur",borderColor:"#e0e0e0"}).appendTo(scrollView);
    const labelPlanterNumber = new TextView({top:["prev()", 20],left:15,text:"NUMERO DU PLANTEUR",textColor:"#212121",font:"16px roboto, noto"}).appendTo(scrollView);
    const planterNumber = new TextInput({layoutData:{top:["prev()", 0],left:15,right:15},font: font14px,message: "Entrez votre numéro",keyboard:'phone',borderColor:"#e0e0e0"}).appendTo(scrollView);
    
     const button = new Button({layoutData:{ top:["prev()", 30],left:15,right:15},textColor:"#fff",text:"Ajouter",background: themeColor,elevation:0})
    .on('select',()=>{
      if(pictureSrc === undefined || planterName.text === '' || planterNumber.text === ''){
          messageInfo('MCT','Veuillez remplir tout les champs','Ok compris','Annuler');
      }else{
          const popoverCampaignPassword = require('../modules/enterCampaignPassword.js')();
                popoverCampaignPassword.then((response)=>{
                    if(response === 'Mot de passe validé'){
                      const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
                            userInfos.planterName = planterName.text;
                            userInfos.planterNumber = planterNumber.text;
                            userInfos.pictureSrc = pictureSrc;
                      localStorage.setItem('storeMctUserInfos',JSON.stringify(userInfos));
                      require("./informationsAboutLeafAndWeight.js")(navigationView,false);
                    }
                });
          // On lance la sauvegarde des infos et switch sur une autre vue
      }
    }).appendTo(scrollView);
    
    function getPictureByCameraOrGallery(pictureSource){
        const getPicture = require('../plugins/cameraOrGallery.js')(pictureSource);
              getPicture.then((srcImageTaken)=>{
                picturePlanter.dispose();
                if(picturePlanter.isDisposed() === true){
                    const picturePlanter = new ImageView({top:20,centerX:0,width:160,height:160,cornerRadius:80,image:{src:srcImageTaken},scaleMode:'stretch'}).appendTo(scrollView); 
                }
              pictureSrc = srcImageTaken;
        });
    }
    
    return unknowPlanterPage;
};