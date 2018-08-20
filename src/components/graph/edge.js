import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject(({uiStore}) => ({theme: uiStore.theme}))
@observer
export class EdgeElement extends Component {
  render() {
    const { link, addRef, theme } = this.props;
    return <line
      ref={c => addRef(c)}
      className='line event'
      stroke={link.selected ? theme.edgeSelectColor : theme.edgeColor}
      strokeWidth={link.selected ? 1.5 : 1}
      cursor="pointer"
    />
  }
}

export function edgeClick(store) {
  return (link, d3Event) => {
    d3Event.stopPropagation();
    const singleSelect = !(d3Event.metaKey || d3Event.ctrlKey);
    if (singleSelect) {
      store.unSelectAll();
      link.selected = true;
      store.current = null;
    } else {
      link.selected = !link.selected
    }
  }
}