import { Tracker } from 'meteor/tracker';
import { applyMiddleware, createStore, compose } from 'redux';
import createReactiveMiddlewares from 'meteor-redux-middlewares';
import thunk from 'redux-thunk';
import rootReducer from '/imports/reducers';

const {
  sources,
  subscriptions,
} = createReactiveMiddlewares(Tracker);

const store = createStore(rootReducer, compose(
  applyMiddleware(sources, subscriptions, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

export default store;
