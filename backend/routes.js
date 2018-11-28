const Promise = require('promise');
const makeRequest = require('./APIServices/MakeRequest');
const out = {};

out.search = (req, res) => {
  let url = '';
  if (req.body.type == 'keyword') {
    url = makeRequest.getUrlByKeyword(req.body.keyword);
  }
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestNews(url)
      .then(data => res.send(data))
      .catch(err => {
        reject(err);
      });
  });
};

out.country = (req, res) => {
  let url = '';
  if (req.body.type == 'country') {
    url = makeRequest.getUrlByCountry(req.body.selectedCountry);
  }
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestNews(url)
      .then(data => res.send(data))
      .catch(err => {
        reject(err);
      });
  });
};

out.resource = (req, res) => {
  let url = '';
  if (req.body.type == 'resource') {
    url = makeRequest.getUrlByResource(req.body.selectedResource);
  }
  return new Promise((resolve, reject) => {
    makeRequest.makeRequestNews(url)
      .then(data => res.send(data))
      .catch(err => {
        reject(err);
      });
  });
};


module.exports = out;