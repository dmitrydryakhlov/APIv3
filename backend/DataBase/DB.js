const mysql = require('mysql');

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database: 'mydb'
});
  
function createDatabase(name) {
  console.log('createDatabase');
  con.query(`CREATE DATABASE ${name}`, (error) => {
    if (error) throw error;
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
  // this.state.connection.end();
}

function dropDataBase(dataBaseName){
  con.query(`DROP DATABASE ${dataBaseName}`)
  console.log('DATABASE DROPPED');
}

module.exports.createDatabase = createDatabase;
module.exports.createTable = createTable;
module.exports.insertInTable = insertInTable;
module.exports.deleteTable = deleteTable;
module.exports.dropDataBase = dropDataBase;

