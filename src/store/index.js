/**
 *
 * @author ikonon
 * @create 2019/10/3
 */
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import RootReducer from './reducer';
// import {combineReducers} from 'redux-immutable';

// 增加react-navigation的redux适配
const AppRootName = 'root';
const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  AppRootName,
);

const middlewares = [navigationMiddleware, thunk];

if (!__DEV__) {
  // 增加打印中间件
  const createLogger = require('redux-logger').createLogger;
  const loggerOp = createLogger({// todo  (getState: Function, action: Object) => Boolean
    // predicate: (getState, action) =>
    //   !(action.type && action.type.startsWith('Navigation')),
  });
  middlewares.push(loggerOp);
}

const getStore = navReducer => {
  const composeEnhancers =
    // 适配redux_devtools情况
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  Object.assign(RootReducer, {nav: navReducer});
  const reducer = combineReducers(RootReducer);

  return createStore(reducer, enhancer);
};

export default getStore;
