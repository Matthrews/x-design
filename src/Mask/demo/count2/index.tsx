/**
 * title: 定时关闭
 * desc: 让组件库处理定时任务
 */

import React, { useState } from 'react';
import { Mask, Button } from '@Matthrews/x-design';
import './style.less';

const MaskDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);
  const [over, setOver] = useState(false);

  const handleMaskClick = () => {
    setVisible(false);
  };

  console.log('Over', visible, over);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开Mask</Button>
      <h2>{`计时结束了吗？${over}`}</h2>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
        config={{
          closeAfter: 6000,
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
