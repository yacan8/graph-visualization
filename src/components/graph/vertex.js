import React from 'react';
import { inject, observer } from 'mobx-react';
import { vertexTypsColors } from '../../icons';


@inject(({uiStore}) => ({theme: uiStore.theme, icons: uiStore.icons, colorSignType: uiStore.colorSignType}))
@observer
export class VertexElement extends React.Component {
  render() {
    const { node, theme, icons, colorSignType } = this.props;
    const r = [<g id={node.id} key="node" style={{cursor: 'pointer'}}>
      <circle key="node-circle" r={15} strokeWidth={1} stroke={colorSignType ? 'transparent' : theme.vertexColor} fill={colorSignType ? vertexTypsColors[node.type] : theme.vertexBgColor}/>
      {
        !colorSignType && <image key="node-img" xlinkHref={icons(node.type)} width={20} height={20} x={-10} y={-10}/>
      }
      {
        node.selected && (
          <use
            xlinkHref="#selectedSign"
            x={4}
            y={0}
          />
        )
      }
    </g>];
    if (node.showText) {
      r.push(<text dy={30} key="text" textAnchor="middle" fill={theme.textColor}>
        {node.vertexTip}
      </text>);
    }
    if (node.locked) {
      r.push(<use
        key="lock"
        xlinkHref="#lock"
        x={7}
        y={-15}
      />);
    }
    return r;
  }
}

export function vertexClick(store, forceComponent) {
  return (d, d3Event) => {
    const modeClickMap = {
      'default': () => {
        const singleSelect = !(d3Event.metaKey || d3Event.ctrlKey);
        store.current = d;
        if (singleSelect) {
          store.unSelectAll();
          d.selected = true;
        } else {
          d.selected = !d.selected;
        }
      },
      'linkTo': () => {
        const vertexsMap = store.vertexsMap;
        const source = vertexsMap[d.id];
        const edges = [];
        store.vertexs.filter(v => v.selected && v.id !== d.id).forEach(vertex => {
          edges.push({
            source,
            target: vertex
          })
        })
        store.addEdges(edges);
        store.unSelectAll();
        store.mode = 'default';
        forceComponent.force.start(0.3);
      }
    }
    modeClickMap[store.mode]();
  }
}

export function vertexDbClick(store) {
  return (d, d3Event) => {
    const { uiStore } = store;
    uiStore.setVertexEditDialogVisible(true);
  }
}