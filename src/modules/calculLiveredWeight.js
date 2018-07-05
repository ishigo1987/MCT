module.exports = ()=>{
    // Calcul du poids livré
    const capedWeight = require('./calculCapedWeight.js')();
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    return Number(capedWeight) + Number(userInfos.weightCutLeaf);
};