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

  const handleMaskClick = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开Mask</Button>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
      />
    </div>
  );
};

export default MaskDemo;
