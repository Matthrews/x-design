/**
 * title: 加载中状态
 * desc: 添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。
 */

import React, { useCallback, useState } from 'react';
import { Button } from '@Matthrews/x-design';

const Demo = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const enterLoading = (index: number) => {
    console.log('enterLoading clicked');

    setLoadings((loadings) => {
      // const newLoadings = loadings;  // TODO 为什么这样不行？
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((loadings) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return newLoadings;
      });
    }, 6000);
  };

  console.log('newLoadings', loading);
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
        // loading={loading}
        onClick={() => enterLoading(0)}
        // onClick={handleClick}
      >
        Click me!
      </Button>
    </div>
  );
};

export default Demo;
