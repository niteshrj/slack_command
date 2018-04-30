const dropbox = require('dropbox');

const uploadGameData = function(path,gameContents){
  gameContents = JSON.stringify(gameContents);
  dbx = new dropbox({
    accessToken:"0uhMOrXbgyAAAAAAAAAAWYw9FsGiZ-VifpHpTfW-MzmiOwlAvim6-tbrNUr5JGOJ"
  });
  dbx.filesUpload({
      contents : gameContents,
      path : path,
      autorename : false,
      mute : false,
      mode : {'.tag' : 'overwrite'}
    }).catch(e=>console.log(e));
}

exports.uploadGameData = uploadGameData;
