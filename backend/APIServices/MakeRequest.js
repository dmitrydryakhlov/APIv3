const Promise = require('promise');
const request = require('request-promise');

const APIUrlHeadlines = 'https://newsapi.org/v2/top-headlines?';
const APIUrlSources = 'https://newsapi.org/v2/sources?';
const APIKey = 'apiKey=d2567fbf4c124a28bd3df0189776bd87';
const APIKey2 = 'apiKey=a3b2e88ff6d44baeb40126b05d48348e';

function getUrlByCountry(country) {
  return `${APIUrlHeadlines}country=${country}&${APIKey}`;
}

function getUrlByKeyword(keyword) {
  return `${APIUrlHeadlines}q=${keyword}&from=2018-11-11&sortBy=popularity&${APIKey}`;
}

function getUrlByResource(resource) {
  return `${APIUrlHeadlines}sources=${resource}&${APIKey}`;
}

const makeRequestNews = (url) => {
  return new Promise((resolve, reject) => {
    const req = {
      method: 'GET',
      uri: url,
    };

    request(req).then(function (response) {
      if (JSON.parse(response).articles !== undefined) {
        resolve(JSON.parse(response).articles);
      } else {
        reject(response);
      }
    });
  });
};

module.exports.makeRequestNews = makeRequestNews;
module.exports.getUrlByKeyword = getUrlByKeyword;
module.exports.getUrlByCountry = getUrlByCountry;
module.exports.getUrlByResource = getUrlByResource;