/**
 *
 * @author ikonon
 * @create 2019/10/4
 */
import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

let NavigationEvents = null;
if (__DEV__) {
  NavigationEvents = require('react-navigation').NavigationEvents;
}

export default class BaseContainer extends React.Component {
  render() {
    return (
      <>
        {__DEV__ ? (
          <NavigationEvents
            onWillFocus={this.props.onWillFocus}
            onDidFocus={this.props.onDidFocus}
            onWillBlur={this.props.onWillBlur}
            onDidBlur={this.props.onDidBlur}
          />
        ) : null}
      </>
    );
  }
}
