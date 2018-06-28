const DB = require('./DB');
const MakeRequest = require ('../APIServices/MakeRequest');
const countryColumnNames = [
  'countryId',
  'countryName',
  'countryShortName'
];
const countryColumnTypes = [
  'INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY',
  'VARCHAR(20) NOT NULL',
  'VARCHAR(3) NOT NULL '
];
  
const countryInsertData = [
  ['Russia', 'ru'],
  ['Italy', 'it'],
  ['France', 'fr'],
  ['United Kingdom', 'gb'],
  ['United States', 'us']
];
  //////////////////////////////////////////////////////////////
  
const resourceColumnNames = [
  //'sourceId',
  'sourceNameId',
  'sourceName',
  'sourceDescription',
  'sourceUrl',
  'sourceCategory',
  'sourceLanguage',
  'sourceCountry'
];
const resourceColumnTypes = [
  //'INT(4) AUTO_INCREMENT PRIMARY KEY',// sourceId
  'VARCHAR(300) NOT NULL', //sourceNameId
  'VARCHAR(300) NOT NULL', //sourceName
  'VARCHAR(500) NOT NULL', //sourceDescription
  'VARCHAR(500) NOT NULL', //sourceUrl
  'VARCHAR(300) NOT NULL', //sourceCategory
  'VARCHAR(200) NOT NULL', //sourceLanguage
  'VARCHAR(200) NOT NULL'  //sourceCountry
];
  
  //////////////////////////////////////////////////////////////
const newsColumnNames = [
  'newsId',
  'sourceId',
  'author',
  'title',
  'description',
  'url',
  'urlToImage',
  'data'
];
const newsColumnTypes = [
  'INT(5) AUTO_INCREMENT PRIMARY KEY', // newsId
  'INT(4)',      // sourceId
  'VARCHAR(20)', // author
  'VARCHAR(300)',   // title
  'VARCHAR(300)',   // description
  'VARCHAR(150)',   // url
  'VARCHAR(150)',   // urlToImage,
  'DATE'         // data
];
//DB.dropDataBase('APIv4');
//DB.showTables();
try{
  //DB.createDatabase('apiv4');
}catch(err){
  //DB.dropDataBase('apiv4');
  //console.log('DB DROPPED');
  //DB.createDatabase('apiv4');
}

DB.createTable('country', countryColumnNames, countryColumnTypes);
DB.createTable('resources', resourceColumnNames, resourceColumnTypes);
DB.createTable('news', newsColumnNames, newsColumnTypes);


//[].map.call((countryInsertData), (item)=>{
//console.log('country', '"'+item.join('","')+'"');
//  DB.insertInTable('country (countryName, countryShortName)', '"'+item.join('","')+'"');
//});



new Promise(()=>{
  DB.select('SELECT countryShortName FROM country').then((data)=>{
    for(let item in data){
      new Promise ((resolve) => {
        resolve(
          MakeRequest.makeRequestSources(
            MakeRequest.getUrlSourceByCountry(
              data[item].countryShortName)));
      }).then((data)=>{
        let insertStr = [];
        for (item of data){
          for (let index in item){
            insertStr.push(`"${item[index].replace(/\'|\"/g)}"`);
          }
          DB.insertInTable('resources', insertStr.join(','));
          insertStr= [];
        }
      });
    }
  });
});