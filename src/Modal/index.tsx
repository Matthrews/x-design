import React, { useEffect, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { default as Button } from '../Button';
import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
  modalGlobalConfig,
} from './confirm';

import { getPrefixCls } from '../_util';

import './style.less';

export interface ModalFuncProps {}

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

  useEffect(() => {
    if (visible) {
      document.body.classList.add('x-scrolling-effect');
    } else {
      document.body.classList.remove('x-scrolling-effect');
    }
  }, [visible]);

  let content = (
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

export const destroyFns: Array<() => void> = [];

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

// type ModalType = typeof OriginModal &
// ModalStaticFunctions & { destroyAll: () => void; config: typeof modalGlobalConfig };

// const Modal = OriginModal as ModalType;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

Modal.config = modalGlobalConfig;

export default Modal;
