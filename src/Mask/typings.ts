import { CSSProperties, ReactNode } from 'react';
export interface MaskProps {
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 点击蒙层是否允许关闭
   * @default true
   */
  maskClosable?: boolean;
  /**
   * 动画名称
   * @default x-mask-fade
   */
  motionName?: string;
  /**
   * maskProps
   */
  maskProps?: object & { children: ReactNode };
  /**
   * 子元素
   */
  children?: ReactNode;
  /**
   * 点击蒙层回调
   */
  maskClick?: Function;
  /**
   * onClose
   */
  onClose: () => void;
  /**
   * prefix
   */
  prefixCls?: string;
  /**
   * style
   */
  style?: CSSProperties;
}
