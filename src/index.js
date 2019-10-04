import React, {Component, lazy} from 'react';
import Home from './page/Home';
import SingerDetail from './page/SingerDetail';
import NavBar from './components/NavBar';

const RootRooter = {
  Home: {
    screen: Home,
    navigationOptions: {
      // header: null,
      headerTitle: 'home',
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

const RootConfig = {
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
