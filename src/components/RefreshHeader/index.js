import {RefreshHeader} from 'react-native-spring-scrollview/RefreshHeader';
import React from 'react';
import {Text} from 'react-native';

export default class MyHeader extends RefreshHeader {
  static height: number = 50;


  render() {
    console.log(this.state.status)
    return <Text>{this.state.status}</Text>;
  }
}

