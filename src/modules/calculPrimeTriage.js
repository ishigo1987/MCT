module.exports = ()=>{
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const prixTriage = userInfos.campaignPriceTriage;
    const coupeWeight = userInfos.weightCutLeaf;
    return Number(prixTriage) * Number(coupeWeight);
};