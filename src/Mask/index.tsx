import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { getPrefixCls } from '../_util';
import { MaskProps } from './typings';
import './style.less';

export default ({
  prefixCls: customizePrefixCls,
  style,
  visible,
  maskProps,
  motionName = 'x-mask-fade',
  maskClick,
  maskClosable = true,
  config = {},
  onClose,
  children,
}: MaskProps) => {
  const [show, setShow] = useState(visible);
  const [closable, setClosable] = useState(maskClosable);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);

  const intervalRef = useRef<any>(null);

  const { closeAfter, closeCallback } = config || {};

  const [count, setCount] = useState(Number(closeAfter) / 1000);

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
    onClose?.();
  }, []);

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
            {...{ ...maskProps, children: children ?? maskProps?.children }}
          />
        );
      }}
    </CSSMotion>
  );

  return show ? ReactDOM.createPortal(content, document.body) : null;
};
