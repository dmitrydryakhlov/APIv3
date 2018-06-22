function makeRequest(type, keyword, country, source) {
  let url;
  // alert('makeRequest - done!')

  if (type === 'country') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
          'country='}${  country  }&` +
          'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('1');
  }
  if (type === 'resource') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
          'sources='}${  source  }&` +
          'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('2');
  }
  if (type === 'keyword') {
    url = `${'https://newsapi.org/v2/top-headlines?' +
          'q='}${  keyword  }&` +
          'from=2018-05-11&' +
          'sortBy=popularity&' +
          'apiKey=d2567fbf4c124a28bd3df0189776bd87';
    console.log('3');
  }
  const req = new Request(url);
  fetch(req).then(dataWrapedByPromise =>
    dataWrapedByPromise.json())
    .then(data => {
      console.log(data);
      return data;
    });
}


const search = (state = [], action) => {
  switch (action.type) {
  case 'ADD_SEARCH':
    const tmp = makeRequest('keyword', state.keyword);
    console.log(tmp);
    if ( tmp !== undefined){
      return tmp;
    }else {
      return state;
    }
    case 'CHANGE_KEYWORD':
    let newState = Object.assign({}, state);
    newState.keyword = action.keyword;
    return newState;
    
  default:
    return state;
  }
};
  
export default search;
  