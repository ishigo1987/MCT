module.exports = ()=>{
    const userInfos = JSON.parse(localStorage.getItem('storeMctUserInfos'));
    const longSechoir = userInfos.selectedKnownPlanterLongeurSechoir;
    const coupeWeight = userInfos.weightCutLeaf;
    return Number(longSechoir) * Number(coupeWeight);
};