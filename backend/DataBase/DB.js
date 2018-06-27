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

  let newInsertData = [];
  for (let i = 0; i<_insertData.length; i++){
    newInsertData[i] = [];
  }
  [].map.call(_insertData, (item, index)=>{
    for(let _field in item){
      newInsertData[index].push(item[_field]);
      //console.log(item);
    }
  });
  //console.log(newInsertData);
  
  
  
  
  let tempString = `INSERT INTO ${tableName} (`;

  for (let i = 1; i < columnNames.length; i++) {
    tempString += `${columnNames[i]}, `;
  }
  const queryString = `${tempString.slice(0, tempString.length - 2)}) VALUES ?`;
  //console.log(queryString+newInsertData);
console.log(newInsertData[1]);

  for(let i = 0; i< newInsertData.length; i++ ){
    con.query(queryString, [ newInsertData[i] ], (queryErr) => {
      if (queryErr) throw queryErr;
      console.log(i,'Data Inserted');
    });
  }
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
        console.log('sourceToInsert***************************');
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

