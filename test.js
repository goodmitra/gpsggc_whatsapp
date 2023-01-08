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
/*
	  // Number where you want to send the message.
 const number = "+911234567890";

  // Your message.
 const text = "Hey john";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
 const chatId = number.substring(1) + "@c.us";

 // Sending message.
 client.sendMessage(chatId, text);*/
 
 /*
     const number = [
      { phone: "number1", name: "name1" },
      { phone: "number2", name: "name2" },
    ];

    number.forEach((el) => {

      // Your message.
      const text = `teste ${el.name}`;

      // Getting chatId from the number.
      // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
      const chatId = el.phone.substring(1) + "@c.us";

      // Sending message.
      client.sendMessage(chatId, text);
    });
 */
	
});

client.initialize();
 
 client.on('message', message => {
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});
 