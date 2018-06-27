let settingsDB = {
  host:'localhost',
  user:'root',
  password:'root123',
  database: 'APIv3'
};

try {
  settingsDB = require ('./dblocal');
  console.log('use local setting');
}catch(err){
  console.log('use gloabal setting');
}

module.exports = settingsDB;
