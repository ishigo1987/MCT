module.exports = ()=>{
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const coupeWeight = userInfos.weightCutLeaf;
    const coupePrice = userInfos.campaignPriceCutLeaf;
    const tauxRefraction = userInfos.campaignTauxRefraction;
    return coupeWeight * coupePrice * tauxRefraction / 100;
};