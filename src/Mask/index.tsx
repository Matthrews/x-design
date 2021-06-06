import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import ReactDOM from 'react-dom';

import { getPrefixCls } from '../_util';

import './style.less';

export interface CustomConfig {
  closeAfter?: number;
  closeCallback?: (timeOver: boolean) => void;
}

export type MaskProps = {
  /**
   * prefix
   */
  prefixCls: string;
  /**
   * 是否可见
   */
  visible: boolean;
  /**
   * 动画名称
   */
  motionName?: string;
  /**
   * style
   */
  style?: React.CSSProperties;
  /**
   * maskProps
   */
  maskProps?: object;
  /**
   * mask 点击事件
   */
  maskClick?: () => {};
  /**
   * 自定义配置
   */
  config?: CustomConfig;
};

export default function Mask(props: MaskProps) {
  const {
    prefixCls: customizePrefixCls,
    style,
    visible,
    maskProps,
    motionName = 'x-mask-fade',
    maskClick,
    config = {},
  } = props;
  const [show, setShow] = useState(false);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);
  const maskRef: React.LegacyRef<HTMLDivElement> = React.createRef();

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('x-scrolling-effect');
    } else {
      document.body.classList.remove('x-scrolling-effect');
    }
  }, [visible]);

  useEffect(() => {
    const { closeAfter, closeCallback } = config;
    if (closeAfter) {
      console.log('useEffect', maskRef);
      if (maskRef?.current) {
        maskRef.current.onclick = null;
        // maskRef.current.removeEventListener('click', handleMaskClick);
      }
      console.log('closeAfter');
      setTimeout(() => {
        setShow(false);
        if (typeof closeCallback === 'function') {
          closeCallback(true);
        }
      }, closeAfter);
    }
  }, [config, maskRef]);

  const handleMaskClick = useCallback(() => {
    if (typeof maskClick === 'function') {
      maskClick();
    } else {
      setShow(false);
    }
  }, []);

  let content = (
    <CSSMotion
      key="mask"
      visible={visible}
      motionName={motionName}
      leavedClassName={`${prefixCls}-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => {
        console.log('motionStyle', motionClassName, motionStyle);
        return (
          <div
            style={{ ...motionStyle, ...style }}
            className={classNames(`${prefixCls}`, motionClassName)}
            ref={maskRef}
            onClick={handleMaskClick}
            {...maskProps}
          />
        );
      }}
    </CSSMotion>
  );

  return show ? ReactDOM.createPortal(content, document.body) : null;
}
