import {createActions, handleActions} from 'redux-actions';

const initialState = {
  news: [],
  filter:{},
  err: null
};

export const actions = createActions({
  NEWS: {
    SEARCH: {
      LOADING: null,
      SUCCESS: (news) => ({news}),
      ERROR: (err) => ({err}),
    },
    FILTER: {
      COUNTRY: (country) => ({country}),
      RESOURCE: (resource) => ({resource})
    },
  },
}).news;

const reducer = handleActions({

  [actions.search.loading](state) {
    return {...state, news: [], err: null};
  },
  [actions.search.success](state, {payload: {news}}) {
    return {...state, news: news, err: null};
  },
  [actions.search.error](state, {payload: {err}}) {
    return {...state, news: [], err: err};
  },

  [actions.filter.country](state, {payload: {country}}) {
    return {...state, filter: country, err: null};
  },
  [actions.filter.resource](state, {payload: {resource}}) {
    return {...state, filter: resource, err: null};
  },
}, initialState);

export default reducer;