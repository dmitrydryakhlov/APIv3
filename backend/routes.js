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

module.exports = out;