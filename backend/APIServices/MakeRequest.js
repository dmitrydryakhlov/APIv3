const Promise = require ('promise');
const request = require('request-promise');

const APIUrlHeadlines = 'https://newsapi.org/v2/top-headlines?';
const APIUrlSources = 'https://newsapi.org/v2/sources?';
const APIKey = 'apiKey=d2567fbf4c124a28bd3df0189776bd87';
const APIKey2 = 'apiKey=a3b2e88ff6d44baeb40126b05d48348e';

function getUrlByCountry( country ) {
  return `${APIUrlHeadlines}country=${country}&${APIKey2}`;
}

function getUrlByKeyword( keyword ) {
  return `${APIUrlHeadlines}q=${keyword}&from=2018-06-28&sortBy=popularity&${APIKey2}`;
}

function getUrlSourceByCountry( country ) {
  return `${APIUrlSources}&country=${country}&${APIKey2}`;
}

function getUrlNewsByResource( resource ) {
  return `${APIUrlHeadlines}&sources=${resource}&${APIKey2}`;
}

const makeRequestNews = (url) => {
  return new Promise ((resolve, reject) =>  {
    const req = {
      method: 'GET',
      uri:url,
    };

    request(req).then(function (response){
      console.log (JSON.parse(response).articles);
      if(JSON.parse(response).articles!==undefined){
        console.log('return response.articles');
        resolve (JSON.parse(response).articles);
      }else {
        console.log('return [not found]');
        reject (response);
      }
    });
  });
};

const makeRequestSources = (url) => {
  return new Promise ((resolve, reject) =>  {
    const req = {
      method: 'GET',
      uri:url,
    };

    request(req).then(function (response){
      if(JSON.parse(response).sources!==undefined){
        resolve (JSON.parse(response).sources);
      }else {
        reject (response);
      }
    });
  });
};

module.exports.makeRequestNews = makeRequestNews;
module.exports.makeRequestSources = makeRequestSources;
module.exports.getUrlByKeyword = getUrlByKeyword;
//module.exports.getUrlByResource = getUrlByResource;
module.exports.getUrlByCountry = getUrlByCountry;
module.exports.getUrlSourceByCountry = getUrlSourceByCountry;
module.exports.getUrlNewsByResource = getUrlNewsByResource;