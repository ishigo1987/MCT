module.exports = ()=>{
    // Calcul du poids capé
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    return Number(userInfos.weightFirstLeaf) + Number(userInfos.weightSecondLeaf) + Number(userInfos.weightThirdLeaf) + Number(userInfos.weightXLeaf);
   
}