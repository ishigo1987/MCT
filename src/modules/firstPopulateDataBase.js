module.exports = (tablePlantersData,tableCampaignData,tableAreasData)=>{
  return new Promise((resolve,reject)=>{
     function success(){console.log("database opened");}
     function failure(error){console.log(error);}
     let db = null;
         db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
         const j = tablePlantersData.length;
         const k = tableCampaignData.length;
         const l = tableAreasData.length;
         for(let i=0; i<j; i++){
//           var planterId = tablePlantersData[i].id;
//           var planterName = tablePlantersData[i].name;
//           var planterTelephone = tablePlantersData[i].telephone;
//           var planterSection = tablePlantersData[i].section;
//           var planterCommission = tablePlantersData[i].commission;
//           var planterMatricule = tablePlantersData[i].matricule;
//           var planterLongSechoir = tablePlantersData[i].longSechoir;
//           var planterImage = tablePlantersData[i].images;
//           var planterGroupePlanteur = tablePlantersData[i].groupeplanteur;
//           var planterKnow = tablePlantersData[i].know;
//           var planterProvenance = "Serveur";
           db.executeSql('INSERT INTO planteurs VALUES (?,?,?,?,?,?,?,?,?,?,?)', [tablePlantersData[i].id,tablePlantersData[i].name,tablePlantersData[i].telephone,tablePlantersData[i].section,tablePlantersData[i].commission,tablePlantersData[i].matricule,tablePlantersData[i].longSechoir,tablePlantersData[i].image,tablePlantersData[i].groupeplanteur,tablePlantersData[i].know,"Serveur"],(resultSet)=>{
//             console.log(resultSet);
//             console.log('resultSet.insertId: ' + resultSet.insertId);
             console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
           },(error)=>{
              console.log('SELECT error: ' + error.message);
           }); 
         }
         for(let i=0; i<k; i++){
//           var campaignId = tableCampaignData[i].id;
//           var campaignName = tableCampaignData[i].name;
//           var campaignPasswordPlan = tableCampaignData[i].passwordPlan;
//           var campaignPriceLeaf1 = tableCampaignData[i].prixFeuille1;
//           var campaignPriceLeaf2 = tableCampaignData[i].prixFeuille2;
//           var campaignPriceLeaf3 = tableCampaignData[i].prixFeuille3;
//           var campaignPriceLeafX = tableCampaignData[i].prixFeuilleX;
//           var campaignPriceCutLeaf = tableCampaignData[i].prixCoupe;
//           var campaignRefractionLevel = tableCampaignData[i].tauxRefraction;
//           var campaignPriceTriage = tableCampaignData[i].prixTriage;
           db.executeSql('INSERT INTO campagnes VALUES (?,?,?,?,?,?,?,?,?,?)', [tableCampaignData[i].id,tableCampaignData[i].name,tableCampaignData[i].passwordPlan,tableCampaignData[i].prixFeuille1,tableCampaignData[i].prixFeuille2,tableCampaignData[i].prixFeuille3,tableCampaignData[i].prixFeuilleX,tableCampaignData[i].prixCoupe,tableCampaignData[i].tauxRefraction,tableCampaignData[i].prixTriage],(resultSet)=>{
//             console.log('resultSet.insertId: ' + resultSet.insertId);
             console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
           },(error)=>{
              console.log('SELECT error: ' + error.message);
           }); 
         }

         for(let i=0; i<l; i++){
//           var areaId = tableAreasData[i].id;
//           var areaName = tableAreasData[i].name
           db.executeSql('INSERT INTO zones VALUES (?,?)', [tableAreasData[i].id,tableAreasData[i].name],(resultSet)=>{
//             console.log('resultSet.insertId: ' + resultSet.insertId);
             console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
           },(error)=>{
              console.log('SELECT error: ' + error.message);
           }); 
         }
//      console.log(areaName);
        resolve("All insertions are a success");
//       db.sqlBatch([
//         [ 'INSERT INTO planteurs VALUES (?,?,?,?,?,?,?,?,?,?,?)', [planterId, planterName, planterTelephone, planterSection, planterCommission, planterMatricule, planterLongSechoir, planterImage, planterGroupePlanteur, planterKnow, planterProvenance] ],
//         [ 'INSERT INTO campagnes VALUES (?,?,?,?,?,?,?,?,?,?)', [campaignId, campaignName, campaignPasswordPlan, campaignPriceLeaf1, campaignPriceLeaf2, campaignPriceLeaf3, campaignPriceLeafX, campaignPriceCutLeaf, campaignRefractionLevel, campaignPriceTriage] ],
//         [ 'INSERT INTO zones VALUES (?,?)', [areaId, areaName] ],
//      ],()=>{
//       console.log('c bon tout est inseré');
//       resolve("All insertions are a success");
//      },(error)=>{
//       resolve('SQL batch ERROR: ' + error.message);
//      }); 
  });
};
