import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Select, Form, Input, Checkbox } from 'antd';
import { types } from '../../constant';

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
@inject(({uiStore, graphStore}) => ({
  close: () => uiStore.setVertexEditDialogVisible(false),
  visible: uiStore.vertexEditDialogVisible,
  formItemLayout: uiStore.formItemLayout,
  graphStore
}))
@observer
class VertexEditDialog extends Component {

  close = () => this.props.close();

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      const { graphStore } = this.props;
      const { current } = graphStore;
      current.setAttr(values);
      this.close();
    })
  }

  render() {
    const { graphStore, form, formItemLayout, visible } = this.props;
    const { getFieldDecorator } = form;
    const { current } = graphStore;
    return (
      <Modal
        title={`编辑节点 ${current && current.vertexTip}`}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.close}
      >
        {
          current && <Form>
            <FormItem
              {...formItemLayout}
              label="节点类型"
            >
              {getFieldDecorator('type', {
                initialValue: current.type,
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
              label="节点值"
            >
              {getFieldDecorator('value', {
                initialValue: current.value,
                rules: [{
                  required: true, message: '请输入节点值',
                }]
              })(
                <Input autoComplete="off"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="显示节点值"
            >
              {getFieldDecorator('showText', {
                initialValue: current.showText,
                valuePropName: 'checked'
              })(
                <Checkbox />
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label="固定"
            >
              {getFieldDecorator('locked', {
                initialValue: current.locked,
                valuePropName: 'checked'
              })(
                <Checkbox />
              )}
            </FormItem>

          </Form>
        }
      </Modal>
    );
  }
}

export default VertexEditDialog;
