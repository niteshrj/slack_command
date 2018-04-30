const dropbox = require('dropbox');
const getFileData = function(filePath){
  let dbx = new dropbox({ accessToken:"0uhMOrXbgyAAAAAAAAAAWYw9FsGiZ-VifpHpTfW-MzmiOwlAvim6-tbrNUr5JGOJ"});
  let fileData="";
  dbx.filesDownload({path : filePath}).then((list)=>{fileData=list}).catch(err=>console.log(err));
  console.log(filePath);
  return fileData;
}
exports.getFileData = getFileData;
