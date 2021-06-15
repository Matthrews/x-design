import { useState, useRef, useEffect } from 'react';

export interface Iprops {
  /**
   * 总时间(ms)
   */
  counter: number;
  /**
   * 何时结束，默认0
   */
  over?: number;
  /**
   * 递增计时 or 倒计时
   */
  order?: 'desc' | 'asc';
  /**
   * 间隔，默认为1000ms
   */
  step?: number;
  /**
   * 首次回调
   */
  didMount?: (res?: any) => void;
  /**
   * 更新回调
   */
  didUpdate?: (res?: any) => void;
  /**
   * 结束回调
   */
  didUnmount?: (res?: any) => void;
}

/**
 * 通用计时组件
 */
export default ({
  counter = 0,
  didMount = (res?: any) => {},
  didUpdate = (res?: any) => {},
  didUnmount = (res?: any) => {},
  order = 'desc',
  step = 1000,
  over = 0,
}: Iprops) => {
  const intervalRef = useRef<any>(null);

  const [count, setCount] = useState(Math.floor(counter / step));

  const sign = order === 'asc' ? 1 : -1;

  let hasReachToEnd: boolean = false;
  if (sign > 0) {
    hasReachToEnd = count >= over;
  } else {
    hasReachToEnd = count <= over;
  }

  useEffect(() => {
    didMount?.();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasReachToEnd) {
      intervalRef.current = setInterval(() => {
        setCount((preCount) => preCount + sign);
      }, step);
    }
  }, [hasReachToEnd]);

  useEffect(() => {
    if (count !== counter && count !== over) {
      didUpdate?.(count);
    }
  }, [count]);

  useEffect(() => {
    if (hasReachToEnd) {
      clearInterval(intervalRef.current);
      didUnmount?.(hasReachToEnd);
    }
  }, [hasReachToEnd]);

  return { count };
};
