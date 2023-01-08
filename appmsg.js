var XLSX = require('xlsx')
var workbook = XLSX.readFile('data/mynum1.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
//console.log(xlData);

const wbm = require('wbm');

wbm.start().then(async () => {
    /*const contacts = [
        { phone: '5535988841854', name: 'Bruno', age: 21 },
        { phone: '5535988841854', name: 'Will', age: 33 }
    ];*/
	const contacts = xlData;
    const message = 'Hi {{name}}, your age is {{age}}';
    // Hi Bruno, your age is 21
    // Hi Will, your age is 33
    await wbm.send(contacts, message);
    await wbm.end();
}).catch(err => console.log(err));