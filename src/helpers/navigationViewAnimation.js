module.exports = (navigationViewAnimation,boolAnimation) =>{
  navigationViewAnimation = new tabris.NavigationView({
   left: 0, top: 0, right: 0, bottom: 0, toolbarColor:"#00c853", titleTextColor:"#fff"
    }).appendTo(tabris.ui.contentView);
  if(boolAnimation === true){
      navigationViewAnimation.set({
        opacity:0,
        transform:{scaleX:0,scaleY:0},
       });
      navigationViewAnimation.animate({
         transform: {scaleX:1,scaleY:1},
         opacity:1
       }, {
         delay: 0,
         duration:200,
         repeat:0,
         reverse:false,
         easing: "linear"
       } 
    ).then(function(){});
   }
 
return navigationViewAnimation;
};