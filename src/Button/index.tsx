import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../_util';

import './style.less';

export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  /**
   * 按钮前缀
   */
  prefixCls?: string;
  /**
   * 按钮className
   */
  className?: string;
  /**
   *
   */
  loading?: boolean | { delay?: number };
  /**
   * 子结点
   */
  children?: React.ReactNode;
  /**
   * 点击按钮时的回调
   */
  onClick?: (envent: any) => void;
}

type Loading = number | boolean;

export default ({
  prefixCls: customizePrefixCls,
  className,
  type = 'default',
  loading = false,
  children,
  onClick,
}: ButtonProps) => {
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const delayTimeoutRef = React.useRef<number>();
  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);

  // =============== Update Loading ===============
  let loadingOrDelay: Loading;
  if (typeof loading === 'object' && loading.delay) {
    loadingOrDelay = loading.delay || true;
  } else {
    loadingOrDelay = !!loading;
  }

  React.useEffect(() => {
    clearTimeout(delayTimeoutRef.current);
    if (typeof loadingOrDelay === 'number') {
      delayTimeoutRef.current = window.setTimeout(() => {
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }
  }, [loadingOrDelay]);

  const classStr = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
      [`${prefixCls}-loading`]: innerLoading,
    },
    className,
  );

  const handleClick = (e: SyntheticEvent) => {
    if (innerLoading) {
      e.preventDefault();
      return;
    }
    onClick();
  };

  return (
    <button type="button" className={classStr} onClick={handleClick}>
      {children}
    </button>
  );
};
