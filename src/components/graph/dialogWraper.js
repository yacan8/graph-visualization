import React, { Component } from 'react';
import VertexDialog from './vertexDialog';
import VertexEditDialog from './vertexEditDialog';
import BatchEditDialog from './batchEditDialog';
import BackupDialog from './backupDialog';

class DialogWraper extends Component {
  render() {
    const { graphComponent } = this.props;
    return <div>
      <VertexDialog graphComponent={graphComponent} />
      <BatchEditDialog graphComponent={graphComponent} />
      <VertexEditDialog graphComponent={graphComponent} />
      <BackupDialog graphComponent={graphComponent} />
    </div>
  }
}

export default DialogWraper;
