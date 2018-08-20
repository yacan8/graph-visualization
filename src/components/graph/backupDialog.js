import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Modal } from 'antd';
import moment from 'moment';
import _ from 'lodash';

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
    // this.props.graphStore.importBackup({"vertexs":[{"type":"accountMobile","value":"mock_手机号码","showText":false,"black":false,"id":1533641667246,"x":121.37868830773446,"y":-159.60835855109192,"index":0,"vy":0.0020904911941298653,"vx":0.000735293400133631},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677229,"x":-25.927902433976392,"y":-313.7514762388871,"index":1,"vy":0.0008740165799157863,"vx":0.002072404911459984,"fx":null,"fy":null,"_clickid":null},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677230,"x":16.18861248068013,"y":103.39856505102738,"index":2,"vy":0.00029771168815467786,"vx":0.0019153138298600098},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677231,"x":-143.6284502392078,"y":-243.9413959896197,"index":3,"vy":0.000013850539561822279,"vx":0.0018249138955240304},{"type":"idNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677232,"x":-214.7850667579091,"y":-119.6837282823017,"index":4,"vy":0.002003846879286874,"vx":0.001893182283540798,"fx":null,"fy":null},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677233,"x":-42.66375974756105,"y":-49.88867139529205,"index":5,"vy":0.0003209231759989338,"vx":0.001766483510834497,"fx":null,"fy":null,"_clickid":null},{"type":"cardNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677234,"x":88.1909951394183,"y":-242.86715101135061,"index":6,"vy":0.0010040097780969366,"vx":0.00275698223392381,"fx":null,"fy":null},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677235,"x":-61.75054120009647,"y":94.90536709225263,"index":7,"vy":0.0007577846771231131,"vx":0.0019559571150892753},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677237,"x":77.07213289460395,"y":59.00444600643815,"index":8,"vy":0.000489791730954948,"vx":0.0019288104083226914},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677238,"x":47.46895038758808,"y":-165.4514379062489,"index":9,"vy":-0.0014446342124364165,"vx":0.0006347257664224007,"fx":null,"fy":null,"_clickid":null},{"type":"cardNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677239,"x":-110.01129983582011,"y":-178.62396443003536,"index":10,"vy":0.0006380019219011119,"vx":0.00029454694581261667,"fx":null,"fy":null},{"type":"idNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677240,"x":-206.77028007914026,"y":32.45576312754595,"index":11,"vy":0.0017550950353275902,"vx":0.001929703018763242,"fx":null,"fy":null},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677241,"x":-328.00718783396167,"y":81.3856452403204,"index":12,"vy":0.0028813083838350622,"vx":0.0021906400646315017,"fx":null,"fy":null,"_clickid":null},{"type":"accountEmail","value":"mock_邮箱","showText":false,"black":false,"id":1533641677242,"x":-25.584618438014136,"y":-199.84348438379337,"index":13,"vy":0.0007625995195461252,"vx":-0.00002467079931771578,"fx":null,"fy":null,"_clickid":null},{"type":"idNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677244,"x":-172.20085226772665,"y":126.45480162464638,"index":14,"vy":0.0015695473242597591,"vx":0.002580490229136137,"fx":null,"fy":null},{"type":"cardNumber","value":"mock_邮箱","showText":false,"black":false,"id":1533641677245,"x":110.29684752383488,"y":-10.827145578944013,"index":15,"vy":0.0004054244007619218,"vx":0.0017448710113362347,"fx":null,"fy":null}],"edges":[{"sourceId":1533641677233,"targetId":1533641667246},{"sourceId":1533641677233,"targetId":1533641677229},{"sourceId":1533641677233,"targetId":1533641677230},{"sourceId":1533641677233,"targetId":1533641677231},{"sourceId":1533641677233,"targetId":1533641677232},{"sourceId":1533641677233,"targetId":1533641677234},{"sourceId":1533641677233,"targetId":1533641677235},{"sourceId":1533641677233,"targetId":1533641677237},{"sourceId":1533641677233,"targetId":1533641677238},{"sourceId":1533641677233,"targetId":1533641677239},{"sourceId":1533641677233,"targetId":1533641677240},{"sourceId":1533641677233,"targetId":1533641677242},{"sourceId":1533641677233,"targetId":1533641677244},{"sourceId":1533641677233,"targetId":1533641677245},{"sourceId":1533641677241,"targetId":1533641677232},{"sourceId":1533641677241,"targetId":1533641677240},{"sourceId":1533641677241,"targetId":1533641677244},{"sourceId":1533641677229,"targetId":1533641667246},{"sourceId":1533641677229,"targetId":1533641677231},{"sourceId":1533641677229,"targetId":1533641677232},{"sourceId":1533641677229,"targetId":1533641677234},{"sourceId":1533641677229,"targetId":1533641677238},{"sourceId":1533641677229,"targetId":1533641677239},{"sourceId":1533641677229,"targetId":1533641677242}],"vertexMaxMockId":17,"remark":"颜色","time":1533641783088});
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
