
module.exports = (remontageSelected,remontageLevel)=>{
  let temp;
  const campaignInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
  remontageLevel = Number(remontageLevel);
  if(remontageSelected === true){
       const firstCalcul = Number((Number(campaignInfos.weightFirstLeaf) + Number((remontageLevel / 100) * campaignInfos.weightSecondLeaf)) * campaignInfos.campaignPriceFirstLeaf);
       
       const secondCalcul = Number((Number(campaignInfos.weightSecondLeaf) + Number((remontageLevel / 100) * campaignInfos.weightThirdLeaf)) * campaignInfos.campaignPriceSecondLeaf);

       const thirdCalcul = Number((Number(campaignInfos.weightThirdLeaf) + Number((remontageLevel / 100) * campaignInfos.weightXLeaf)) * campaignInfos.campaignPriceThirdLeaf);

       const fourthCalcul = Number((Number(campaignInfos.weightXLeaf) - Number((remontageLevel / 100) * campaignInfos.weightFirstLeaf) - Number((remontageLevel / 100) * campaignInfos.weightSecondLeaf) - Number((remontageLevel / 100) * campaignInfos.weightThirdLeaf)) * Number(campaignInfos.campaignPriceXLeaf));
       temp = firstCalcul + secondCalcul + thirdCalcul + fourthCalcul;
 
  }else{
     temp = Number(campaignInfos.weightFirstLeaf * campaignInfos.campaignPriceFirstLeaf) + Number(campaignInfos.weightSecondLeaf * campaignInfos.campaignPriceSecondLeaf) + Number(campaignInfos.weightThirdLeaf * campaignInfos.campaignPriceThirdLeaf) + Number(campaignInfos.weightXLeaf * campaignInfos.campaignPriceXLeaf); 
  }
  return temp;
}