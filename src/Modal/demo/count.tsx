/**
 * title: Modal
 * desc: 定时关闭
 */

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
    modal.destroy();
  }, secondsToGo * 1000);
}

export default () => (
  <Button onClick={countDown}>Open modal to close in 5s</Button>
);
