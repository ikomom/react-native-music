import React from 'react';
import {View, Text, Platform} from 'react-native';
import Home from './page/Home';
import Settings from './page/Setting';
import SingerDetail from './page/SingerDetail';
import NavBar from './components/NavBar';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';
import StackViewTransitionConfigs from 'react-navigation-stack/lib/module/views/StackView/StackViewTransitionConfigs';
import VideoScreen from './page/video';

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

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Settings: {
      screen: Settings,
    },
    VideoScreen: VideoScreen,
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
};

const AppNavigator = createStackNavigator(RootRooter, {
  mode: 'card',
  gesturesEnabled: true,
  transitionConfig: IOS
    ? dynamicModalTransition
    : () => {
        return {
          screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        };
      },
});

export default AppNavigator;
