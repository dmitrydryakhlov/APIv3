const Promise = require ('promise');
const makeRequest = require('./APIServices/MakeRequest');
const DB = require('./DataBase/DB');
const out = {};

out.search = (req, res) => {
  console.log(req.body);
  let url = ''; 
  switch (req.body.type){
  case 'keyword': {
    url = makeRequest.getUrlByKeyword(req.body.keyword);
    break;
  }
  case 'country': {
    url = makeRequest.getUrlByCountry(req.body.keyword);
    break;
  }
  case 'resource': {
    url = makeRequest.getUrlByResource(req.body.keyword);
    break;
  }
  }
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestNews(url)
      .then(data => { 
        res.send(data); })
      .catch(err => {
        reject(err);
      });
  });
};

out.country = (req, res) => {
  return new Promise((resolve, reject) => {
    DB.select('SELECT countryName FROM country')
      .then(data => { 
        let countries = [];
        for(let item in data){
          countries.push(data[item].countryName);
        }
        res.send(countries);
      })
      .catch(err => {
        reject(err);
      });
  });
};

out.resource = (req, res) => {
  return new Promise((resolve, reject) => {
    DB.select('SELECT sourceName FROM resources')
      .then(data => { 
        let resources = [];
        for(let item in data){
          resources.push(data[item].sourceName);
        }
        res.send(resources);
      })
      .catch(err => {
        reject(err);
      });
  });
};

out.getNewsByFilter = (req, res) => {
  console.log(req.body);
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM news ';
    if(req.body.selectedResource!=''||req.body.selectedCountry!=''){
      sql+='WHERE ';
      console.log('WHERE');
      if(req.body.selectedResource!=='' && req.body.selectedCountry!==''){
        DB.select('SELECT sourceNameId FROM resources WHERE sourceName = "'+req.body.selectedResource+'"')
          .then(data => {
            console.log('&&');
            for(let item in data){
              sql += 'sourceId = "' + data[item].sourceNameId +'"';
            }
          }).then(()=>{
            DB.select('SELECT sourceNameId FROM resources WHERE sourceName = "'+req.body.selectedResource+'"');
          })
          .then(data => {
            sql+='AND ';
            for(let item in data){
              console.log(data[item].sourceNameId);
              sql += 'sourceId = "' + data[item].sourceNameId +'"';
            }
          });
      } else 
      if(req.body.selectedResource!==''){
        console.log('SELECTED RESOURCE');
        DB.select('SELECT sourceNameId FROM resources WHERE sourceName = "'+req.body.selectedResource+'"')
          .then(data => {
            console.log(data);
            for(let item in data){
              sql += 'sourceId = "' + data[item].sourceNameId +'"';
            }
            console.log('after for', sql);
          });
      }else
      if(req.body.selectedCountry!==''){
        console.log('SELECTED COUNTRY');
        DB.select('SELECT countryShortName FROM country WHERE countryName = "'+req.body.selectedCountry+'"')
          .then(data => {
            for(let item in data){
              sql += 'countryId = "' + data[item].countryId +'"';
            }
          });
      }
    }
    .then((sql)=>{
      console.log(sql);
      DB.select(sql)
        .then(data => {
          let news = [];
          for(let item in data){
            news.push(data[item]);
          }
          res.send(news);
        }).catch(err => {
          reject(err);
        });
    });
});
}

module.exports = out;