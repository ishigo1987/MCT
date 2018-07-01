module.exports = (labelToAnimate,blurOrFocus)=>{
  'use strict';
   if(blurOrFocus === "focus"){
     labelToAnimate.animate({transform:{translationY:-5,translationX:-15,scaleY:0.6,scaleX:0.6} },
      {delay:0, duration:400, repeat:0,reverse:false,easing: "linear"});
    }else{
      labelToAnimate.animate({transform:{translationY:0,translationX:0,scaleY:1,scaleX:1} },
       {delay:0,duration:400,repeat:0,reverse:false,easing: "linear"});
    }
}