import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal, Select, Form, Checkbox } from 'antd';
import { types } from '../../constant';

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
@inject(({uiStore, graphStore}) => ({
  close: () => uiStore.setBatchEditDialogVisible(false),
  visible: uiStore.batchEditDialogVisible,
  formItemLayout: uiStore.formItemLayout,
  graphStore
}))
@observer
class BatchEditDialog extends Component {

  close = () => this.props.close();

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.props.form.resetFields();
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      const { graphStore, graphComponent } = this.props;
      const { vertexs } = graphStore;
      const attrs = {};
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined && values[key] !== '') {
          attrs[key] = values[key];
        }
      })
      vertexs.filter(v => v.selected).forEach(vertex => vertex.setAttr(attrs));
      this.close();
      graphComponent.start(0.3);
    })
  }

  render() {
    const { form, visible, formItemLayout } = this.props;
    // const { formItemLayout, batchEditDialogVisible } = uiStore;
    const { getFieldDecorator } = form;
    return (
      <Modal
        title="批量编辑"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.close}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="节点类型"
          >
            {getFieldDecorator('type')(
              <Select placeholder="修改后的节点类型（选填）">
                {
                  Object.keys(types).map(type => <Option key={type} value={type}>{types[type]}</Option>)
                }
              </Select>
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="显示节点值"
            >
              {getFieldDecorator('showText', {
                initialValue: false,
                valuePropName: 'checked'
              })(
                <Checkbox />
              )}
            </FormItem>
            
            <FormItem
              {...formItemLayout}
              label="黑名单"
            >
              {getFieldDecorator('black', {
                initialValue: false,
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
                initialValue: false,
                valuePropName: 'checked'
              })(
                <Checkbox />
              )}
            </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default BatchEditDialog;
