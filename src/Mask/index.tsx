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

export interface MaskProps {
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
}

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
  const [closable, setClosable] = useState(true);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);

  useEffect(() => {
    setShow(visible);
    return () => {};
  }, [visible]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('x-scrolling-effect');
    } else {
      document.body.classList.remove('x-scrolling-effect');
    }
  }, [visible]);

  useEffect(() => {
    const { closeAfter } = config;
    if (closeAfter) {
      setClosable(false);
      console.log('closeAfter');
      setTimeout(callback, closeAfter);
    }
    return clearTimeout();
  }, [config, visible]);

  const callback = () => {
    const { closeCallback } = config;
    handleMaskClick();
    if (typeof closeCallback === 'function') {
      closeCallback(true);
    }
  };

  const handleMaskClick = useCallback(() => {
    if (closable) {
      if (typeof maskClick === 'function') {
        maskClick();
      } else {
        setShow(false);
      }
    }
  }, [closable]);

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
            onClick={handleMaskClick}
            {...maskProps}
          />
        );
      }}
    </CSSMotion>
  );

  return show ? ReactDOM.createPortal(content, document.body) : null;
}
