const Promise = require ('promise');
const request = require('request-promise');

const APIUrlHeadlines = 'https://newsapi.org/v2/top-headlines?';
const APIUrlSources = 'https://newsapi.org/v2/sources?';
const APIKey = 'apiKey=d2567fbf4c124a28bd3df0189776bd87';

function getUrlByCountry( country ) {
  return `${APIUrlHeadlines}country=${country}&${APIKey}`;
}

function getUrlByResource( source ) {
  return `${APIUrlHeadlines}sources=${source}&${APIKey}`;
}

function getUrlByKeyword( keyword ) {
  return `${APIUrlHeadlines}q=${keyword}&from=2018-06-27&sortBy=popularity&${APIKey}`;
}

function getUrlSourceByCountry( country ) {
  return `${APIUrlSources}language=en&country=${country}&${APIKey}`;
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
      console.log (JSON.parse(response).sources);
      if(JSON.parse(response).sources!==undefined){
        console.log('return response.articles');
        resolve (JSON.parse(response).sources);
      }else {
        console.log('return [not found]');
        reject (response);
      }
    });
  });
};

module.exports.makeRequestNews = makeRequestNews;
module.exports.makeRequestSources = makeRequestSources;
module.exports.getUrlByKeyword = getUrlByKeyword;
module.exports.getUrlByResource = getUrlByResource;
module.exports.getUrlByCountry = getUrlByCountry;
module.exports.getUrlSourceByCountry = getUrlSourceByCountry;