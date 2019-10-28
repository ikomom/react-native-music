import React, {Component} from 'react';
import {View, Text, Dimensions, RefreshControl, Animated, Image, ScrollView} from 'react-native';
// import { DataProvider, LayoutProvider, BaseScrollView} from 'recyclerlistview';
import { RecyclerListView, DataProvider, LayoutProvider, BaseScrollView} from 'react-native-refresh-loadmore-recyclerlistview';
import {ImageItem} from '../RecommentList';
import {screenHeight, screenWidth} from '../../utils/Constance';
import {Button} from 'teaset';
import PropTypes from 'prop-types';
import {SpringScrollView, NormalHeader} from 'react-native-spring-scrollview';
import PullRefreshScrollView from './PullRefreshScrollView';

const ViewTypes = {
  HEAD: 0,
  ITEM: 1,
  NULL: -1,
};
export default class RecycleList extends React.Component {
  constructor(args) {
    super(args);

    let dataProvider = new DataProvider((r1, r2) => {
      return r1.id !== r2.id;
    });

    this._layoutProvider = new LayoutProvider(
      index => {
        if (index === 0) {
          return ViewTypes.HEAD;
        } else if (this.isItemIndex(index)) {
          return ViewTypes.ITEM;
        } else {
          return ViewTypes.NULL;
        }
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.HEAD:
            dim.width = screenWidth;
            dim.height = 160;
            break;
          case ViewTypes.ITEM:
            // dim.width = screenWidth / 3 - 10 + 0.18;
            dim.width = screenWidth;
            dim.height = Math.floor(screenWidth / 3 - 10) + 62;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
        // console.log('dim', dim)
      },
    );

    this.state = {
      loading: false,
      dataProvider: dataProvider.cloneWithRows(this.props.data),
    };
    console.log('11111', this.state);
  }

  _renderLine = index => {
    const images = [];
    for (let i = 0; i < this.state.dataProvider._size; i++) {
      if (i > index) {
        break;
      }
      if (index - 3 < i && i <= index) {
        const data = this.state.dataProvider._data[i];
        images.push(<ImageItem key={data.id} item={data} />);
      }
    }
    return (
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
        }}>
        {images}
      </View>
    );
  };

  isItemIndex = index => index - 1 && (index - 1) % 3 === 0;

  _rowRenderer = (type, data, index) => {
    switch (type) {
      case ViewTypes.HEAD:
        return this.props.ListHeaderComponent;
      case ViewTypes.ITEM:
        if (this.isItemIndex(index)) {
          return this._renderLine(index - 1);
        }
        return null;
      default:
        return null;
    }
  };

  render() {
    return (
      <RecyclerListView
        refreshing={true}
        // externalScrollView={PullRefreshScrollView}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        renderAheadOffset={screenHeight}
        optimizeForInsertDeleteAnimations={true}
        removeClippedSubviews={true}
        decelerationRate={0.936}
        onRefresh={()=>{}}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={this.state.loading}
        //     refreshing={this.state.loading}
        //     onRefresh={async () => {
        //       this.setState({loading: true}, () => {
        //         setTimeout(() => {
        //           this.setState({loading: false});
        //         }, 200);
        //       });
        //     }}
        //   />
        // }
      />
    );
  }
}
RecycleList.propTypes = {
  ListHeaderComponent: PropTypes.element,
};

const styles = {
  container: {
    flex: 1,
  },
};
