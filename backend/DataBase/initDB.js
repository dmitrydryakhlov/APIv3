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
  'sourceId',
  'sourceNameId',
  'sourceName',
  'sourceDescription',
  'sourceUrl',
  'sourceCategory',
  'sourceLanguage',
  'sourceCountry'
];
const resourceColumnTypes = [
  'INT(4) AUTO_INCREMENT PRIMARY KEY',// sourceId
  'VARCHAR(20) NOT NULL', //sourceNameId
  'VARCHAR(20) NOT NULL', //sourceName
  'VARCHAR(250) NOT NULL', //sourceDescription
  'VARCHAR(50) NOT NULL', //sourceUrl
  'VARCHAR(30) NOT NULL', //sourceCategory
  'VARCHAR(20) NOT NULL', //sourceLanguage
  'VARCHAR(20) NOT NULL'  //sourceCountry
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

try{
  DB.createDatabase('APIv3');
}catch(err){
  DB.dropDataBase('APIv3');
  DB.createDatabase('APIv3');
}

DB.createTable('country', countryColumnNames, countryColumnTypes);
DB.createTable('resource', resourceColumnNames, resourceColumnTypes);
DB.createTable('news', newsColumnNames, newsColumnTypes);

DB.insertInTable('countries', countryColumnNames, countryInsertData);

const sourceToInsert = DB.getSourcesForCountries('us'); 
sourceToInsert.map((item)=>{
  console.log('----------indserted--------------')
  DB.insertInTable('sources', resourceColumnNames, item);
});
