import React from 'react';
import {Text, View} from 'react-native';
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

const isHermes = () =>
  global.HermesInternal !== null && global.HermesInternal !== undefined;

function App(props) {
  return (
    <Provider store={store}>
      <AppWithNavigationState
        onNavigationStateChange={(prevState, newState, action) => {
          console.log('onNavigationStateChange', prevState, newState, action);
        }}
      />
      {isHermes ? (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{backgroundColor: '#0ebb58'}}>
          <Text style={{color: '#fff'}}>engine Hermes</Text>
        </View>
      ) : null}
    </Provider>
  );
}

// export default createAppContainer(AppNavigator);
export default App;
