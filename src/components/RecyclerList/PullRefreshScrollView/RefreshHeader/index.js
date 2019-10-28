/**
 *
 * @author ikonon
 * @create 2019/10/27
 */
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class RefreshHeader extends React.Component<
  HeaderPropType,
  HeaderStateType,
> {
  static height = 80;

  static style = 'topping';

  constructor(props: HeaderPropType) {
    super(props);
    this.state = {status: 'waiting'};
  }

  changeToState(newStatus: HeaderStatus) {
    this.state.status !== newStatus &&
      this.onStateChange(this.state.status, newStatus);
  }

  onStateChange(oldStatus: HeaderStatus, newStatus: HeaderStatus) {
    // console.log("newStatus", newStatus);
    this.setState({status: newStatus});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>{this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'},
  textStyle: {fontSize: 18},
});

export const status = {
  waiting: 'waiting',
  pulling: 'pulling',
  pullingEnough: 'pullingEnough',
  pullingCancel: 'pullingCancel',
  refreshing: 'refreshing',
  rebound: 'rebound',
};
export type HeaderStatus =
  | 'waiting'
  | 'pulling'
  | 'pullingEnough'
  | 'pullingCancel'
  | 'refreshing'
  | 'rebound';

export type HeaderStyleType = 'topping' | 'stickyScrollView' | 'stickyContent';

interface HeaderPropType {
  offset?: Animated.Value;
  maxHeight?: number;
  bottomOffset?: number;
}

interface HeaderStateType {
  status?: HeaderStatus;
}
