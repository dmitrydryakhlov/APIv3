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
  'countryId',
  'sourceId',
  'author',
  'title',
  'description',
  'url',
  'urlToImage',
  'date'
];
const newsColumnTypes = [
  'INT(5) AUTO_INCREMENT PRIMARY KEY', // newsId
  'VARCHAR(100)',   //countryId
  'VARCHAR(200)',   // sourceId
  'VARCHAR(200)',   // author
  'VARCHAR(300)',   // title
  'VARCHAR(400)',   // description
  'VARCHAR(350)',   // url
  'VARCHAR(500)',   // urlToImage,
  'VARCHAR(150)'    // data
];
//////////////////////////////////////////////////////////////


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


for (let item of countryInsertData){
  DB.select('SELECT countryShortName FROM country WHERE countryShortName ="' + item[1]+'"' ).then((flag)=>{ 
    if(flag.length==0){
      DB.insertInTable('country (countryName, countryShortName)', '"'+item.join('","')+'"');
    }
  });
}

new Promise(()=>{
  DB.select('SELECT countryShortName FROM country').then((data)=>{
    for(let item in data){
      new Promise ((resolve) => {
        let url = MakeRequest.getUrlSourceByCountry(data[item].countryShortName);
        let result = MakeRequest.makeRequestSources(url);
        resolve(result);
      }).then((data)=>{
        for (let item of data){
          DB.select('SELECT sourceNameId FROM resources WHERE sourceNameId ="' + item.id+'"' ).then((flag)=>{        
            if(flag.length==0){
              let insertStr = [];
              for (let index in item){
                insertStr.push(`"${item[index].replace(/\'|\"/g)}"`);
              }
              DB.insertInTable('resources (sourceNameId,sourceName,sourceDescription,sourceUrl,sourceCategory,sourceLanguage,sourceCountry)', insertStr.join(','));
            }
          });
        }
      });
    }
  }).then(()=>{
    DB.select('SELECT sourceNameId, sourceCountry FROM resources').then((data)=>{
      let counter = 0;
      for(let item in data){
        let countryId = data[item].sourceCountry;
        if (counter == 10){
          break;
        }
        new Promise ((resolve) => {
          let url = MakeRequest.getUrlNewsByResource(data[item].sourceNameId);
          let result = MakeRequest.makeRequestNews(url);
          resolve(result);
        }).then((data)=>{
          for (let item of data){
            DB.select('SELECT * FROM news WHERE title = "' + item.title.replace(/\'|\"/g)+'"' ).then((flag)=>{  
              if(flag.length===0){
                let insertStr = [];
                insertStr.push('"'+countryId+'"');
                for (let index in item){
                  if(item[index]===null){
                    insertStr.push("''");
                  }else{
                    if(index==='source'){
                      insertStr.push(`"${item[index].id.replace(/\'|\"/g)}"`);
                    }else{
                      insertStr.push(`"${item[index].replace(/\'|\"/g)}"`);
                    }
                  }
                }
                DB.insertInTable('news (countryId,sourceId,author,title,description,url,urlToImage,date)', insertStr.join(','));
              }
            });
          }
        });
        counter++;
      }
      
    });
  });
});