import {axiosInstance} from './config';
import {Platform} from 'react-native';

export const getBannerRequest = () => {
  const url = '/banner?type=' + (Platform.OS === 'android' ? '1' : '2');
  return axiosInstance.get(url);
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};
