import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Mask, Button } from '@Matthrews/x-design';
import './style.less';

const MaskDemo = () => {
  const [visible, setVisible] = useState<Boolean>(false);

  const maskContent = useMemo(
    () => (
      <div className="content-wrapper">
        <Button onClick={() => setVisible(false)}>点我才可以关闭</Button>
      </div>
    ),
    [visible],
  );

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开Mask</Button>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        closable={false}
        maskProps={{ children: maskContent }}
      />
    </div>
  );
};

export default MaskDemo;
