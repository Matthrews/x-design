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
      <Button onClick={handleClick}>打开Modal</Button>
      <Modal
        title="Basic Modal"
        visible={visible}
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
