module.exports = ()=>{
 return new Promise((resolve,reject)=>{
   function success(){}
   function success(){console.log("table created with success youpii");}
   function failure(error){console.log(error);}
   let db = null;
       db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
       db.transaction((tx)=>{
          tx.executeSql('CREATE TABLE IF NOT EXISTS planteurs (id INT, name VARCHAR(255), telephone VARCHAR(255), section VARCHAR(255), commission VARCHAR(255), matricule VARCHAR(255), long_sechoir INT, image TEXT, groupeplanteur TEXT, know BOOLEAN, data_provenance VARCHAR(255))');
          tx.executeSql('CREATE TABLE IF NOT EXISTS campagnes (id INT, name VARCHAR(255), password_plan VARCHAR(255), prix_feuille1 INT, prix_feuille2 INT, prix_feuille3 INT, prix_feuille_x INT, prix_coupe INT, taux_refraction INT, prix_triage INT)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS zones (id INT, name VARCHAR(255))');
       },(error)=>{
         resolve('Transaction ERROR: ' + error.message);
       },()=>{
         resolve("Création de la base de donnée ok");
       }); 
 });
};

   
