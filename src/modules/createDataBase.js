module.exports = ()=>{
 return new Promise((resolve,reject)=>{
   let db = null;
       db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'});
       db.transaction((tx)=>{
          tx.executeSql('CREATE TABLE planteurs (id INT, name VARCHAR(255), telephone VARCHAR(255), section VARCHAR(255), commission VARCHAR(255), matricule VARCHAR(255), long-sechoir INT, image TEXT, groupeplanteur TEXT)');
          tx.executeSql('CREATE TABLE campagnes (id INT, name VARCHAR(255), password-plan VARCHAR(255), prix-feuille1 INT, prix-feuille2 INT, prix-feuille3 INT, prix-feuille-x INT, prix-coupe INT, taux-refraction INT, prix-triage INT)');
          tx.executeSql('CREATE TABLE zones (id INT, name VARCHAR(255))');
       },(error)=>{
          console.log('Transaction ERROR: ' + error.message);
          resolve('bon');
       },()=>{
         console.log('create database OK');
       }); 
 });
};

   