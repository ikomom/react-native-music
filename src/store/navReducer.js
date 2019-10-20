/**
 *
 * @author ikonon
 * @create 2019/10/19
 */
import {NavigationActions} from 'react-navigation';
import {fromJS} from 'immutable';

const initAction = NavigationActions.init();

function createNavigationReducer(navigator) {
  const initialState = fromJS(
    navigator.router.getStateForAction(initAction, null),
  );
  return (state = initialState, action) => {
    return state.merge(
      navigator.router.getStateForAction(action, state.toJS()) || state.toJS(),
    );
  };
}

export {createNavigationReducer};
