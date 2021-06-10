/**
 * title: 加载中状态
 * desc: 添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。
 */

import React, { useCallback, useState } from 'react';
import { Button } from '@Matthrews/x-design';

const Demo = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((loadings) => {
      const newLoadings = loadings;
      newLoadings[index] = true;

      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((loadings) => {
        const newLoadings = loadings;
        newLoadings[index] = false;

        return newLoadings;
      });
    }, 6000);
  };
  console.log('newLoadings', loadings);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      <Button type="primary" loading>
        Loading
      </Button>
      <br />
      <Button
        type="primary"
        loading={loadings[0]}
        onClick={() => enterLoading(0)}
      >
        Click me!
      </Button>
    </div>
  );
};

export default Demo;
