import GraphStore from './graphStore';
import UiStore from './uiStore';
import themes from '../theme';

export default function configureStore() {
  const uiStore = new UiStore(themes);
  const graphStore = new GraphStore(uiStore);
  return {
    graphStore,
    uiStore
  }
}