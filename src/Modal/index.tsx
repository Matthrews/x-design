import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
} from './Confirm';

import OriginModal from './Modal';
import { destroyFns, ModalProps } from './typings';

import './style.less';

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    destroyAll: () => void;
  };

const Modal = OriginModal as ModalType;

Modal.info = function infoFn(props: ModalProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalProps) {
  return confirm(withError(props));
};

Modal.warn = function modalWarn(props: ModalProps) {
  return confirm(withWarn(props));
};

Modal.warning = function modalWarn(props: ModalProps) {
  return confirm(withWarn(props));
};

Modal.confirm = function confirmFn(props: ModalProps) {
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

export default Modal;
