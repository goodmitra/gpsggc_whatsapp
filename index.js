const express = require("express");
const bodyParser = require("body-parser")

const ejs = require("ejs");
const path = require("path");
const qrcode1 = require("qrcode");
const exp = require("constants");
const fs = require('fs');


// New app using express module
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({
	extended:true
}));

const qrcode = require('qrcode-terminal');

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

/*
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});*/
let clai="";
let wqr="";
client.on('ready', () => {
    console.log('Client is ready!');
    clai=1;
	wqr=1;
	});

client.initialize();


let age ="" ;
let name ="";
//let wkey ="";
let wfile ="";
let sess="";

const port = process.env.port || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));


app.get("/", async (req, res, next) => {
res.render("index",{wqr: wqr,});
});

app.get('/wa', async (req, res) => {
 //   const client = new Client(...)
 if(clai === 1){
	 let sry="";
	  res.render("wa", {qr_code: sry, wqr: wqr, });
 }
 else{
	 
	 let qr = await new Promise((resolve, reject) => {
        client.on('qr', (qr) => resolve(qr))
    })
	qrcode1.toDataURL(qr, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("wa", {
      qr_code: src,
	  wqr: wqr,
    });
	});	 
 }	
	
});

app.get('/logout', async (req, res) => {
 //   const client = new Client(...)
  client.destroy();
  console.log('Client is Remove New Aplly!');
  client.initialize();	
  wqr="";
  clai="";
  res.render("index",{wqr: wqr,});		
});

app.get("/user", async (req, res)=>{  
  name = req.query.name
//  wkey = req.query.key
  wfile = req.query.file;
  let imk="Yes";
  let mimeType;  
  const fileUrl=wfile;

 age = JSON.parse(req.query.array);    
 console.log("myName :", name)
 console.log("Age :", age)
 console.log("file :", fileUrl)
 if(clai === 1)
 {
   console.log('Ready'+clai);
   sess="Ready"; 
    mimeType = await MessageMedia.fromUrl('http://online.gpsggc.com/adminmata/'+wfile);
    for (const type of age) { 
      let numbet= '91'+type+'@c.us';  
      client.sendMessage(numbet, mimeType,{caption:name})
      .then(response => {
          console.log('Successfully! photo1');
        //  res.status(200).json({  status: true,   response: response });
      }).catch(err => {
          console.log('Error! photo1'+err);
        //  res.status(500).json({ status: false,response: err});
      });
    } 
 }
 else{
   console.log('not Ready'+clai);
   sess="Not ready";
 }
 res.render("user1", { name: name, number: age, wkey: imk, claty:sess });
});

app.get("/user2", async (req, res)=>{  
  name = req.query.name
  let imk="No"; 

 age = JSON.parse(req.query.array);    
 console.log("Name :", name)
 console.log("Age :", age) 
 if(clai === 1)
 {
   console.log('Ready'+clai);
   sess="Ready";    
    for (const type of age) { 
      let numbet= '91'+type+'@c.us';  
      client.sendMessage(numbet, name)
      .then(response => {
          console.log('Successfully!');
        //  res.status(200).json({  status: true,   response: response });
      }).catch(err => {
          console.log('Error! '+err);
        //  res.status(500).json({ status: false,response: err});
      });
    } 
 }
 else{
   console.log('not Ready'+clai);
   sess="Not ready";
 }
 res.render("user1", { name: name, number: age, wkey: imk, claty:sess });
}); 

/*
client.on('disconnected', async (reason) => {
  // Destroy and reinitialize the client when disconnected
   console.log(reason);
   console.log('rehh'+clai);
   client.destroy();
  client.initialize();
  //wqr="";
  //clai="";
});*/



/*
app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode1.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
  });
});
*/
app.listen(port, console.log(`Listening on port ${port}`));