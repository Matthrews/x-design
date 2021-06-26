import React, { useCallback, useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

function countDown() {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: 'This is a notification message',
    content: `This modal will be destroyed after ${secondsToGo} second.`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    console.log('destroy......', modal);
    modal.destroy();
  }, secondsToGo * 1000);

  console.log('secondsToGo', secondsToGo);
}

export default () => <Button onClick={countDown}>5秒后自动关闭Modal</Button>;
