import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import auth from './auth';
import offers from './offers';

const rootReducer = combineReducers({
  auth,
  user,
  users,
  offers,
});

export default rootReducer;
