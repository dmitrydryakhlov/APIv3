const Promise = require ('promise');
const request = require('request-promise');

function getUrlByCountry( country ) {
  let url;
  url = `${'https://newsapi.org/v2/top-headlines?' +
  'country='}${country}&` +
  'apiKey=d2567fbf4c124a28bd3df0189776bd87';
  return url;
}

function getUrlByResource( source ) {
  let url;
  url = `${'https://newsapi.org/v2/top-headlines?' +
    'sources='}${source}&` +
    'apiKey=d2567fbf4c124a28bd3df0189776bd87';
  return url;
}

function getUrlByKeyword( keyword ) {
  let url;
  url = `${'https://newsapi.org/v2/top-headlines?' +
    'q='}${keyword}&` +
    'from=2018-06-25&' +
    'sortBy=popularity&' +
    'apiKey=d2567fbf4c124a28bd3df0189776bd87';
  return url;
}

const makeRequest = (url) => {
  return new Promise ((resolve, reject) =>  {

    console.log('makeRequest');

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

module.exports.makeRequest = makeRequest;
module.exports.getUrlByKeyword = getUrlByKeyword;
module.exports.getUrlByResource = getUrlByResource;
module.exports.getUrlByCountry = getUrlByCountry;
