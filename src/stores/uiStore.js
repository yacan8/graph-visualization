import { observable, action, computed } from 'mobx';
import themes from '../theme';
import { getBaseUrlIcons } from '../icons';

export default class UiStore {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    }
  };

  @observable themeMode = "default";
  @observable colorSignType = false;
  @observable vertexDialogVisible = false;
  @observable vertexEditDialogVisible = false;
  @observable batchEditDialogVisible = false;
  @observable backupDialogVisible = false;
  
  @action setVertexDialogVisible = v => this.vertexDialogVisible = v;
  @action setVertexEditDialogVisible = v => this.vertexEditDialogVisible = v;
  @action setBatchEditDialogVisible = v => this.batchEditDialogVisible = v;
  @action setBackupDialogVisible = v => this.backupDialogVisible = v;

  @computed get theme() {
    return themes[this.themeMode];
  }

  @computed get icons() {
    const theme = this.theme
    return getBaseUrlIcons(theme.vertexColor);
  }
}