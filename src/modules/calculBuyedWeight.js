module.exports = ()=>{
    const campaignInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const capedWeight = require('./calculCapedWeight.js')();
    const tauxRefraction = campaignInfos.campaignTauxRefraction;
    const firstCalcul = Number(campaignInfos.weightFirstLeaf) + Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightSecondLeaf);
    const secondCalcul = Number(campaignInfos.weightSecondLeaf) + Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightThirdLeaf);
    const thirdCalcul = Number(campaignInfos.weightThirdLeaf) + Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightXLeaf);
    const fourthCalcul = Number(campaignInfos.weightXLeaf) - Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightFirstLeaf) - Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightSecondLeaf) - Number((campaignInfos.remontageLevel / 100) * campaignInfos.weightThirdLeaf);
    const temp = firstCalcul + secondCalcul + thirdCalcul + fourthCalcul + Number(capedWeight);
      
    return Number(temp) - (tauxRefraction * temp / 100);
}