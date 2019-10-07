import React, {Component, lazy} from 'react';
import {View, Text, Platform} from 'react-native';
import {Button} from 'teaset';
import Home from './page/Home';
import SingerDetail from './page/SingerDetail';
import NavBar from './components/NavBar';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import StackViewTransitionConfigs from 'react-navigation-stack/lib/module/views/StackView/StackViewTransitionConfigs';

const IOS = Platform.OS === 'ios';

const USE_MODEL_TRANSITION_NAME = [];
const dynamicModalTransition = (transitionProps, prevTransitionProps) => {
  const isModal = USE_MODEL_TRANSITION_NAME.some(
    screenName =>
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName),
  );
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    isModal,
  );
};

function createTestPage(name, target, resetTarget, dismiss) {
  const reset = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({routeName: 'Home'}),
      NavigationActions.navigate({routeName: 'SingerDetail'}),
      NavigationActions.navigate({routeName: 'T1'}),
    ],
  });
  return {
    screen: function(props) {
      return (
        <View>
          <Text>{name}</Text>
          {target ? (
            <Button
              onPress={() => props.navigation.navigate(target)}
              title={'移动到' + target}
            />
          ) : null}
          {resetTarget ? (
            <Button
              onPress={() => props.navigation.dispatch(reset)}
              title={'重置' + resetTarget}
            />
          ) : null}
          {dismiss ? (
            <Button
              onPress={() => props.navigation.dismiss()}
              title={'dismiss'}
            />
          ) : null}
        </View>
      );
    },
    navigationOptions: {
      // header: null,
      headerTitle: name,
    },
  };
}

const AppNavigator = createStackNavigator(
  {
    H1: createTestPage('H1', 'H2', 'SingerDetail', 'dismiss'),
    H2: createTestPage('H2', 'Home'),
    H3: createTestPage('H3', 'H1'),
  },
  {
    mode: 'model',
    headerMode: 'none',
  },
);
const AppContainer = createAppContainer(AppNavigator);

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    },
  },
  {
    drawerType: 'slide',
  },
);

const RootRooter = {
  Home: {
    screen: MyDrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
  SingerDetail: {
    screen: SingerDetail,
    navigationOptions: {
      header: <NavBar title={'SingerDetail'} />,
      headerTitle: 'SingerDetail',
    },
  },
  T1: {
    screen: AppContainer,
    navigationOptions: {
      header: <NavBar title={'T1'} />,
    },
  },
};

const RootConfig = {
  mode: 'card',
  gesturesEnabled: true,
  transitionConfig: IOS
    ? dynamicModalTransition
    : () => {
        return {
          screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        };
      },
  defaultNavigationOptions: {
    headerTintColor: '#a1ff0a',
    headerStyle: {
      backgroundColor: '#000',
    },
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  },
};

export default {
  RootRooter,
  RootConfig,
};
