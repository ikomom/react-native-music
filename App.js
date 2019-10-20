import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import AppNavigator from './src';
import {connect, Provider} from 'react-redux';
import getStore from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import PersistUtils from './src/utils/PersistUtils';
import {screenHeight, screenWidth} from './src/utils/Constance';

// 将navigation的动作绑定到redux中
const AppContainer = createReduxContainer(AppNavigator);
// 将state注入到react组件
const mapStateToProps = state => {
  return {state: state.nav.toJS()};
};
const AppWithNavigationState = connect(mapStateToProps)(AppContainer);
// 合并reducer
const {store, persistor} = getStore(AppNavigator);
PersistUtils.setPersist(persistor);

const isHermes = () =>
  __DEV__ &&
  global.HermesInternal !== null &&
  global.HermesInternal !== undefined;

function App(props) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View
            style={{
              height: screenHeight,
              width: screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator animating={true} size={100} />
          </View>
        }
        persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
