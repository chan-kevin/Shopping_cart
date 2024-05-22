import React, { Component } from "react";

export default class MyPureComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isPropsEqual = true;
    const isStateEqual = true;

    if (nextProps) {
      isPropsEqual =
        Object.keys(nextProps).every(
          (key) => nextProps[key] === this.props[key]
        ) && Object.keys(nextProps).length === Object.keys(this.props).length;
    }

    if (nextState) {
      isStateEqual =
        Object.keys(nextState).every(
          (key) => nextState[key] === this.state[key]
        ) && Object.keys(nextState).length === Object.keys(this.state).length;
    }

    if (isPropsEqual && isStateEqual) return false;
    return true;
  }
  render() {
    return <div>MyPureComponent</div>;
  }
}
