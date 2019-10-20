/**
 *
 * @author ikonon
 * @create 2019/10/19
 */
import React from 'react';
import {is} from 'immutable';

class ImmutableComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {},
      thisState = this.state || {};

    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }

    for (const key in nextProps) {
      if (!is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (
        thisState[key] !== nextState[key] ||
        !is(thisState[key], nextState[key])
      ) {
        return true;
      }
    }
    return false;
  }
}
