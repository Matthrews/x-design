import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import ReactDOM from 'react-dom';

import { getPrefixCls } from '../_util';

import './style.less';

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
  maskProps?: React.ReactNode;
  /**
   * mask 点击事件
   * hide
   */
  maskClick?: () => {};
};

export default function Mask(props: MaskProps) {
  const {
    prefixCls: customizePrefixCls,
    style,
    visible,
    maskProps,
    motionName,
    maskClick,
  } = props;
  const [show, setShow] = useState(false);
  const prefixCls = getPrefixCls('mask', customizePrefixCls);

  useEffect(() => {
    console.log('Mask useEffect createElement');
    let ele = document.createElement('div');
    ele.id = 'x-mask-root';
    document.body.appendChild(ele);
    return () => {
      console.log('removeChild');
      document.body.removeChild(ele);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      console.log('Mask useEffect setShow');
      setShow(visible);
    }
    return () => {};
  }, [visible]);

  const handleMaskClick = useCallback(() => {
    console.log('handleMaskClick useCallback');
    if (typeof maskClick === 'function') {
      maskClick();
    } else {
      setShow(false);
    }
  }, [maskClick]);

  console.log('prefixCls', `${prefixCls}-fade`);

  let content = (
    <CSSMotion
      key="mask"
      visible={visible}
      motionName={motionName || `${prefixCls}-fade`}
      leavedClassName={`${prefixCls}-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => {
        console.log('motionClassName', motionClassName);
        console.log('style', motionStyle);

        return (
          <div
            style={{ ...motionStyle, ...style }}
            className={classNames(`${prefixCls}`, motionClassName)}
            // onClick={() => {
            //   console.log('Clicked mask');
            //   setShow(false);
            // }}
            onClick={handleMaskClick}
            {...maskProps}
          />
        );
      }}
    </CSSMotion>
  );

  const portalEle = document.getElementById('x-mask-root');

  console.log('Mask render', show, portalEle);

  if (!portalEle) return null;

  return show ? ReactDOM.createPortal(content, portalEle) : null;
}
