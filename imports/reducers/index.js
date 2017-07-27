import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import auth from './auth';
import offers from './offers';
import whitelisted from './whitelisted';

const rootReducer = combineReducers({
  auth,
  user,
  users,
  offers,
  whitelisted,
});

export default rootReducer;
