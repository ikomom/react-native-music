/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, {Component} from 'react';
import {View, Text, Dimensions,RefreshControl, Image} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
  BaseItemAnimator,
} from 'recyclerlistview';
import {ImageItem} from '../RecommentList';
import {screenHeight, screenWidth} from '../../utils/Constance';
// import Image from '../ImageWithPlaceholder';
import {Button} from 'teaset';

const ViewTypes = {
  HEAD: 0,
  ITEM: 1,
  NULL: -1,
};

let containerCount = 0;

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
    this._containerId = containerCount++;
  }

  render() {
    return (
      <View {...this.props}>
        <View style={{width: 100}}>{this.props.children}</View>
        <Text>Cell Id: {this._containerId}</Text>
      </View>
    );
  }
}

/***
 * To test out just copy this component and render in you root component
 */
export default class RecycleTestComponent extends React.Component {
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
      if (i > index) break;
      if (index - 3 < i && i <= index) {
        const data = this.state.dataProvider._data[i];
        images.push(<ImageItem key={data.id} item={data} />);
      }
    }
    // console.log('images', images);
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
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
        renderAheadOffset={screenHeight}
        optimizeForInsertDeleteAnimations={true}
        removeClippedSubviews={true}
        decelerationRate={0.936}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={async () => {
              this.setState({ loading: true }, () => {
                setTimeout(() => {
                  this.setState({ loading: false });
                }, 200)
              });

            }}
          />
        }
      />
    );
  }
}

const styles = {
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#00a1f1',
  },
  containerGridLeft: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffbb00',
  },
  containerGridRight: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#7cbb00',
  },
};
