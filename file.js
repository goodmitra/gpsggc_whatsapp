//npm install read-excel-file --save
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const readXlsxFile = require('read-excel-file/node')
const fs = require('fs');
/*
readXlsxFile('data/numb1.xlsx').then((rows) => {
   console.log(rows);
  })

  // Readable Stream.
readXlsxFile(fs.createReadStream('data/numb1.xlsx')).then((rows) => {
    console.log(rows);
  })
  
  // Buffer.
  readXlsxFile(Buffer.from(fs.readFileSync('data/numb1.xlsx'))).then((rows) => {
    console.log(rows);
  })*/



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/exl',function(req,res){
  res.sendFile(path.join(__dirname+'/exl.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
