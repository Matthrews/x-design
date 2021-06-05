/**
 * title: 基本
 * desc: 第一个Mask。
 */

import React, { useCallback, useState } from 'react';
import { Mask, Button } from '@Matthrews/x-design';

const MaskDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const handleClick = () => {
    console.log('handleClick');
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  console.log('MaskDemo visible', visible);

  const style = {
    background: '#fff',
    display: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: 530,
    height: 'auto',
    margin: 'auto',
    border: '1px solid red',
  };

  const maskContent = (
    <div style={{ ...style }}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  );

  const handleMaskClick = () => {
    console.log('handleMaskClick by Consumer');
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>打开Mask</Button>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
        // maskProps={{ children: maskContent }}
      >
        {/* <div style={{ background: 'white', textAlign: 'center' }}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div> */}
      </Mask>
    </div>
  );
};

export default MaskDemo;
