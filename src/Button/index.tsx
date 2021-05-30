import React from 'react';
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
   * 子结点
   */
  children?: React.ReactNode;
  /**
   * 点击按钮时的回调
   */
  onClick?: (envent: any) => void;
}

export default ({
  prefixCls: customizePrefixCls,
  className,
  type = 'default',
  children,
  onClick,
}: ButtonProps) => {
  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  const classStr = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: !!type,
    },
    className,
  );

  return (
    <button type="button" className={classStr} onClick={onClick}>
      {children}
    </button>
  );
};
