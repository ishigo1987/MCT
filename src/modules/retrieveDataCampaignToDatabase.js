module.exports = ()=>{
  return new Promise((resolve,reject)=>{
     function success(){console.log("database opened");}
     function failure(error){console.log(error);}
     let db = null;
         db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
         db.transaction((tx)=>{
           tx.executeSql('SELECT * FROM campagnes', [],(tx, rs)=>{
             resolve({Message:'Data retrieves with success',RequestResult:rs.rows});
           },(tx, error)=>{
              console.log('SELECT error: ' + error.message);
           });
  });
  });
};