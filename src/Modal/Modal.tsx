import React, { useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { getPrefixCls, getParent as getContainerDom } from '@/_util';
import { modalManager, useModalManager } from './util/modalManager';
import { default as Button } from '@/Button';
import { default as Mask } from '@/Mask';
import { ModalProps } from './typings';
import './style.less';

const Modal: any = ({
  prefixCls: customizePrefixCls,
  className,
  title,
  content,
  type,
  visible,
  confirmLoading,
  children,
  footer: customFooter,
  getContainer,
  onClose,
  onOk,
  close,
  wrapperStyle,
  headerStyle,
  bodyStyle,
  footerStyle,
}: ModalProps) => {
  const [show, setShow] = useState(visible);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  const modalRef = useRef(null);

  useModalManager(modalRef, visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('x-scrolling-effect');
    };
  }, []);

  const handleCloseModal = (e?: React.SyntheticEvent) => {
    setShow(false);
    if (onClose) {
      onClose(e);
    } else if (close) {
      close();
    }
  };

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    setShow(false);
    close?.();
  };

  useEffect(() => {
    if (show && !confirmLoading) {
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

  const titleClose = useMemo(() => {
    return !type ? (
      <Button type="text" onClick={handleCloseModal}>
        <span className={classNames(`${prefixCls}-close-x`)}>×</span>
      </Button>
    ) : null;
  }, [type]);

  const footer = useMemo(() => {
    return type ? (
      <Button type="primary" onClick={handleCancel}>
        我知道了
      </Button>
    ) : (
      <>
        <Button type="default" onClick={handleCancel}>
          取消
        </Button>
        <Button type="primary" onClick={handleOk} loading={confirmLoading}>
          确定
        </Button>
      </>
    );
  }, [type]);

  const container = getContainerDom(getContainer);
  const modal = (
    <>
      <Mask visible={show} maskClick={() => {}} onClose={() => {}} />
      <div className={classNames(prefixCls, className)}>
        <div
          ref={modalRef}
          className={classNames(`${prefixCls}-wrapper`)}
          style={wrapperStyle}
        >
          <div
            className={classNames(`${prefixCls}-header`)}
            style={headerStyle}
          >
            <div className={classNames(`${prefixCls}-title`)}>{title}</div>
            {titleClose}
          </div>
          <div className={classNames(`${prefixCls}-body`)} style={bodyStyle}>
            {type ? content : children}
          </div>
          <div
            className={classNames(`${prefixCls}-footer`)}
            style={footerStyle}
          >
            {customFooter !== undefined ? customFooter : footer}
          </div>
        </div>
      </div>
    </>
  );
  return show ? ReactDOM.createPortal(modal, container) : null;
};

export default Modal;
