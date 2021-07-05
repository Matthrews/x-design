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
  onClose,
  children,
}: MaskProps) => {
  const [show, setShow] = useState(visible);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);

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

  const handleMaskClick = useCallback(() => {
    if (show && maskClosable) {
      maskClick?.();
    }
  }, [show]);

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
