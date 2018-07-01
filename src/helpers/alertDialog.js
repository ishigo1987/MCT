module.exports = (titleAd,messageAd,okButton,cancelButton)=>{
  "use strict";
  return new Promise((resolve,reject)=>{
    new tabris.AlertDialog({
        title:titleAd,
        message:messageAd,
        buttons: {
          ok:okButton,
          cancel:cancelButton
        }
      }).on({
        closeOk: () => {resolve("button ok");},
        closeCancel: () => {resolve("button cancel")}
      }).open();
  });
}