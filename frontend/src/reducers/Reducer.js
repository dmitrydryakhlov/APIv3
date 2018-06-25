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