/* instruction
node -v
npm -v
npm init 
npm i whatsapp-web.js  (for whatsapp)
npm i qrcode-terminal	(for whatsapp qr)
create file index.js

npm i --save express (for html)
npm i --save fs (for html)
npm i xlsx  (for excel)


*/

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
 