import React, {PureComponent} from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Carousel, Button} from 'teaset';
import {NavBar} from '../../components';
import NavigationServer from '../../utils/NavigationServer';
import * as actionTypes from './store/actionCreators';
import {connect} from 'react-redux';
import {screenWidth} from '../../utils/Constance';
import Image from '../../components/ImageWithPlaceholder';
import {SpringScrollView, NormalHeader} from 'react-native-spring-scrollview';
import Video from 'react-native-video';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    NavigationServer.setNavigationRef(props.navigation);
  }
  state = {
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    paused: true,
  };
  componentDidMount() {
    if (this.props.bannerList.size === 0) {
      this.props.getBannerDataDispatch();
    }
    console.log(this.props);
    if (this.props.recommendList.size === 0) {
      this.props.getRecommendListDispatch();
    }
  }

  _renderBanner(bannerList) {
    return (
      <Carousel
        style={{height: 156}}
        control={
          <Carousel.Control
            style={{backgroundColor: 'rgba(229,229,229,0)', paddingTop: 10}}
          />
        }
        interval={6000}>
        {bannerList.map(banner => (
          <TouchableWithoutFeedback
            key={banner.bannerId}
            onPress={() => console.log(banner)}>
            <Image
              placeholderStyle={{backgroundColor: 'rgb(229,229,229)'}}
              PlaceholderContent={
                <ActivityIndicator
                  color={'#00a700'}
                  size={30}
                  animating={true}
                />
              }
              style={{width: screenWidth, height: 156}}
              resizeMode="stretch"
              source={{uri: banner.pic + `?param=${screenWidth}x${156}`}}
            />
          </TouchableWithoutFeedback>
        ))}
      </Carousel>
    );
  }

  _renderRecommend = recommendList => {
    const width = screenWidth / 3 - 10;
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {recommendList.map(recomment => {
          return (
            <View key={recomment.id} style={{height: 200, width, margin: 5}}>
              <Image
                source={{uri: recomment.picUrl + `?param=${width}x${width}`}}
                style={{height: width, width}}
              />
              <Text>{recomment.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const {bannerList, recommendList} = this.props;

    return (
      <>
        <NavBar title={'Home'} isTopNavigator={true} />
        <SpringScrollView>
          {this._renderBanner(bannerList.toJS())}
          {/*<Video*/}
          {/*  source={{*/}
          {/*    uri:*/}
          {/*      'http://m7.music.126.net/20191020232006/603ee08c7246e2ed40722c2e0ad6f326/ymusic/b1c4/b5de/74d0/9158ae4873e10b743790320db9ef9b29.mp3',*/}
          {/*  }}*/}
          {/*/>*/}
          {this._renderRecommend(recommendList.toJS())}
          <Button
            title={'第二页面'}
            onPress={() => {
              NavigationServer.navigate('SingerDetail');
            }}
          />
        </SpringScrollView>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    bannerList: state.home.get('bannerList'),
    recommendList: state.home.get('recommendList'),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
