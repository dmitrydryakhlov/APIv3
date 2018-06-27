const mysql = require('mysql');
const makeRequest = require('../APIServices/MakeRequest');

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database: 'mydb'
});
  
function createDatabase(name) {
  console.log('createDatabase');
  con.query(`CREATE DATABASE ${name}`, () => {
    console.log('Database created');
  });
}

function createTable(name, columnNames, columnTypes) {
  console.log('createTable');
  let tempString = `CREATE TABLE IF NOT EXISTS ${name} (`;

  for (let i = 0; i < columnTypes.length; i++) {
    tempString += `${columnNames[i]  } ${ columnTypes[i]  }, `;
  }
  const queryString = `${tempString.slice(0, tempString.length - 2)  });`;

  console.log(queryString);

  con.query(queryString, (queryErr) => {
    if (queryErr) throw queryErr;
    console.log('Table created');
  });
}

function insertInTable(tableName, columnNames, _insertData) {
  console.log('insertInTable');
  let tempString = `INSERT INTO ${tableName} (`;

  for (let i = 1; i < columnNames.length; i++) {
    tempString += `${columnNames[i]}, `;
  }
  const queryString = `${tempString.slice(0, tempString.length - 2)}) VALUES ?`;
  console.log(queryString);

  con.query(queryString, [ _insertData ], (queryErr) => {
    if (queryErr) throw queryErr;
    console.log('Data Inserted');
  });
}

function deleteTable(tableName) {
  con.query(`DROP TABLE ${tableName}`, (queryErr) => {
    if (queryErr) throw queryErr;
    console.log('Table Deleted');
  });
}

function dropDataBase(dataBaseName){
  con.query(`DROP DATABASE ${dataBaseName}`);
  console.log('DATABASE DROPPED');
}

function getSourcesForCountries(){
  let url = makeRequest.getUrlSourceByCountry('us');
  console.log(url);

  const sources = new Promise((resolve, reject) => {
    makeRequest.makeRequestSources(url)
      .then(data => { 
        console.log(data);
      })
    //res.send(data); })
      .catch(err => {
        reject(err);
      });
  });

  //console.log(sources);
  let sourceToInsert = [];
  [].map.call(sources,(item, index) => {
    console.log(index);
    sourceToInsert[index].id = 2;
    sourceToInsert[index].nameid = item.id;
    sourceToInsert[index].name = item.name;
    sourceToInsert[index].description = item.description;
    sourceToInsert[index].url = item.url;
    sourceToInsert[index].category = item.category;
    sourceToInsert[index].language = item.language;
    sourceToInsert[index].country = item.country;
  });
  console.log('sourceToInsert***************************');
  console.log(sourceToInsert);
  return sourceToInsert;
}

module.exports.createDatabase = createDatabase;
module.exports.createTable = createTable;
module.exports.insertInTable = insertInTable;
module.exports.deleteTable = deleteTable;
module.exports.dropDataBase = dropDataBase;
module.exports.getSourcesForCountries = getSourcesForCountries;

