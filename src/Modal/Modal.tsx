import React, { useEffect, useState, useMemo, useRef } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { getPrefixCls, getParent as getContainerDom } from '@/_util';
import { FocusTrap } from './FocusTrap';
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
  onCancel,
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

  const handleCloseModal = (e?: React.SyntheticEvent) => {
    setShow(false);
    if (typeof onClose === 'function') {
      onClose(e);
    } else {
      if (typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  };

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    setShow(false);
    onCancel?.(e);
  };

  useEffect(() => {
    if (show === true && confirmLoading === false) {
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

  const handleKeydown = (event: KeyboardEvent) => {
    // Only the last modal need to be escaped when pressing the esc key
    if (event.key !== 'Escape' || !modalManager.isTopModal(modalRef)) {
      return;
    }
    handleCancel();
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleKeydown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
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

  const modalContent = (
    <div className={classNames(`${prefixCls}-content`)} style={wrapperStyle}>
      <div className={classNames(`${prefixCls}-header`)} style={headerStyle}>
        <div className={classNames(`${prefixCls}-title`)}>{title}</div>
        {titleClose}
      </div>
      <div className={classNames(`${prefixCls}-body`)} style={bodyStyle}>
        {type ? content : children}
      </div>
      <div className={classNames(`${prefixCls}-footer`)} style={footerStyle}>
        {customFooter ?? footer}
      </div>
    </div>
  );

  const container = getContainerDom(getContainer);
  const modal = (
    <div className={classNames(prefixCls, className)}>
      <Mask
        visible={show}
        maskClick={() => {}}
        onClose={() => {}}
        style={{ backgroundColor: 'inherit' }}
      />
      <div
        role="dialog"
        ref={modalRef}
        className={classNames(`${prefixCls}-wrapper`)}
      >
        <FocusTrap container={modalRef} initialFocusRef={undefined} />
        {modalContent}
      </div>
    </div>
  );
  return show ? ReactDOM.createPortal(modal, container) : null;
};

export default Modal;
