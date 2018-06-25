import {actions} from '../reducers/search'

export const addSearch = text => ({
  type: 'ADD_SEARCH',
  text
});
  
export const changeKeyword = keyword => ({
  type: 'CHANGE_KEYWORD',
  keyword
});

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


/*export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
  
export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});
  
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
  */