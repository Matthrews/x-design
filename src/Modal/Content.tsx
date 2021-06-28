import Button from '@/Button';
import Mask from '@/Mask';
import { getPrefixCls } from '@/_util';
import classNames from 'classnames';
import { resolveConfig } from 'prettier';
import React, { useEffect, useMemo, useState } from 'react';
import { ModalProps } from './typings';

export default (props: ModalProps) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    title,
    content,
    type,
    visible,
    close,
    icon,
    confirmLoading,
    children,
    footer: customFooter,
    onClose,
    onOk,
    onCancel,
    okCancel,
  } = props;
  console.log('props', props);

  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const handleCloseModal = () => {
    // if (typeof onClose === 'function') {
    //   onClose();
    // } else {
    //   if (typeof onCancel === 'function') {
    //     onCancel();
    //   }
    // }
    close();
  };

  // var gen = function* (func, callback) {
  //   var f1 = yield promisify(onOk);
  //   var f2 = yield promisify(close);
  //   console.log(f1?.toString());
  //   console.log(f2?.toString());
  // };

  // const promisify = (func) => {
  //   return new Promise((resolve) => {
  //     resolve(func());
  //   });
  // };

  useEffect(() => {
    if (visible === false && typeof onClose === 'function') {
      onClose?.();
    }
  }, [visible]);

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
    close?.();
    // var g = gen(e);

    // g.next().value.then(function (data) {
    //   g.next(data).value.then(function (data) {
    //     g.next(data);
    //   });
    // });
  };

  const handleCancel = (e?: React.SyntheticEvent) => {
    onCancel?.(e);
    close?.();
  };

  useEffect(() => {
    if (visible) {
      document.body.classList.add('x-scrolling-effect');
    } else {
      document.body.classList.remove('x-scrolling-effect');
    }
  }, [visible]);

  const titleClose = useMemo(() => {
    return !type ? (
      <Button type="text" onClick={handleCloseModal}>
        <span className={classNames(`${prefixCls}-close-x`)}>×</span>
      </Button>
    ) : null;
  }, [type]);

  const footer = useMemo(() => {
    return type !== 'confirm' ? (
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
    <div className={classNames(`${prefixCls}-content`, `${prefixCls}-confirm-content`)}>
      <div className={classNames(`${prefixCls}-confirm-header`)}>
        {icon}
        <div className={classNames(`${prefixCls}-title`)}>{title}</div>
        {titleClose}
      </div>
      <div className={classNames(`${prefixCls}-confirm-body`)}>
        {type ? content : children}
      </div>
      <div className={classNames(`${prefixCls}-confirm-footer`)}>
        {customFooter ?? footer}
      </div>
    </div>
  );
  return (
    <div className={classNames(prefixCls, className)}>
      <div role="dialog" className={classNames(`${prefixCls}-wrapper`)}>
        {modalContent}
      </div>
    </div>
  );
};
