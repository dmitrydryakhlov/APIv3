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
  'sourceName',
  'sourceNameId'
];
const resourceColumnTypes = [
  'INT(4) AUTO_INCREMENT PRIMARY KEY',
  'VARCHAR(20) NOT NULL',
  'VARCHAR(20) NOT NULL'
];
  
const resourceInsertData = [
  ['CNN', 'cnn'],
  ['USA Today', 'usa-today'],
  ['The New York Times', 'the-new-york-times'],
  ['BBC News', 'bbc-news'],
  ['Business Insider', 'business-insider']
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
DB.insertInTable('sources', resourceColumnNames, resourceInsertData);

