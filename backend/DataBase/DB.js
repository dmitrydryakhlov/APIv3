const mysql = require('mysql');
const makeRequest = require('../APIServices/MakeRequest');
const settingsDB = require ('../settings/db');

const con = mysql.createConnection(settingsDB);
  
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

function insertInTable(tableName, insertData) {
  //console.log('insertInTable');
  
  let queryString = `INSERT INTO ${tableName} VALUES (${insertData});`;
  console.log(queryString, '\n\n');

  con.query(queryString, (queryErr) => {
    if (queryErr) throw queryErr;
    console.log('***********Data Inserted**********');
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
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestSources(url)
      .then(data => { 
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports.createDatabase = createDatabase;
module.exports.createTable = createTable;
module.exports.insertInTable = insertInTable;
module.exports.deleteTable = deleteTable;
module.exports.dropDataBase = dropDataBase;
module.exports.getSourcesForCountries = getSourcesForCountries;

