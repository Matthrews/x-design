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
  const intervalRef = useRef<any>(null);

  const [count, setCount] = useState(10);

  // 组件卸载时清除计时器
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      if (count === 10) {
        intervalRef.current = setInterval(() => {
          setCount((preCount) => preCount - 1);
        }, 1000);
      } else if (count === 0) {
        console.log('outter over');
        setCount(10);
        setVisible(false);
        clearInterval(intervalRef.current);
      }
    }
  }, [visible, count]);

  const handleMaskClick = () => {
    // 计时结束才可以关闭
    if (count === 0) {
      setVisible(false);
    }
  };

  const maskContent = useMemo(
    () => (
      <div className="content-wrapper">
        <p>倒计时：{count}</p>
      </div>
    ),
    [count],
  );

  console.log('count', count);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>打开Mask后10秒关闭</Button>
      <Mask
        visible={visible}
        motionName="x-mask-fade"
        maskClick={handleMaskClick}
        maskProps={{ children: maskContent }}
      />
    </div>
  );
};

export default MaskDemo;
