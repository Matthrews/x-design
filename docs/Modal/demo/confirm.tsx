import React, { useCallback, useState } from 'react';
import { Modal, Button } from '@Matthrews/x-design';

const { confirm } = Modal;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    icon: '<Icon />',
    content: 'Some descriptions',
    type: 'confirm',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function showPromiseConfirm() {
  confirm({
    title: 'Do you want to delete these items?',
    icon: '<Icon />',
    content:
      'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      setTimeout(() => {
        console.log('over');
      }, 5000);
      // return new Promise((resolve, reject) => {
      //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      // }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {},
  });
}

function showDeleteConfirm() {
  confirm({
    title: 'Are you sure delete this task?',
    icon: '<Icon />',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default () => <Button onClick={showPromiseConfirm}>Confirm</Button>;
