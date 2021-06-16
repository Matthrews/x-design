import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { default as Button } from '@/Button';
import { default as Mask } from '@/Mask';
import { getPrefixCls, getParent as getContainerDom } from '@/_util';
import { FocusTrap } from './FocusTrap';
import { modalManager, useModalManager } from './modalManager';

interface ConfirmProps {
  /**
   * 提示类型
   */
  type?: 'info' | 'success' | 'confirm' | 'warn' | 'warning' | 'error';
  /**
   * 提示标题
   */
  title?: string;
  /**
   * 提示内容
   */
  content?: React.ReactNode;
}

interface FooterProps {
  /**
   * 自定义页脚
   */
  footer?: React.ReactNode;
  /**
   * 确定文案
   */
  okText?: React.ReactNode;
  /**
   * 取消文案
   */
  cancelText?: React.ReactNode;
  /**
   * 异步确认回调
   */
  confirmLoading?: boolean;
  /**
   * 确定回调
   */
  onOk?: (envent?: any) => void;
  /**
   * 取消回调
   */
  onCancel?: (envent?: any) => void;
}

interface CLoseProps {
  /**
   * 是否可以关闭
   */
  closable?: boolean;
  /**
   * 自定义关闭 icon
   */
  icon?: string; // TODO
  /**
   * 关闭回调
   */
  onClose?: () => void;
}

export interface ModalProps extends ConfirmProps, FooterProps, CLoseProps {
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 挂载DOM节点
   */
  getContainer?: () => HTMLElement | HTMLElement | string;
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
}

const Modal = ({
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
}: ModalProps) => {
  const [show, setShow] = useState(visible);
  const prefixCls = getPrefixCls('modal', customizePrefixCls);

  const modalRef = useRef(null);

  useModalManager(modalRef, visible);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleCloseModal = () => {
    setShow(false);
    if (typeof onClose === 'function') {
      onClose();
    } else {
      if (typeof onCancel === 'function') {
        onCancel();
      }
    }
  };

  const handleOk = (e?: React.SyntheticEvent) => {
    onOk?.(e);
  };

  const handleCancel = () => {
    setShow(false);
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  useEffect(() => {
    if (confirmLoading === false) {
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

  // useEffect(() => {
  //   if (modalRef) {
  //     if (show) {
  //       modalRef?.current?.focus();
  //     } else {
  //       modalRef?.current?.unfocus();
  //     }
  //   }
  // }, [show, modalRef]);

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
        <span tabIndex={999} className={classNames(`${prefixCls}-close-x`)}>
          ×
        </span>
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

  const container = getContainerDom(getContainer);

  if (container && container !== document.body) {
    // let content = (
    //   <div className={classNames(prefixCls, className)}>
    //     <div className={classNames(`${prefixCls}-wrapper`)}>{modalContent}</div>
    //   </div>
    // );
    // ReactDOM.createPortal('content', container);
    // console.log('getContainerDom', container);

    // TODO 能否实现mask挂载在最外面，而content挂载在里面

    const mask = (
      <div className={classNames(prefixCls, className)}>
        {/* <div className={classNames(`${prefixCls}-mask`)}></div> */}
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
    return show && ReactDOM.createPortal(mask, container);
  }

  const modal = (
    <div className={classNames(prefixCls, className)}>
      {/* <div className={classNames(`${prefixCls}-mask`)}></div> */}
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

  return show && ReactDOM.createPortal(modal, document.body);
};

export default Modal;
