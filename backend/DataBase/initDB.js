const DB = require('./DB');

const countryColumnNames = [
  'countryId',
  'countryName',
  'countryShortName'
];
const countryColumnTypes = [
  'INT(4) AUTO_INCREMENT PRIMARY KEY',
  'VARCHAR(15) NOT NULL',
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
DB.dropDataBase('APIv3');
console.log('DB DROPPED');
try{
  DB.createDatabase('APIv3');
}catch(err){
  DB.dropDataBase('APIv3');
  console.log('DB DROPPED');
  DB.createDatabase('APIv3');
}

DB.createTable('country', countryColumnNames, countryColumnTypes);
DB.createTable('resources', resourceColumnNames, resourceColumnTypes);
DB.createTable('news', newsColumnNames, newsColumnTypes);

//DB.insertInTable('countries', countryColumnNames, countryInsertData);

new Promise((resolve, reject)=>{
  DB.getSourcesForCountries('us').then((data)=>{
    let insertStr = [];
    [].map.call(data, (item) => {
      for (let index in item){
        insertStr.push(item[index]);
      }
      DB.insertInTable('resources','"'+ insertStr.join('","').replace(/\'/g) +'"');
      insertStr= [];
    
    });
  });
});
