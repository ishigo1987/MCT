module.exports = ()=>{
    const campaignInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const temp = Number(campaignInfos.weightFirstLeaf * campaignInfos.campaignPriceFirstLeaf) + Number(campaignInfos.weightSecondLeaf * campaignInfos.campaignPriceSecondLeaf) + Number(campaignInfos.weightThirdLeaf * campaignInfos.campaignPriceThirdLeaf) + Number(campaignInfos.weightXLeaf * campaignInfos.campaignPriceXLeaf); 
}