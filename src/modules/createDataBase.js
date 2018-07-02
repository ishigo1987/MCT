module.exports = ()=>{
 window.sqlitePlugin.openDatabase({name: 'MctDataBase', location: 'default'},(db)=> {
   db.transaction((tx)=>{
      console.log(tx);
    },(err)=>{
      console.log('Open database ERROR: ' + JSON.stringify(err));
    });
  });
};