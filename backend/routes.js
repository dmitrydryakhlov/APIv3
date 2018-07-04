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
  console.log(req.body);
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM news ';
    if(req.body.selectedResource!=''||req.body.selectedCountry!=''){
      sql+='WHERE ';
      console.log('WHERE');
      if(req.body.selectedResource!=='' && req.body.selectedCountry!==''){
        sql += 'sourceId = "' + req.body.selectedResource +'"';
        sql+='AND ';
        sql += 'countryId = "' + req.body.selectedCountry +'"';
      }else 
      if(req.body.selectedResource!==''){
        sql += 'sourceId = "' + req.body.selectedResource +'"';
      }else 
      if(req.body.selectedCountry!==''){
        sql += 'countryId = "' + req.body.selectedCountry +'"';
      }
    }
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
};
      


module.exports = out;