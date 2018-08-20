import { observable, action, transaction } from 'mobx';

export default class MaskStore {
  @observable width = 0;
  @observable height = 0;
  @observable left = 0;
  @observable top = 0;
  @observable display = 'none';

  constructor(graphStore) {
    this.graphStore = graphStore;
  }

  @action
  resize = (params) => {
    transaction(() => {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          this[key] = params[key];
        }
      })
    })
  }
}