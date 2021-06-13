import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import ReactDOM from 'react-dom';

import { getPrefixCls } from '../_util';

import './style.less';
import { getParent as getContainerDom } from '../_util/index';

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
   * 点击蒙层是否允许关闭
   */
  maskClosable: boolean;
  /**
   * 挂载DOM节点
   */
  getContainer?: () => HTMLElement | HTMLElement;
  /**
   * onClose
   */
  onClose: () => void;
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
    maskProps = {},
    motionName = 'x-mask-fade',
    maskClick,
    maskClosable = true,
    config = {},
    getContainer,
    onClose,
  } = props;
  const [show, setShow] = useState(visible);
  const [closable, setClosable] = useState(maskClosable);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);

  const intervalRef = useRef<any>(null);

  const { closeAfter, closeCallback } = config || {};

  const [count, setCount] = useState((closeAfter || 0) / 1000);

  // 组件卸载时清除计时器
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (show) {
      if (count) {
        intervalRef.current = setInterval(() => {
          setCount((preCount) => preCount && preCount - 1);
        }, 1000);
      } else if (count === 0) {
        if (typeof maskClick === 'function') {
          maskClick();
        }
        if (typeof closeCallback === 'function') {
          closeCallback(true);
        }
        clearInterval(intervalRef.current);
      }
    }
  }, [show, count]);

  useEffect(() => {
    return onClose?.();
  }, []);

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
    }
  }, [config, visible]);

  const handleMaskClick = useCallback(() => {
    if (closable) {
      if (typeof maskClick === 'function') {
        maskClick();
      } else {
        setShow(false);
      }
    }
  }, [closable]);

  let container = getContainerDom(getContainer);

  const { children, ...rest } = maskProps;
  // console.log('getContainer', show, container, children);

  if (show && children && container) {
    // container.appendChild(children);
    ReactDOM.render(children, container); // 计时关闭回有bug
  }

  // console.log('mask', show, count);

  let content = (
    <CSSMotion
      key="mask"
      visible={show}
      motionName={motionName}
      leavedClassName={`${prefixCls}-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => {
        return (
          <div
            style={{ ...motionStyle, ...style }}
            className={classNames(`${prefixCls}`, motionClassName)}
            onClick={handleMaskClick}
            {...(rest,
            { children: container !== document.body ? null : children })}
          />
        );
      }}
    </CSSMotion>
  );

  return show ? ReactDOM.createPortal(content, document.body) : null;
}
