module.exports = (withRemontage,remontageLevel)=>{
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const tauxRefraction = userInfos.campaignTauxRefraction;
    const temp = require('../helpers/temporaryCalculForCapedPrice.js')(withRemontage,remontageLevel);
    return Number(temp) - (Number(temp) * Number(tauxRefraction) / 100);
}