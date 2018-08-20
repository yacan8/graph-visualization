import { observable, action, transaction, computed } from 'mobx';
import _ from 'lodash';
import Vertex from './graphStore/vertex';
import Edge from './graphStore/edge';
import MaskStore from './graphStore/maskStore';
import moment from 'moment';
import { GRAPH_LOCAL_KEY } from '../constant';
import { message } from 'antd';

export default class GraphStore {
  @observable mode = 'default';  // linkTo、delete
  @observable vertexs = [];
  @observable edges = [];
  @observable current = null;
  // @observable currentEdge = null;
  @observable selecting = false;
  @observable backups = [];

  constructor(uiStore) {
    this.uiStore = uiStore;
    this.maskStore = new MaskStore(this);
  }

  @action
  addVertex = data => {
    const vertex = new Vertex(data);
    const vertexs = this.vertexs.slice();
    vertexs.push(vertex);
    this.vertexs = vertexs;
    return vertex;
  }

  @computed get vertexsMap() {
    const vertexsMap = {};
    this.vertexs.forEach(vertex => {
      vertexsMap[vertex.id] = vertex;
    });
    return vertexsMap;
  }

  @computed get isVertexSelect() {
    return this.vertexs.filter(vertex => vertex.selected).length
  }

  @computed get isEdgeSelect() {
    return this.edges.filter(edge => edge.selected).length
  }


  @action
  addVertexs = datas => {
    const vertexs = [];
    transaction(() => {
      datas.forEach(data => {
        const vertex = this.addVertex(data);
        vertexs.push(vertex);
      })
    })
    return vertexs;
  }

  @action
  addEdge = (source, target) => {
    if (!this.hasEdge(source, target)) {
      const edge = new Edge(source, target);
      const edges = this.edges.slice();
      edges.push(edge);
      this.edges = edges;
      return edge;
    }
  }

  @action addEdges = datas => {
    const edges = [];
    transaction(() => {
      datas.forEach(data => {
        const edge = this.addEdge(data.source, data.target);
        edges.push(edge);
      })
    })
    return edges;
  }

  @action
  delVertex = (vertex) => {
    this.vertexs = this.vertexs.filter(v => v.id !== vertex.id);
  }

  @action
  delVertexs = (vetexs) => {
    transaction(() => {
      const ids = vetexs.map(v => v.id);
      const edges = this.edges.filter(edge => {
        return ids.indexOf(edge.source.id) > -1 || ids.indexOf(edge.target.id) > -1
      })
      this.delEdges(edges);
      this.vertexs = this.vertexs.filter(v => ids.indexOf(v.id) === -1)
    })
  }

  @action
  delEdge = (edge) => {
    this.edges = this.edges.filter(e => e.id !== edge.id);
  }

  @action
  delEdges = (edges) => {
    transaction(() => {
      edges.forEach(edge => {
        this.delEdge(edge);
      })
    })
  }

  @action
  multiSelect(coordinates, newCoordinates) {
    const maxX = newCoordinates[0] >= coordinates[0] ? newCoordinates[0] : coordinates[0];
    const minX = newCoordinates[0] <= coordinates[0] ? newCoordinates[0] : coordinates[0];
    const maxY = newCoordinates[1] >= coordinates[1] ? newCoordinates[1] : coordinates[1];
    const minY = newCoordinates[1] <= coordinates[1] ? newCoordinates[1] : coordinates[1];
    const vexters = this.vertexs.filter(vertex => vertex.x <= maxX && vertex.x >= minX && vertex.y <= maxY && vertex.y >= minY);
    transaction(() => {
      for (let i = 0; i < vexters.length; i++) {
        for (let j = i + 1; j < vexters.length; j++) {
          const edge = this.hasEdge(vexters[i], vexters[j])
          if (edge) {
            edge.selected = true;
          }
        }
      }
      vexters.forEach(vertex => { vertex.selected = true });
    })
  }

  hasEdge = (source, target) => {
    return _.find(this.edges, edge => {
      return edge.source.id === source.id && edge.target.id === target.id || edge.target.id === source.id && edge.source.id === target.id
    })
  }
  
  @action
  selectAll = () => {
    transaction(() => {
      this.vertexs.forEach(vertex => vertex.selected = true);
      this.edges.forEach(edge => edge.selected = true);
    })
  }

  @action
  unSelectAll = () => {
    transaction(() => {
      this.vertexs.forEach(vertex => vertex.selected = false);
      this.edges.forEach(edge => edge.selected = false);
    })
  }

  @action
  free = () => {
    transaction(() => {
      this.vertexs.forEach(vertex => vertex.setAttr({locked: false}));
    })
  }

  backup = (remark = '') => {
    if (!this.checkLocalStorage()) return;
    const vertexs = this.vertexs.map(vertex => vertex.exportFormat());
    const edges = this.edges.map(edge => edge.exportFormat());
    const vertexMaxMockId = Vertex.getMockMaxVertexId();
    const time = moment().valueOf();
    const backupData = {
      vertexs, edges, vertexMaxMockId, remark, time
    }
    if (!vertexs.length) return;
    let backups = JSON.parse(window.localStorage.getItem(GRAPH_LOCAL_KEY));
    backups = backups ? backups : [];
    backups.unshift(backupData)
    window.localStorage.setItem(GRAPH_LOCAL_KEY, JSON.stringify(backups));
    return backupData;
  }

  setBackups = (backups) => {
    if (!this.checkLocalStorage()) return;
    window.localStorage.setItem(GRAPH_LOCAL_KEY, JSON.stringify(backups));
  }

  checkLocalStorage = () => {
    if (!window.localStorage) {
      message.error('该浏览器不支持此功能');
      return false;
    }
    return true;
  }
  @action
  importBackup = (backup) => {
    if (!this.checkLocalStorage()) return;
    const { vertexs, edges, vertexMaxMockId } = backup;
    Vertex.setMockMaxVertexId(vertexMaxMockId);
    transaction(() => {
      this.vertexs = [];
      this.addVertexs(vertexs);
      const vertexsMap = this.vertexsMap;
      const _edges = [];
      edges.forEach(edge => {
        const source = vertexsMap[edge.sourceId];
        const target = vertexsMap[edge.targetId];
        _edges.push(new Edge(source, target))
        // this.addEdge({source, target})
      })
      this.edges = _edges;
    })
  }

  @action
  resetBackups = (backups) => {
    if (!backups) {
      const backupsJSONString = window.localStorage.getItem(GRAPH_LOCAL_KEY);
      backups = backupsJSONString ? JSON.parse(backupsJSONString) : [];
    }

    this.backups = _.sortBy(backups, o => -o.time).map((backup, i) => {
      backup.id = i;
      return backup;
    });
  }

}