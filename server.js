const http = require('http');
const qs = require("querystring");
const getFileData = require('./dropbox.js').getFileData;
const fs = require('fs');
const uploadGameData = require('./fileUpload.js').uploadGameData;
const PORT = process.env.PORT || 8000;

let gameData;
const dropbox = require('dropbox');
let dbx = new dropbox({ accessToken:"0uhMOrXbgyAAAAAAAAAAWYw9FsGiZ-VifpHpTfW-MzmiOwlAvim6-tbrNUr5JGOJ"});
let fileData="";
dbx.filesDownload({path : '/fileData.json'}).then((list)=>{gameData=list.fileBinary}).catch(err=>console.log(err));


const pushGameNameAndGameLinkIntoGameData = function(parsedData){
  let data = parsedData.text;
  let game = data.split(" ");
  gameData = JSON.parse(gameData);
  gameData.push({title: game[0],title_link: `${game[1]}`});
}

const onRequest = function(req, res) {
  console.log(req.url);
  req.on("data",(data)=>{
    let parsedData = qs.parse(data.toString());
    if(parsedData.command == "/add"){
      pushGameNameAndGameLinkIntoGameData(parsedData);
      uploadGameData('/fileData.json',gameData);
      gameData = JSON.stringify(gameData);
    }else{
      res.setHeader('Content-Type', 'application/json');
      let gamesNameAndLinks = {};
      gameData = JSON.parse(gameData);
      gamesNameAndLinks["attachments"] = gameData;
      res.write(JSON.stringify(gamesNameAndLinks));
      gameData = JSON.stringify(gameData);
    }
  });
  req.on('end',()=>{
    res.end();
  })
}
const server = http.createServer(onRequest);
server.listen(PORT);
console.log(`Server is listening at ${PORT}`);
