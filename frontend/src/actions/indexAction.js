import {actions} from '../reducers/Reducer'

export const searchNews = (query) => {
  return async (dispatch) => {
    //console.log(query);
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

export const getCountry = (query) => {
  return async (dispatch) => {
    try {
        const country = await fetch('/country', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: '',
          responseType: 'json',
        })
        .then((res) => res.json());
        //console.log(country);
        return country;
    } catch (err) {
      dispatch(actions.country.error(err));
    }
  };
};

export const getResource = (query) => {
  return async (dispatch) => {
    try {
        const resource = await fetch('/resource', { 
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: '',
          responseType: 'json',
        })
        .then((res) => res.json());
        //console.log(resource);
        return resource;
    } catch (err) {
      dispatch(actions.resource.error(err));
    }
  };
};