/**
 * title: 基本
 * desc: 第一个对话框。
 */

import React, { useCallback, useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const ModalDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const handleClick = () => {
    console.log('handleClick');
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  console.log('ModalDemo visible', visible);

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

export default ModalDemo;
