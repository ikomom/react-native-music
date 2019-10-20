/**
 *
 * @author ikonon
 * @create 2019/10/19
 */
import * as actionTypes from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  loading: true,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_BANNERS_LIST:
      return state.set('bannerList', action.data);
    case actionTypes.UPDATE_RECOMMENDED_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
};
