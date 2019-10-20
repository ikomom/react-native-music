import {axiosInstance} from './config';
import {Platform} from 'react-native';

export const getBannerRequest = () => {
  const url = '/banner?type=' + (Platform.OS === 'android' ? '1' : '2');
  return axiosInstance.get(url);
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};

/**
 * 获取歌手信息
 * @param id
 * @return {Promise<AxiosResponse<T>>}
 */
export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};
