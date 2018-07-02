const mysql = require('mysql');
const makeRequest = require('../APIServices/MakeRequest');
const settingsDB = require ('../settings/db');

const con = mysql.createConnection(settingsDB);
  
function createDatabase(name) {
  console.log('create Database');
  con.query('CREATE DATABASE '+ name);
  console.log('Database created');
}

function select(query){
  return new Promise ((resolve,reject)=>{
    con.query(query, (err, result)=>{
      if(err)throw err;
      resolve (result);
    });
  });
}

function createTable(name, columnNames, columnTypes) {
  let tempString = `CREATE TABLE IF NOT EXISTS ${name} (`;

  for (let i = 0; i < columnTypes.length; i++) {
    tempString += `${columnNames[i]  } ${ columnTypes[i]  }, `;
  }
  const queryString = `${tempString.slice(0, tempString.length - 2)  });`;

  //console.log(queryString);
  con.query(queryString, (queryErr) => {
    if (queryErr) throw queryErr;
    console.log('Table created');
  });
}

function insertInTable(tableName, insertData) {
  //console.log('insertInTable');
  
  let queryString = `INSERT INTO ${tableName} VALUES (${insertData});`;
  //console.log(queryString, '\n');

  con.query(queryString, (queryErr) => {
    if (queryErr) throw queryErr;
    //console.log('***********Data Inserted**********');
  });
}

function showTables(){
  
  console.log('show tables');
  //con.query('SHOW COLUMNS FROM resources;',(queryErr) => {
  //  if (queryErr) throw queryErr;
  //});
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

function getSourcesForCountries(country){
  let url = makeRequest.getUrlSourceByCountry(country);
  //console.log(url);
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
module.exports.showTables = showTables;
module.exports.getSourcesForCountries = getSourcesForCountries;
module.exports.select = select;

