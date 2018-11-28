import { actions } from '../reducers/Reducer'

export const searchNews = (url, query) => {
  console.log(url, query)
  return async (dispatch) => {
    dispatch(actions.search.loading());
    try {
      const news = await fetch(`/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: query,
        responseType: 'json',
      }).then((res) => res.json());
      console.log(news);
      dispatch(actions.search.success(news));
    } catch (err) {
      dispatch(actions.search.error(err));
    }
  };
};
