const express = require("express");
const bodyParser = require("body-parser")

const ejs = require("ejs");
const path = require("path");
const qrcode1 = require("qrcode");
const exp = require("constants");
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node')

// New app using express module
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({
	extended:true
}));

const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

/*
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});*/

client.on('ready', () => {
    console.log('Client is ready!');
	});

client.initialize();
client.on('message', async (message) => {
	if(message.body === 'gps') {
		client.sendMessage(message.from, 'Hello Sir How Can I Help You');
	}
	else if(message.body === 'hello') {
		client.sendMessage(message.from, 'Hello Sir How are You');
	}

});
var age=0 ;
var name =0;
var wkey =0;

app.get("/user", function(req, res){  
   name = req.query.name
   wkey = req.query.key
 // var age = req.query.age
  age = JSON.parse(req.query.array);    
  console.log("Name :", name)
  console.log("Age :", age)
  console.log("Key :", wkey)
  res.render("user1", { name: name, number: name1, wkey: wkey });
}) 

client.on('message', async (message) => {

  if(message.body === 'msg') {
    console.log("Name :", name)
    console.log("Age :", age)
    console.log("Key :", wkey)
        //const input_text = req.body.text;
      //  var age = JSON.parse(req.query.array);
      //const types = [ '9001480042','7014518593' ];
      const types1 = age;
      const mass=name;
      for (const type of types1) {  
  
        const number = type;
        const text = mass;
        const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
        const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
    
        const number_details = await client.getNumberId(final_number); // get mobile number details
    
        if (number_details) {
            const sendMessageData = await client.sendMessage(number_details._serialized, text); // send message
        } else {
            console.log(final_number, "Mobile number is not registered");
        }
        
      }  
  
    }
//key
else{
if(wkey === 99) {
  console.log("Name :", name)
  console.log("Age :", age)
  console.log("Key :", wkey)
      //const input_text = req.body.text;
    //  var age = JSON.parse(req.query.array);
    //const types = [ '9001480042','7014518593' ];
    const types1 = age;
    const mass=name;
    for (const type of types1) {  

      const number = type;
      const text = mass;
      const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
      const final_number = `91${sanitized_number.substring(sanitized_number.length - 10)}`; // add 91 before the number here 91 is country code of India
  
      const number_details = await client.getNumberId(final_number); // get mobile number details
  
      if (number_details) {
          const sendMessageData = await client.sendMessage(number_details._serialized, text); // send message
      } else {
          console.log(final_number, "Mobile number is not registered");
      }
      
    }  
  }  

	}
//key



});

const port = process.env.port || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));


app.get("/", async (req, res, next) => {
  res.render("index");

  /*
  let qr = await new Promise((resolve, reject) => {
    client.on('qr', (qr) => resolve(qr))
  })
  qrcode1.toDataURL(qr, (err, src) => {
  if (err) res.send("Something went wrong!!");
  res.render("wa", {
  qr_code: src,
  });
  });*/

});

app.post("/", async function(req, res) {
 // var num1 = Number(req.body.num1);
 // var num2 = Number(req.body.num2);
    
//  var result = num1 + num2 ;
    
 // res.send("Addition - " + result);
 var num2 = req.body.input1;

  let qr = await new Promise((resolve, reject) => {
    client.on('qr', (qr) => resolve(qr))
  })
  qrcode1.toDataURL(qr, (err, src) => {
  if (err) res.send("Something went wrong!!");
  res.render("wa", {
  qr_code: src,
  });  
  });

});

app.get('/wa', async (req, res) => {
 //   const client = new Client(...)
    let qr = await new Promise((resolve, reject) => {
        client.on('qr', (qr) => resolve(qr))
    })
	qrcode1.toDataURL(qr, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("wa", {
      qr_code: src,
    });
	});
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  //var age = JSON.parse(req.query.array);
});

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