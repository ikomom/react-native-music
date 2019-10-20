/**
 *
 * @author ikonon
 * @create 2019/10/19
 */

import {UPDATE_BANNERS_LIST, UPDATE_RECOMMENDED_LIST} from './constants';
import {fromJS} from 'immutable';
import {getBannerRequest} from './../../../api/request';
import {getRecommendListRequest} from '../../../api/request';

const updateBannerList = data => ({
  type: UPDATE_BANNERS_LIST,
  data: fromJS(data),
});

const updateRecommendList = data => ({
  type: UPDATE_RECOMMENDED_LIST,
  data: fromJS(data),
});

export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
      .then(data => {
        dispatch(updateBannerList(data.banners));
      })
      .catch(err => {
        console.log('获取轮播图失败', err);
      });
  };
};
export const getRecommendList = () => {
  return dispatch => {
    getRecommendListRequest()
      .then(data => {
        dispatch(updateRecommendList(data.result));
      })
      .catch(err => {
        console.log('获取推荐失败', err);
      });
  };
};
