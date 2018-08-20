import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject((stores) => ({maskStore: stores.graphStore.maskStore}))
@observer
class Mask extends Component {
  render() {
    const { width, height, top, left, display } = this.props.maskStore;
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 800,
          backgroundColor: 'rgba(0,0,0,.01)',
          pointerEvents: 'none',
          border: '1px dashed #aaa',
          borderRadius: 4,
          width,
          height,
          top,
          left,
          display
        }}/>
    );
  }
}

export default Mask;
