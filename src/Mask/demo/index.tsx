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

  return (
    <div>
      <Button onClick={handleClick}>打开Mask</Button>
      <Mask visible={visible} motionName="x-mask" maskProps="Close">
        Loading
      </Mask>
    </div>
  );
};

export default MaskDemo;
