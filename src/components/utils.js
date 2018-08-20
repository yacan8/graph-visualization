import React from 'react';
import { Modal, Input } from 'antd';

export const confirmText = ({
  onOk, placeholder, content, iconType, ...options
}) => {
  let text;
  Modal.confirm({
    iconType: 'false',
    content: <Input style={{marginLeft: -40, width: '112.5%'}} onChange={e => text = e.target.value} placeholder={placeholder}/>,
    onOk: () => {
      onOk(text);
    },
    ...options
  });
}