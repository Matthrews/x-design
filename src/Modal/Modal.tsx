import React, { useEffect, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { default as Button } from '../Button';
import { getPrefixCls } from '@/_util';

export interface ModalProps {
  /**
   * 标题
   */
  title?: string;
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 异步确认回调
   */
  confirmLoading?: boolean;
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
   * 自定义页脚
   */
  footer?: React.ReactChildren;
  /**
   * 关闭回调
   */
  onClose?: () => void;
  /**
   * 确定回调
   */
  onOk?: (envent?: any) => void;
  /**
   * 取消回调
   */
  onCancel?: (envent?: any) => void;
}

const Modal = ({
  prefixCls: customizePrefixCls,
  className,
  title,
  visible,
  confirmLoading,
  children,
  footer,
  onClose,
  onOk,
  onCancel,
}: ModalProps) => {
  const [show, setShow] = useState(false);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  useEffect(() => {
    if (visible) {
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

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOk?.(e);
  };

  console.log('handleOk', confirmLoading);

  const handleCancel = () => {
    setShow(false);
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  useEffect(() => {
    if (confirmLoading === false) {
      console.log('confirmLoading');
      setShow(false);
    }
  }, [confirmLoading]);

  useEffect(() => {
    if (show) {
      document.body.classList.add('x-scrolling-effect');
    } else {
      document.body.classList.remove('x-scrolling-effect');
    }
  }, [show]);

  let content = (
    <div className={classNames(`${prefixCls}-content`)}>
      <div className={classNames(`${prefixCls}-header`)}>
        <div className={classNames(`${prefixCls}-title`)}>{title}</div>
        <Button type="text" onClick={handleCloseModal}>
          <span className={classNames(`${prefixCls}-close-x`)}>×</span>
        </Button>
      </div>
      <div className={classNames(`${prefixCls}-body`)}>{children}</div>
      {footer ?? (
        <div className={classNames(`${prefixCls}-footer`)}>
          <Button type="default" onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" onClick={handleOk} loading={confirmLoading}>
            确定
          </Button>
        </div>
      )}
    </div>
  );

  let modal = (
    <div className={classNames(prefixCls, className)}>
      <div className={classNames(`${prefixCls}-mask`)}></div>
      <div className={classNames(`${prefixCls}-wrapper`)}>{content}</div>
    </div>
  );

  console.log('Modal render', show);

  return show ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
