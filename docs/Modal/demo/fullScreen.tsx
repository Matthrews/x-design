/**
 * desc: 全屏Modal
 */

import React, { useCallback, useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const ModalDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>全屏Modal</Button>
      <Modal
        title="FullScreen Modal"
        visible={visible}
        wrapperStyle={{ height: '100%', width: '100%' }}
        onClose={handleClose}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ModalDemo;
