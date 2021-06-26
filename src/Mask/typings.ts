import { ReactNode } from "react";

interface CustomConfig {
    /**
     * 多久后关闭
     */
    closeAfter?: number;
    /** 
     * 关闭回调
     */
    closeCallback?: (timeOver: boolean) => void;
  }
  
export interface MaskProps {
    /**
     * 是否可见
     */
    visible: boolean;
    /**
     * 点击蒙层是否允许关闭
     */
    maskClosable?: boolean;
    /**
     * 动画名称
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
     * 自定义配置
     */
    config?: CustomConfig;
    /**
     * prefix
     */
    prefixCls?: string;
    /**
     * style
     */
    style?: React.CSSProperties;
}