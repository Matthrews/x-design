/**
 * title: Modal
 * desc: 自定义节点挂载位置
 */

import React, { useCallback, useRef, useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const ModalDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);

  const divRef = useRef(null);

  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  console.log('divRef', divRef.current);

  return (
    <div>
      <Button onClick={handleClick}>自定义节点挂载位置</Button>
      <div style={{ backgroundColor: 'red', height: 22 }} ref={divRef}>
        挂载到这里
      </div>
      <Modal
        title="自定义节点挂载位置"
        visible={visible}
        onClose={handleClose}
        onOk={handleClose}
        onCancel={handleClose}
        getContainer={() => divRef?.current}
      >
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ModalDemo;
