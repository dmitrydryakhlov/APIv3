import {actions} from '../reducers/Reducer'

/*export const addSearch = text => ({
  type: 'ADD_SEARCH',
  text
});
  
export const changeKeyword = keyword => ({
  type: 'CHANGE_KEYWORD',
  keyword
});*/

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
        console.log(news);
    } catch (err) {
      dispatch(actions.search.error(err));
    }
  };
};