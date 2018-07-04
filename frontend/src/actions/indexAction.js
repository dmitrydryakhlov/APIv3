import {actions} from '../reducers/Reducer'

export const searchNews = (query) => {
  return async (dispatch) => {
    dispatch(actions.search.loading());
    try {
        const news = await fetch('/search', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: query,
          responseType: 'json',
        })
        .then((res) => res.json());
        dispatch(actions.search.success(news));
    } catch (err) {
      dispatch(actions.search.error(err));
    }
  };
};

export const getNewsByFilter = (query) => {
  return async (dispatch) => {
    dispatch(actions.search.loading());
    try {
        const news = await fetch('/getNewsByFilter', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: query,
          responseType: 'json',
        })
        .then((res) => res.json());
        dispatch(actions.search.success(news));
        return news;
    } catch (err) {
      dispatch(actions.search.error(err));
    }
  };
};

export const getCountry = () => {
  return async () => {
    try {
        const country = await fetch('/country', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: '',
          responseType: 'json',
        })
        .then((res) => res.json());
        return country;
    } catch (err) {
      console.log(err);
    }
  };
};

export const getResource = () => {
  return async () => {
    try {
        const resource = await fetch('/resource', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: '',
          responseType: 'json',
        })
        .then((res) => res.json());
        return resource;
    } catch (err) {
      console.log(err);
    }
  };
};

