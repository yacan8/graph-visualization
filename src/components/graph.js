import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { message } from 'antd';
import * as d3 from 'd3';
import { debounce } from 'lodash';
import D3ReactForce from 'd3-react-force';
import { VertexElement, vertexClick, vertexDbClick } from './graph/vertex';
import { EdgeElement, edgeClick } from './graph/edge';
import Mask from './graph/mask';
import Tools from './tools';
import {
  D3_VELOCITY_DECAY,
  D3_LINK_DISTANCE,
  D3_COLLIDE_RADIUS,
  D3_COLLIDE_STRENGTH,
  D3_CHARGE_STRENGTH,
  types
} from '../constant';
import { vertexTypsColors } from '../icons';

@inject('graphStore', 'uiStore')
@observer
class graph extends Component {

  constructor(props) {
    super(props);
    props.addRef(this);
  }

  state = {
    width: 500,
    height: 800,
    top: 20
  }

  getDragEvent = () => {
    const graphStore = this.props.graphStore;
    const start = () => {
      d3.event.sourceEvent.stopPropagation();
    }
    const drag = () => {
      graphStore.grabbing = true;
    }
    const end = (d) => {
      if (d.locked) {
        d.fx = d.x;
        d.fy = d.y;
      }
      graphStore.grabbing = false;
    }
    return {
      start, drag, end
    }
  }

  getZoomEvent = () => {
    const { graphStore } = this.props;
    const { maskStore } = graphStore;
    let coordinates = [];
    let position = [];
    let shiftKey = false;
    const start = () => {
      shiftKey = d3.event.shiftKey || d3.event.sourceEvent && d3.event.sourceEvent.shiftKey;
      const svgRect = document.getElementById('svg').getBoundingClientRect();
      if (shiftKey) { // 可能是拖拽事件
        graphStore.selecting = true;
        coordinates = d3.mouse(d3.select('#outg').node());
        position = d3.mouse(d3.select('#svg').node());
        maskStore.resize({ width: 0, height: 0, left: position[0] + svgRect.left, top: position[1] + svgRect.top, display: 'block' });
      } else {
        graphStore.selecting = false;
      }
    }

    const end = () => {
      if (d3.event.shiftKey || d3.event.sourceEvent && d3.event.sourceEvent.shiftKey || shiftKey) {
        if (graphStore.selecting) {
          const newCoordinates = d3.mouse(d3.select('#outg').node());
          graphStore.multiSelect(coordinates, newCoordinates);
          maskStore.resize({ width: 0, height: 0, left: 0, top: 0, display: 'none' });
        } else {
          graphStore.selecting = false;
        }
        const { translate, scale } = this.forceComponent.force;
        this.forceComponent.zoomTo({ translate, scale });
      }
    }

    const isZoom = () => {
      const _zoom = !(d3.event.shiftKey || d3.event.sourceEvent && d3.event.sourceEvent.shiftKey);
      if (graphStore.selecting && !_zoom) {
        const newPosition = d3.mouse(d3.select('#svg').node());
        const width = newPosition[0] - position[0];
        const height = newPosition[1] - position[1];
        const option = {
          width: Math.abs(width),
          height: Math.abs(height)
        };
        const svgRect = document.getElementById('svg').getBoundingClientRect();
        if (width < 0) {
          option.left = position[0] + width + svgRect.left;
        }
        if (height < 0) {
          option.top = position[1] + height + svgRect.top;
        }
        option.display = 'block';
        maskStore.resize(option);
      }
      return _zoom;
    };
    const zoom = function () {
      if (graphStore.selecting) {
        maskStore.resize({ width: 0, height: 0, left: 0, top: 0, display: 'none' });
      }
    }
    return {
      start, isZoom, zoom, end
    }
  }

  setSize = () => {
    const width = this.root.offsetWidth;
    const tools = document.getElementById('tools')
    const height = document.documentElement.clientHeight - tools.offsetHeight - 55
    this.setState({ width, height });
  }

  componentDidMount() {
    const store = this.props.graphStore;
    this.setSize();

    window.onresize = () => {
      this.setSize();
    };
    const svg = d3.select('#svg');
    svg
      .on('click', () => {
        if (store.mode === 'linkTo') {
          message.info('已取消关联');
          store.mode = 'default';
        }
        store.selecting = false;
        store.current = null;
        // store.currentLink = null;
        store.unSelectAll();
      })
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode == 65 && (e.metaKey || e.ctrlKey) && e.target === document.body) {
        e.stopPropagation();
        e.preventDefault();
        store.selectAll();
      }
    })
  }

  start = (alpha = 1) => this.forceComponent.force.start(alpha)
  free = (alpha = 0.3) => {
    this.props.graphStore.free();
    this.start(alpha);
  }
  adaption = () => this.forceComponent.adaption()

  render() {
    const { width, height } = this.state;
    const { graphStore, uiStore } = this.props;
    const { vertexs, edges } = graphStore;
    const { theme, icons, blackIcons, colorSignType } = uiStore;
    return (
      <div ref={root => this.root = root}>
        <Tools graphComponent={this}/>
        <D3ReactForce
          ref={forceComponent => this.forceComponent = forceComponent}
          velocityDecay={D3_VELOCITY_DECAY}
          linkDistance={D3_LINK_DISTANCE}
          collideRadius={D3_COLLIDE_RADIUS}
          collideStrength={D3_COLLIDE_STRENGTH}
          chargeStrength={D3_CHARGE_STRENGTH}
          XYCenter={true}
          nodeElement={<VertexElement store={graphStore} />}
          linkElement={<EdgeElement store={graphStore} />}
          dragEvent={this.getDragEvent()}
          zoomEvent={this.getZoomEvent()}
          hoverLink={{
            className: 'hoverlink event',
            stroke: '#fff',
            strokeWidth: 5,
            opacity: 0,
            cursor: "pointer"
          }}
          nodes={vertexs}
          links={edges}
          width={width}
          height={height}
          nodeClick={vertexClick(graphStore, this.forceComponent)}
          nodeDbClick={vertexDbClick(graphStore, this.forceComponent)}
          svgProps={{ id: 'svg', style: {backgroundColor: theme.svgBgColor} }}
          outgProps={{ id: 'outg' }}
          linkMouseover={() => { }}
          linkMouseout={() => { }}
          linkClick={(link, e) => {
            edgeClick(graphStore)(link, e);
            this.forceComponent.forceUpdate(); // getLink的function形式无法触发重渲染
          }}
        >
          <defs>
            <g id="selectedSign">
              <circle cx="7" cy="7" key="node-circle" r={6} strokeWidth="1" stroke="transparent" fill={theme.vertexBgColor} />
              <image width="14" height="14" xlinkHref={icons('selected')} />
            </g>
            <g id="selectedSignBlack">
              <circle cx="7" cy="7" key="node-circle" r={6} strokeWidth="1" stroke="transparent" fill={theme.vertexBgColor} />
              <image width="14" height="14" xlinkHref={blackIcons('selected')} />
            </g>
            <image xlinkHref={icons('locked')} width="7" height="9" id="lock"></image>
          </defs>
        </D3ReactForce>
        <Mask />
        {
          colorSignType && <div className="sign-tip">
            {
              Object.keys(vertexTypsColors).map((type) => {
                return <div key={type} style={{float: 'left'}}>
                  <div className="sign-item" style={{backgroundColor: vertexTypsColors[type]}}></div>
                  <span className="sign-text" style={{color: theme.textColor}}>{types[type]}</span>
                </div>
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default graph;
