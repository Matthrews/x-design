import confirm, {
  withWarn,
  withInfo,
  withSuccess,
  withError,
  withConfirm,
  ModalStaticFunctions,
} from './Confirm';

import OriginModal from './Modal';
import { ModalProps } from './typings';

import './style.less';

export interface ModalFuncProps extends ModalProps {
  okCancel?: boolean;
}

export const destroyFns: Array<() => void> = [];

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    destroyAll: () => void;
  };

const Modal = OriginModal as ModalType;

Modal.info = function infoFn(props: ModalFuncProps) {
  console.log('infoFn', props);
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warn = function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
};

Modal.warning = function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
};

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  console.log('destroyAll', destroyFns);

  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal;
