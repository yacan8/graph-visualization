import GraphStore from './graphStore';
import UiStore from './uiStore';
export default function configureStore() {
  const uiStore = new UiStore();
  const graphStore = new GraphStore(uiStore);
  return {
    graphStore,
    uiStore
  }
}