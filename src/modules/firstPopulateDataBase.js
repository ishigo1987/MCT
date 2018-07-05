module.exports = (tablePlantersData,tableCampaignData,tableAreasData)=>{
  return new Promise((resolve,reject)=>{
     function success(){console.log("database opened");}
     function failure(error){console.log(error);}
     let db = null;
         db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
         const j = tablePlantersData.length;
         const k = tableCampaignData.length;
         const l = tableAreasData.length;
         db.transaction((tx)=>{
             for(let i=0; i<j; i++){
               tx.executeSql('INSERT INTO planteurs VALUES (?,?,?,?,?,?,?,?,?,?,?)', [tablePlantersData[i].id,tablePlantersData[i].name,tablePlantersData[i].telephone,tablePlantersData[i].section,tablePlantersData[i].commission,tablePlantersData[i].matricule,tablePlantersData[i].longSechoir,tablePlantersData[i].image,tablePlantersData[i].groupeplanteurRemontage,tablePlantersData[i].know,"Serveur"],(resultSet)=>{

               },(error)=>{
                 console.log('SELECT error: ' + error.message);
               }); 
             }
             for(let i=0; i<k; i++){
               tx.executeSql('INSERT INTO campagnes VALUES (?,?,?,?,?,?,?,?,?,?)', [tableCampaignData[i].id,tableCampaignData[i].name,tableCampaignData[i].passwordPlan,tableCampaignData[i].prixFeuille1,tableCampaignData[i].prixFeuille2,tableCampaignData[i].prixFeuille3,tableCampaignData[i].prixFeuilleX,tableCampaignData[i].prixCoupe,tableCampaignData[i].tauxRefraction,tableCampaignData[i].prixTriage],(resultSet)=>{
               },(error)=>{
                 console.log('SELECT error: ' + error.message);
               }); 
             }
             for(let i=0; i<l; i++){
               tx.executeSql('INSERT INTO zones VALUES (?,?)', [tableAreasData[i].id,tableAreasData[i].name],(resultSet)=>{

               },(error)=>{
                console.log('SELECT error: ' + error.message);
               }); 
             }
             resolve("All insertions are a success");
         });
         
         

        
//      console.log(areaName);
        
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
