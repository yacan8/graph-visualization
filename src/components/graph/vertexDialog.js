import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Modal, Select, Form, InputNumber } from 'antd';
import { types } from '../../constant';

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
@inject(({uiStore, graphStore}) => ({
  close: () => uiStore.setVertexDialogVisible(false),
  visible: uiStore.vertexDialogVisible,
  formItemLayout: uiStore.formItemLayout,
  graphStore
}))
@observer
class VertexDialog extends Component {

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      const { type, num, linkToId } = values;
      const datas = [];
      for (let i = 0; i < num; i++) {
        const data = {
          type, value: `mock_${types[type]}`, showText: false, black: false
        }
        datas.push(data);
      }
      const { graphStore, graphComponent } = this.props;
      const nodeNum = graphStore.vertexs.length;
      const vertexs = graphStore.addVertexs(datas);
      if (linkToId) {
        const vertexsMap = graphStore.vertexsMap;
        const edges = [];
        vertexs.forEach(vertex => {
          edges.push({
            source: vertexsMap[linkToId],
            target: vertex
          })
        })
        graphStore.addEdges(edges);
      }
      this.close();
      graphComponent.start(0.3);
      !nodeNum && graphComponent.adaption();
    })
  }

  close = () => this.props.close()

  render() {
    const { form, graphStore, formItemLayout, visible } = this.props;
    const { getFieldDecorator } = form;
    const { vertexs, current } = graphStore;
    return (
      <Modal
        title="添加节点"
        onCancel={this.close}
        onOk={this.handleSubmit}
        visible={visible}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="节点类型"
          >
            {getFieldDecorator('type', {
              initialValue: Object.keys(types)[0],
              rules: [{
                required: true, message: '请选择节点类型',
              }]
            })(
              <Select>
                {
                  Object.keys(types).map(type => <Option key={type} value={type}>{types[type]}</Option>)
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="节点数"
          >
            {getFieldDecorator('num', {
              initialValue: 1,
              rules: [{
                required: true, message: '请输入节点数',
              }]
            })(
              <InputNumber max={100} min={1}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="连接节点"
          >
            {getFieldDecorator('linkToId', {
              initialValue: current && current.id
            })(
              <Select>
                {
                  vertexs.map(node => <Option key={node.id} value={node.id}>{node.vertexTip}</Option>)
                }
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default VertexDialog;
