import React, { useEffect, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { default as Button } from '../Button';
import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
  modalGlobalConfig,
} from './confirm';

import OriginModal, { ModalProps } from './Modal';

import './style.less';

export interface ModalFuncProps extends ModalProps {}

export const destroyFns: Array<() => void> = [];

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    destroyAll: () => void;
    config: typeof modalGlobalConfig;
  };

const Modal = OriginModal as ModalType;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

Modal.config = modalGlobalConfig;

export default Modal;
