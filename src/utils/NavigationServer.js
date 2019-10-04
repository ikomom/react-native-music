/**
 * 注册本地的navigation
 * @author ikonon
 * @create 2019/10/4
 */
import {NavigationActions} from 'react-navigation';

let _navigation;

function setNavigationRef(NavigationRef) {
  _navigation = NavigationRef;
}

function navigate(routeName, params) {
  _navigation.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(routeName?: string) {
  _navigation.dispatch(NavigationActions.back(routeName));
}

export default {
  navigate,
  setNavigationRef,
  goBack,
};
