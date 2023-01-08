const express = require("express");
const ejs = require("ejs");
const path = require("path");
const qrcode1 = require("qrcode");
const exp = require("constants");

const app = express();


const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
	});

client.initialize();
 
 client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});

const port = process.env.port || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static("public"));


app.get("/", (req, res, next) => {
  res.render("index");
});

app.get('/wa', async (req, res) => {
 //   const client = new Client(...)
    let qr = await new Promise((resolve, reject) => {
        client.on('qr', (qr) => resolve(qr))
    })
	qrcode1.toDataURL(qr, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
	});
    //res.send(qr)
	/*
	 qrcode1.toDataURL(qr, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });*/
	 //res.send('<img src="'qr'">');
});


app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  qrcode1.toDataURL(input_text, (err, src) => {
    if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
  });
});
app.listen(port, console.log(`Listening on port ${port}`));