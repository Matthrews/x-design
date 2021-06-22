import Button from '@/Button';
import Mask from '@/Mask';
import { getPrefixCls } from '@/_util';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { ModalProps } from './Modal';

export default ({
  prefixCls: customizePrefixCls,
  className,
  title,
  content,
  type,
  visible,
  confirmLoading,
  children,
  footer: customFooter,
  onClose,
  onOk,
  onCancel,
}: ModalProps) => {
  const [show, setShow] = useState(visible);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const handleCloseModal = () => {
    setShow(false);
    if (typeof onClose === 'function') {
      console.log('onClose', onClose);
      onClose();
    } else {
      if (typeof onCancel === 'function') {
        onCancel();
      }
    }
  };

  useEffect(() => {
    if (visible === false && typeof onClose === 'function') {
      console.log('onClose......');
      onClose?.();
    }
  }, [visible]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    console.log('handleCancel', onCancel, onClose);
    setShow(false);
    onCancel?.(e);
    onClose?.();
  };

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
    <div className={classNames(`${prefixCls}-content`)}>
      <div className={classNames(`${prefixCls}-header`)}>
        <div className={classNames(`${prefixCls}-title`)}>{title}</div>
        {titleClose}
      </div>
      <div className={classNames(`${prefixCls}-body`)}>
        {type ? content : children}
      </div>
      <div className={classNames(`${prefixCls}-footer`)}>
        {customFooter ?? footer}
      </div>
    </div>
  );

  console.log('content', show, visible);

  return (
    <div className={classNames(prefixCls, className)}>
      {/* <Mask
        visible={show}
        maskClick={() => {}}
        onClose={() => {}}
        style={{ backgroundColor: 'inherit' }}
      /> */}
      <div role="dialog" className={classNames(`${prefixCls}-wrapper`)}>
        {modalContent}
      </div>
    </div>
  );
};
