import {createActions, handleActions} from 'redux-actions';

const initialState = {
  news: [],
  country:[],
  resource:[],
  err: null
};

export const actions = createActions({
  NEWS: {
    SEARCH: {
      LOADING: null,
      SUCCESS: (news) => ({news}),
      ERROR: (err) => ({err}),
    },
    COUNTRY: {
      LOADING: null,
      SUCCESS: (country) => ({country}),
      ERROR: (err) => ({err}),
    },
    RESOURCE: {
      LOADING: null,
      SUCCESS: (resource) => ({resource}),
      ERROR: (err) => ({err}),
    },
  },
}).news;

const reducer = handleActions({
  [actions.country.loading](state) {
    return {...state, country:[], err: null};
  },
  [actions.search.loading](state) {
    return {...state, news: [], err: null};
  },
  [actions.resource.loading](state) {
    return {...state, resource: [], err: null};
  },


  [actions.country.success](state, {payload: {country}}) {
    return Object.assign({}, state, {country: country, err: null});
  },
  [actions.search.success](state, {payload: {news}}) {
    return Object.assign({}, state, {news: news, err: null});
  },
  [actions.resource.success](state, {payload: {resource}}) {
    return Object.assign({}, state, {resource: resource, err: null});
  },


  [actions.search.error](state, {payload: {err}}) {
    return {...state, news: [], err: err};
  },
  [actions.country.error](state, {payload: {err}}) {
    return {...state, news: [], country:[], err: err};
  },
  [actions.resource.error](state, {payload: {err}}) {
    return {...state, news: [], resource:[], err: err};
  },
}, initialState);

export default reducer;