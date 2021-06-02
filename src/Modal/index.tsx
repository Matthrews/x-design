import React, { useEffect, useCallback, useState } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { default as Button } from '../Button';

import { getPrefixCls } from '../_util';

import './style.less';

export interface ModalProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 前缀
   */
  prefixCls?: string;
  /**
   * className
   */
  className?: string;
  /**
   * 子结点
   */
  children?: React.ReactNode;
  /**
   * 关闭回调
   */
  onClose?: () => void;
  /**
   * 确定回调
   */
  onOk?: (envent: any) => void;
  /**
   * 取消回调
   */
  onCancel?: (envent: any) => void;
}

const Modal = ({
  prefixCls: customizePrefixCls,
  className,
  title,
  visible: show,
  children,
  onClose,
  onOk,
  onCancel,
}: ModalProps) => {
  debugger;
  const [visible, setVisible] = useState<Boolean>(show as boolean);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  useEffect(() => {
    console.log('useEffect');
    let ele = document.createElement('div');
    ele.id = 'x-modal-root';
    document.body.appendChild(ele);
    return () => {
      document.body.removeChild(ele);
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setVisible(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  }, [visible]);

  const portalEle = document.getElementById('x-modal-root');

  if (!portalEle) return null;

  let content = (
    <div className={classNames(prefixCls, className)}>
      <div className={classNames(`${prefixCls}-mask`)}></div>
      <div className={classNames(`${prefixCls}-content`)}>
        <div className={classNames(`${prefixCls}-header`)}>
          <div className={classNames(`${prefixCls}-title`)}>{title}</div>
          <Button type="text" onClick={handleCloseModal}>
            <span className={classNames(`${prefixCls}-close-x`)}>×</span>
          </Button>
        </div>
        <div className={classNames(`${prefixCls}-body`)}>{children}</div>
        <div className={classNames(`${prefixCls}-footer`)}>
          <Button type="default" onClick={onCancel}>
            取消
          </Button>
          <Button type="primary" onClick={onOk}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );

  return visible ? ReactDOM.createPortal(content, portalEle) : null;
};

export default React.memo(Modal);
