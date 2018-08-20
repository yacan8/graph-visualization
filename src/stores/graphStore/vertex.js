import { observable, action, transaction, computed } from 'mobx';

let vertex_index = 1;

export default class Vertex {
  @observable type;
  @observable value;
  @observable selected = false;
  @observable showText = false;
  @observable black = false;
  @observable locked = false;

  constructor(attrs) {
    this.setAttr(attrs);
    if (!attrs.id) {
      this.id = new Date().getTime() + vertex_index++;
    }
  }

  @action setAttr = attrs => {
    transaction(() => {
      Object.keys(attrs).forEach(key => {
        if (key === 'locked') {
          if (attrs[key]) {
            this.fx = this.x;
            this.fy = this.y;
          } else {
            this.fx = null;
            this.fy = null;
          }
        }
        this[key] = attrs[key];
      })
    })
  }

  @computed get vertexTip() {
    return this.value.indexOf('mock_') > -1 ? `${(this.id + '').substr(12)}_${this.value}` : this.value
  }

  exportFormat() {
    const { locked, selected, fx, fy, x, y, ...exportDatas } = this;
    return JSON.parse(JSON.stringify(exportDatas));
  }

  static setMockMaxVertexId(index) {
    vertex_index = index;
  }

  static getMockMaxVertexId() {
    return vertex_index;
  }

}