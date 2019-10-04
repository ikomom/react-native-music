import React from 'react';
import {
  createNavigationReducer,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
// import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import root from './src';
import {connect, Provider} from 'react-redux';
import getStore from './src/store';

// 将navigation的动作绑定到redux中
const ReduxRootName = 'root';
const AppNavigator = createStackNavigator(root.RootRooter, root.RootConfig);
const AppContainer = createReduxContainer(AppNavigator);
// 将state注入到react组件
const mapStateToProps = state => ({state: state.nav});
const AppWithNavigationState = connect(mapStateToProps)(
  AppContainer,
  ReduxRootName,
);
// 合并reducer
const navReducer = createNavigationReducer(AppNavigator);
const store = getStore(navReducer);

function App(props) {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
  );
}


// export default createAppContainer(AppNavigator);
export default App;
