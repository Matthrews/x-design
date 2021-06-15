/**
 * title: Mask
 * desc: 基本Mask。
 */

import React, { useCallback, useState } from 'react';
import { Mask, Button } from '@Matthrews/x-design';
import './style.less';

const MaskDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const handleClick = () => {
    setVisible(true);
  };

  const handleMaskClick = () => {
    setVisible(false);
  };

  const maskContent = (
    <div className="content-wrapper">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  );

  return (
    <div>
      <Button onClick={handleClick}>打开Mask</Button>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
      >
        {maskContent}
      </Mask>
    </div>
  );
};

export default MaskDemo;
