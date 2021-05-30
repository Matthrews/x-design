/**
 * title: 按钮类型
 * desc: 按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
 */

import React from 'react';
import { Button } from 'x-design';

const Demo = () => {
  const handleClick = (e: any) => {
    console.log('handleClick', e);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      <Button>Default Button</Button>
      <Button type="primary">Primary Button</Button>
      <Button type="dashed" onClick={handleClick}>
        Dashed Button
      </Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
};

export default Demo;
