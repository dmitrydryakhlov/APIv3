import { combineReducers } from 'redux';
import search from './search';
import application from '../reducers/search';

export default combineReducers({
  application,
  search
});