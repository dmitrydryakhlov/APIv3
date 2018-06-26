const Promise = require ('promise');
const makeRequest = require('./APIServices/MakeRequest');

const out = {};

out.search = (req, res) => {
  const url = makeRequest.getUrlByKeyword('Apple');
  console.log(url);
  return new Promise((resolve, reject) => {
    makeRequest.makeRequest(url)
      .then(data => { 
        console.log(data);
        res.send(data); })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = out;