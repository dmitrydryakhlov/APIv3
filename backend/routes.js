const Promise = require ('promise');
const makeRequest = require('./APIServices/MakeRequest');
const DB = require('./DataBase/DB');
const out = {};

out.search = (req, res) => {
  let url = ''; 
  if (req.body.type =='keyword') {
    url = makeRequest.getUrlByKeyword(req.body.keyword);
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
    DB.select('SELECT countryName, countryShortName FROM country')
      .then(data => { 
        let countries = [];
        for(let item in data){
          countries.push({countryName: data[item].countryName, countryNameId:data[item].countryShortName});
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
    DB.select('SELECT sourceName, sourceNameId FROM resources')
      .then(data => { 
        let resources = [];
        for(let item in data){
          resources.push({sourceName: data[item].sourceName, sourceNameId:data[item].sourceNameId});
        }
        res.send(resources);
      })
      .catch(err => {
        reject(err);
      });
  });
};

out.getNewsByFilter = (req, res) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM news ';
    if(req.body.selectedResource!=null||req.body.selectedCountry!=null){
      sql+='WHERE ';
      if(req.body.selectedResource!=null && req.body.selectedCountry!=null){
        sql += 'sourceId = "' + req.body.selectedResource +'"';
        sql+='AND ';
        sql += 'countryId = "' + req.body.selectedCountry +'"';
      }else 
      if(req.body.selectedResource!=null){
        sql += 'sourceId = "' + req.body.selectedResource +'"';
      }else 
      if(req.body.selectedCountry!=null){
        sql += 'countryId = "' + req.body.selectedCountry +'"';
      }
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
    }else{
      res.send([]);
    }
  });
};
      
module.exports = out;