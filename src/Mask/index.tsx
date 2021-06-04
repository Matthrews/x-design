import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';

import { getPrefixCls } from '../_util';

import './style.less';
import ReactDOM from 'react-dom';

export type MaskProps = {
  prefixCls: string;
  visible: boolean;
  motionName?: string;
  style?: React.CSSProperties;
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
};

export default function Mask(props: MaskProps) {
  const {
    prefixCls: customizePrefixCls,
    style,
    visible,
    maskProps,
    motionName,
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

  let content = (
    <CSSMotion
      key="mask"
      visible={visible}
      motionName={motionName}
      leavedClassName={`${prefixCls}-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          style={{ ...motionStyle, ...style }}
          className={classNames(`${prefixCls}`, motionClassName)}
          {...maskProps}
        />
      )}
    </CSSMotion>
  );

  const portalEle = document.getElementById('x-mask-root');

  console.log('Mask render', show, portalEle);

  if (!portalEle) return null;

  return show ? ReactDOM.createPortal(content, portalEle) : null;
}
