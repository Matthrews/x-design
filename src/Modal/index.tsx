import React, { useEffect, useCallback, useState, useMemo } from 'react';
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
  visible,
  children,
  onClose,
  onOk,
  onCancel,
}: ModalProps) => {
  const [show, setShow] = useState(false);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  useEffect(() => {
    console.log('Modal useEffect createElement');
    let ele = document.createElement('div');
    ele.id = 'x-modal-root';
    document.body.appendChild(ele);
    return () => {
      console.log('removeChild');
      document.body.removeChild(ele);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      console.log('Modal useEffect setShow');
      setShow(visible);
    }
    return () => {};
  }, [visible]);

  const handleCloseModal = () => {
    setShow(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOk = useCallback(() => {
    setShow(false);
    if (typeof onOk === 'function') {
      onOk();
    }
  }, [onOk]);

  const handleCancel = useCallback(() => {
    setShow(false);
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }, [onCancel]);

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
          <Button type="default" onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );

  const portalEle = document.getElementById('x-modal-root');

  console.log('Modal render', show, portalEle);

  if (!portalEle) return null;

  return show ? ReactDOM.createPortal(content, portalEle) : null;
};

export default Modal;
