/**
 * title: 基本
 * desc: 第一个对话框。
 */

import React, { useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const Demo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const handleClick = (e: any) => {
    console.log('handleClick', e);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button onClick={handleClick}>打开Modal</Button>
      <Modal title="Basic Modal" visible={visible} onClose={handleClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default Demo;
