module.exports = (navigationView)=>{
    const {app} = require('tabris');
    if(localStorage.getItem('viewForPreventBackNavigation') === 'displayBilanAllOperations'){
      app.on('backNavigation', (event) => {
        event.preventDefault();
        const messageInfo = require('../helpers/alertDialog.js')('Quitter la page',"Avant de quitter cette page assurez vous d'avoir lu et noté toutes ces informations parceque une fois cette page quittée,ces informations seront perdues.",'Quitter la page','Rester sur la page');
              messageInfo.then((response)=>{
                if(response === 'button ok'){
                    localStorage.removeItem('viewForPreventBackNavigation');
                    require('../views/selectOurArea.js')(navigationView);
                }else{
                    return false;
                }
              });
      });
    }
}