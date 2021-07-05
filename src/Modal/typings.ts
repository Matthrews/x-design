import { CSSProperties, ReactNode } from 'react';

interface ConfirmProps {
  /**
   * 提示类型
   */
  type?: 'info' | 'success' | 'confirm' | 'warn' | 'warning' | 'error';
  /**
   * 提示标题
   */
  title?: ReactNode;
  /**
   * 提示内容
   */
  content?: ReactNode;
}

interface FooterProps {
  /**
   * 自定义页脚
   */
  footer?: ReactNode;
  /**
   * 确定文案
   */
  okText?: ReactNode;
  /**
   * 取消文案
   */
  cancelText?: ReactNode;
  /**
   * 异步确认Loading
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

interface CloseProps {
  /**
   * 是否可以关闭
   */
  closable?: boolean;
  /**
   * 关闭 icon
   */
  icon?: string; // TODO
  /**
   * 关闭回调
   */
  onClose?: (envent?: any) => void;
  /**
   * 内部关闭，用于api方式
   */
  close?: () => void;
}

interface StyleProps {
  /**
   * 包裹样式
   */
  wrapperStyle?: CSSProperties;
  /**
   * header样式
   */
  headerStyle?: CSSProperties;
  /**
   * body样式
   */
  bodyStyle?: CSSProperties;
  /**
   * footer样式
   */
  footerStyle?: CSSProperties;
}

export interface ModalProps
  extends ConfirmProps,
    FooterProps,
    CloseProps,
    StyleProps {
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
  children?: ReactNode;
}
