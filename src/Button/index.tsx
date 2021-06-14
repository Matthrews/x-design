import React, { ReactNode, SyntheticEvent } from 'react';
import classNames from 'classnames';

import { getPrefixCls } from '../_util';

import './style.less';

export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  /**
   * 加载中...
   */
  loading?: boolean | number | { delay?: number };
  /**
   * 子结点
   */
  children?: ReactNode;
  /**
   * 点击按钮时的回调
   */
  onClick?: (envent?: SyntheticEvent) => void;
  /**
   * 按钮前缀
   */
  prefixCls?: string;
  /**
   * 按钮className
   */
  className?: string;
}

type Loading = boolean | number | { delay?: number };

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

  const iconNode = loadingOrDelay ? (
    <span className={classNames(`${prefixCls}-loading`)}>
      <span className="x-btn-loading-icon">
        <span
          role="img"
          aria-label="loading"
          className="xicon xicon-loading xicon-spin"
        >
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
          </svg>
        </span>
      </span>
    </span>
  ) : null;

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
    } else {
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      tabIndex={0}
      className={classStr}
      onClick={handleClick}
    >
      {iconNode}
      {children}
    </button>
  );
};
