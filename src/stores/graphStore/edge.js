import { observable, action } from 'mobx';

let edge_index = 1;

export default class Edge {
  @observable selected = false;

  constructor(source, target) {
    this.id = new Date().getTime() + edge_index++;
    this.source = source;
    this.target = target;
  }

  exportFormat() {
    const sourceId = this.source.id;
    const targetId = this.target.id;
    return { sourceId, targetId };
  }
}