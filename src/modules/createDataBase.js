module.exports = ()=>{
 return new Promise((resolve,reject)=>{
   function success(){console.log("table created with success");}
   function failure(error){console.log(error);}
   let db = null;
       db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
       db.transaction((tx)=>{
          tx.executeSql('CREATE TABLE planteurs (id INT, name VARCHAR(255), telephone VARCHAR(255), section VARCHAR(255), commission VARCHAR(255), matricule VARCHAR(255), long_sechoir INT, image TEXT, groupeplanteur TEXT)');
          tx.executeSql('CREATE TABLE campagnes (id INT, name VARCHAR(255), password_plan VARCHAR(255), prix_feuille1 INT, prix_feuille2 INT, prix_feuille3 INT, prix_feuille_x INT, prix_coupe INT, taux_refraction INT, prix_triage INT)');
          tx.executeSql('CREATE TABLE zones (id INT, name VARCHAR(255))');
       },(error)=>{
          console.log('Transaction ERROR: ' + error.message);
          resolve('bon');
       },()=>{
         console.log('create database OK');
       }); 
 });
};

   
