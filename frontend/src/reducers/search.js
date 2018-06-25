/*function makeRequest(type, keyword, country, source) {
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
    if (tmp !== undefined) {
      return tmp;
    } else {
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
*/
import {createActions, handleActions} from 'redux-actions';


const initialState = {
  news: [],
  err: null
};

export const actions = createActions({
  NEWS: {
    SEARCH: {
      LOADING: null,
      SUCCESS: (news) => ({news}),
      ERROR: (err) => ({err}),
    },
  },
}).news;

const reducer = handleActions({
  [actions.search.loading](state) {
    return {...state, news: [], err: null};
  },
  [actions.search.success](state, {payload: {news}}) {
    return Object.assign({}, state, {news, err: null});
  },
  [actions.search.error](state, {payload: {err}}) {
    return {...state, news: [], err: err};
  },
}, initialState);


export default reducer;