/**
 * title: Mask
 * desc: 定时关闭
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Mask, Button } from '@Matthrews/x-design';
import './style.less';

const MaskDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [over, setOver] = useState<Boolean>(false);

  useEffect(() => {
    setOver(over);
  }, [over]);

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
      <span>{`over: ${over}`}</span>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
        maskProps={{ children: maskContent }}
        config={{
          closeAfter: 10000,
          closeCallback: (res: any) => {
            setOver(res);
            console.log('是否结束了', res);
          },
        }}
      />
    </div>
  );
};

export default MaskDemo;
