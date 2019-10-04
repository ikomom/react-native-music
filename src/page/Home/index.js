import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {Button} from 'teaset';
import {NavBar} from '../../components';
import NavigationServer from '../../utils/NavigationServer';

class Home extends PureComponent {
  static navigationOptions = ({navigation, navigationOptions}) => {
    console.log('navigation', navigationOptions, navigation);
    return {
      header: <NavBar isTopNavigator={true} title={'xxx'} />,
    };
  };

  constructor(props) {
    super(props);
    NavigationServer.setNavigationRef(props.navigation);
  }


  render() {
    return (
      <>
        <Button
          title={'第二页面'}
          onPress={() => {
            this.props.navigation.navigate('SingerDetail');
          }}
        />
        <Text>Hello Home</Text>
      </>
    );
  }
}

export default Home;
