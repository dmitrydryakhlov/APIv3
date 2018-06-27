const Promise = require ('promise');
const makeRequest = require('./APIServices/MakeRequest');

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
  console.log(url);
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestNews(url)
      .then(data => { 
        console.log(data);
        res.send(data); })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = out;