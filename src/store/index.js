/**
 *
 * @author ikonon
 * @create 2019/10/3
 */
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {persistReducer, persistStore} from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import thunk from 'redux-thunk';
import RootReducer from './reducer';
import {createNavigationReducer} from './navReducer';
import AsyncStorage from '@react-native-community/async-storage';

// 增加react-navigation的redux适配
const AppRootName = 'root';
const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  AppRootName,
);

const middlewares = [navigationMiddleware, thunk];

// if (__DEV__) {
//   // 增加打印中间件
//   const createLogger = require('redux-logger').createLogger;
//   const loggerOp = createLogger({
//     predicate: (getState, action) => {
//       // 过滤路由完成跳转属性
//       return !(
//         action.type && action.type.startsWith('Navigation/COMPLETE_TRANSITION')
//       );
//     },
//   });
//   middlewares.push(loggerOp);
// }

const persistConfig = {
  key: 'rootPersist',
  blacklist: ['nav'],
  transforms: [immutableTransform()],
  storage: AsyncStorage,
};

const getStore = AppNavigator => {
  const composeEnhancers =
    // 适配redux_devtools情况
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  Object.assign(RootReducer, {nav: createNavigationReducer(AppNavigator)});
  // 使用redux-persist-transform-immutable转换时不使用redux
  const reducer = combineReducers(RootReducer);
  // 持久化
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);

  return {store, persistor};
};

export default getStore;
