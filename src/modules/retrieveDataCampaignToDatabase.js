module.exports = ()=>{
  return new Promise((resolve,reject)=>{
     function success(){console.log("database opened");}
     function failure(error){console.log(error);}
     let db = null;
         db = window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},success,failure);
         db.transaction((tx)=>{
           tx.executeSql('SELECT * FROM planteurs', [],(tx, rs)=>{
             console.log(rs.rows);
             console.log(rs.rows.item(0));
           },(tx, error)=>{
              console.log('SELECT error: ' + error.message);
           });
  });
  });
};