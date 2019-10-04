/**
 *
 * @author ikonon
 * @create 2019/10/4
 */
import React, {memo} from 'react';
import {NavigationBar} from 'teaset';
import NavigationServer from '../../utils/NavigationServer';

export type Props = {
  title?: string,
  leftView?: any,
  backButtonPress?: any,
  isTopNavigator?: ?boolean,
  isNotBackground?: boolean,
  background?: any,
  ...NavigationBar,
};

const NavBar = (props: Props) => {

  return (
    <NavigationBar
      title={props.title}
      style={{position: null}}
      leftView={props.isTopNavigator ? null : <NavigationBar.BackButton title="Back" onPress={NavigationServer.goBack}/>}
    />
  )
};
export default NavBar;
