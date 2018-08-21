import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Modal } from 'antd';
import moment from 'moment';

const Column = Table.Column;

@inject(({uiStore, graphStore}) => ({
  close: () => uiStore.setBackupDialogVisible(false),
  visible: uiStore.backupDialogVisible,
  graphStore
}))
@observer
class BackupDialog extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      this.props.graphStore.resetBackups();
    }
  }

  componentDidMount() {
    this.props.graphStore.resetBackups();
  }

  remove = id => e => {
    Modal.confirm({
      title: '提示',
      content: '确认删除该备份记录吗？',
      onOk: () => {
        const { graphStore } = this.props;
        const { backups } = graphStore;
        const _backups = backups.filter(v => v.id !== id);
        graphStore.resetBackups(_backups);
        graphStore.setBackups(_backups);
      }
    })
  }

  import = record => e => {
    const { graphStore, graphComponent } = this.props;
    Modal.confirm({
      title: '提示',
      content: '导入后当前已存在内容将被清空，确认导入吗？',
      onOk: () => {
        graphStore.importBackup(record);
        graphComponent.start(0.3);
        graphComponent.adaption();
        this.props.close();
      }
    });
  }

  render() {
    const { graphStore, visible } = this.props;
    const { backups } = graphStore;
    return (
      <Modal title="备份列表" visible={visible} width={700} footer={null} onCancel={() => this.props.close()}>
        <Table size="small" dataSource={backups.toJS()} rowKey="id" pagination={false}>
          <Column title="节点数" dataIndex="vertexLength" key="vertexLength" render={(text, record) => {
            return record.vertexs.length;
          }}/>
          <Column title="边数" dataIndex="edgeLength" key="edgeLength" render={(text, record) => {
            return record.edges.length;
          }}/>
          <Column title="时间" dataIndex="time" key="time" render={(text, record) => {
            return moment(text).format('YYYY-MM-DD HH:mm:ss')
          }}/>
          <Column title="备注" dataIndex="remark" key="remark"/>
          <Column title="操作" dataIndex="o" key="o" render={(text, record) => {
            return <span>
              <a onClick={this.import(record)} style={{marginRight: 10}}>导入</a>
              <a onClick={this.remove(record.id)}>删除</a>
            </span>
          }}/>
        </Table>
      </Modal>
    );
  }
}

export default BackupDialog;
