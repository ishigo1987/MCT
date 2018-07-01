module.exports = (actionCallVariable, titleSubMenu, image, placementPriority, navigationViewInsertion) =>{
 actionCallVariable = new tabris.Action({
   title:titleSubMenu,
   placementPriority: placementPriority,
   image: {src: image,scale:1.1}
 }).appendTo(navigationViewInsertion);
   return actionCallVariable;
};