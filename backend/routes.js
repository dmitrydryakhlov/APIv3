const Promise = require ('promise');

const request = require('request-promise');

const out = {};

out.search = function (req, res) {
  console.log ('get news');
  // GET news using req.body.keyword
  let promise = new Promise(function(resolve,reject){
    makeRequest('keyword', 'Apple',function(err,res){
      if(err) reject(err);
      else resolve(res);
    });
  });
    
  console.log(promise);
  //console.log(res);
  
  /*const news = [{
    'source': {
      'id': null,
      'name': 'Github.com'
    },
    'author': 'cl-bitcoin',
    'title': 'cl-bitcoin: cl-bitcoin',
    'description': 'cl-bitcoin - Peer to peer money',
    'url': 'https://github.com/cl-bitcoin/cl-bitcoin',
    'urlToImage': 'https://avatars0.githubusercontent.com/u/39051405?s=400&v=4',
    'publishedAt': '2018-05-07T10:08:22Z'
  },
  {
    'source': {
      'id': null,
      'name': 'Bleepingcomputer.com'
    },
    'author': 'Bleepingcomputer',
    'title': 'Bitcoin SuPpOrt 18005716109 Bitcoin',
    'description': 'Bitcoin SuPpOrt 18005716109 Bitcoin - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nB…',
    'url': 'https://www.bleepingcomputer.com/forums/t/673721/bitcoin-support-18005716109-bitcoin/',
    'urlToImage': 'https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png',
    'publishedAt': '2018-03-21T15:46:13Z'
  }];
  */
  res.send(promise);
};

module.exports = out;

function makeRequest(type, keyword, country, source) {
  let url;
  // alert('makeRequest - done!')

  if (type === 'country') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
      'country='}${country}&` +
      'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('1');
  }
  if (type === 'resource') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
      'sources='}${source}&` +
      'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('2');
  }
  if (type === 'keyword') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
      'q='}${keyword}&` +
      'from=2018-06-25&' +
      'sortBy=popularity&' +
      'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('3');
  }
  const req = {
    method: 'GET',
    uri:url,
    //json: true
  };
  //let responseToSent;
  request(req).then(function (response){
    console.log (JSON.parse(response).articles);
    if(JSON.parse(response).articles!==undefined){
      console.log('return response.articles');
      return (JSON.parse(response).articles);
    }else {
      console.log('return [not found]');
      return response;//['not found'];
    }
  });
  //return responseToSent.articles;
  //dataWrapedByPromise =>
  //dataWrapedByPromise.json())
  //.then(data => {
  //  console.log(data);
  //  return data;
  //});
}

/*request(req).then(
  dataWrapedByPromise =>
  dataWrapedByPromise.json())
  .then(data => {
    console.log(data);
    return data;
  });*/