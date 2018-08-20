import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Tooltip, message, Modal, Menu, Dropdown } from 'antd';
import { confirmText } from './utils';
import theme from '../theme';

const confirm = Modal.confirm;
const notAllowStyle = { opacity: 0.3, cursor: 'not-allowed' };

@inject('graphStore', 'uiStore')
@observer
export default class Tools extends Component {

  adaption = () => this.props.graphComponent.adaption();
  addVertex = () => this.props.uiStore.setVertexDialogVisible(true);
  batchModify = () => this.props.uiStore.setBatchEditDialogVisible(true);
  vertexEdit = () => this.props.uiStore.setVertexEditDialogVisible(true);
  backups = () => this.props.uiStore.setBackupDialogVisible(true);

  delVertex = () => {
    confirm({
      title: '提示',
      content: '确认删除选中节点和边吗？删除后无法撤销。',
      onOk: () => {
        const { graphStore, graphComponent } = this.props;
        const { vertexs, edges } = graphStore;
        graphStore.delVertexs(vertexs.filter(v => v.selected));
        graphStore.delEdges(edges.filter(e => e.selected));
        graphComponent.start(0.2);
      }
    });
  }

  graphLayout = layout => {
    return e => {
      this.props.graphComponent.forceComponent.addLayout(layout).execute();
      this.props.graphStore.vertexs.forEach(vertex => vertex.setAttr({ locked: true }))
    }
  }

  getLayoutMenu = () => {
    return <Menu>
      <Menu.Item>
        <a onClick={() => this.props.graphComponent.free()}>释放</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={this.graphLayout('circle')}>圆形布局</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={this.graphLayout('archimeddeanSpiral')}>阿基米德螺旋布局</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={this.graphLayout('dagre')}>分层布局</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={this.graphLayout('grid')}>栅格布局</a>
      </Menu.Item>
    </Menu>
  }

  getBackupMenu = () => {
    const { vertexs } = this.props.graphStore;
    return <Menu>
      <Menu.Item disabled={!vertexs.length}>
        <a onClick={vertexs.length ? this.backup : null} style={!vertexs.length ? notAllowStyle : null}>本地备份</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={this.backups}>已备份列表</a>
      </Menu.Item>
    </Menu>
  }

  getThemeMenu = () => {
    const { uiStore } = this.props;
    return <Menu>
      {
        Object.keys(theme).map(theme => {
          return <Menu.Item key={theme}>
            <a onClick={() => uiStore.themeMode = theme}>主题 {theme}</a>
          </Menu.Item>
        })
      }
    </Menu>
  }

  linkToMode = () => {
    this.props.graphStore.mode = 'linkTo';
    message.info('请点击要关联到的节点');
  }

  backup = () => {
    confirmText({
      title: false,
      placeholder: '备注',
      onOk: (remark) => {
        this.props.graphStore.backup(remark);
      }
    })
  }

  render() {
    const { isVertexSelect, isEdgeSelect, vertexs } = this.props.graphStore;
    const allowDelete = isVertexSelect || isEdgeSelect;
    const singleSelect = vertexs.filter(v => v.selected).length === 1;
    return (
      <div className="tools" id="tools">

        <Tooltip title="新建节点" placement="bottom">
          <a className="tool-item" onClick={this.addVertex}>
            <Icon type="plus-square-o" />
          </a>
        </Tooltip>

        <Tooltip title="关联至指定节点" placement="bottom">
          <a className="tool-item" onClick={isVertexSelect && this.linkToMode} style={!isVertexSelect ? notAllowStyle : null}>
            <Icon type="swap" />
          </a>
        </Tooltip>

        <Tooltip title="批量编辑选中节点" placement="bottom">
          <a className="tool-item" onClick={isVertexSelect ? singleSelect ? this.vertexEdit : this.batchModify : null} style={!isVertexSelect ? notAllowStyle : null}>
            <Icon type="form" />
          </a>
        </Tooltip>

        <Tooltip title="删除选中节点与边" placement="bottom">
          <a className="tool-item" onClick={allowDelete && this.delVertex} style={!allowDelete ? notAllowStyle : null}>
            <Icon type="delete" />
          </a>
        </Tooltip>

        <Tooltip title="自适应" placement="bottom">
          <a className="tool-item" onClick={this.adaption}>
            <Icon type="appstore-o" />
          </a>
        </Tooltip>
        {
          !!vertexs.length ? <Dropdown overlay={this.getLayoutMenu()}>
            <a className="tool-item">
              <Icon type="dribbble" />
            </a>
          </Dropdown> : <Tooltip title="布局" placement="bottom">
              <a className="tool-item" style={notAllowStyle}>
                <Icon type="dribbble" />
              </a>
            </Tooltip>
        }
        <Dropdown overlay={this.getBackupMenu()}>
          <a className="tool-item">
            <Icon type="select" />
          </a>
        </Dropdown>

        <Dropdown overlay={this.getThemeMenu()}>
          <a className="tool-item">
            <Icon type="dropbox" />
          </a>
        </Dropdown>
        <Tooltip title="切换节点显示模式" placement="bottom">
          <a className="tool-item" onClick={() => this.props.uiStore.colorSignType = !this.props.uiStore.colorSignType}>
            <Icon type="retweet" />
          </a>
        </Tooltip>
        <Tooltip title={<div>
          <div>control+a全选所有节点</div>
          <div>按住shift框选节点</div>
          <div>按住control点击多选节点</div>
          <div>单击选择节点、双击编辑节点</div>
        </div>} placement="bottomRight">
          <a style={{float: 'right'}} className="tool-item"><Icon type="question" /></a>
        </Tooltip>

      </div>
    );
  }
}
