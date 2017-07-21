import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import offers from './offers';

const rootReducer = combineReducers({
  auth,
  user,
  offers,
});

export default rootReducer;
