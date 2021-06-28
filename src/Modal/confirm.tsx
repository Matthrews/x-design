import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content';
import Modal, { ModalFuncProps, destroyFns } from './index';

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<ModalFuncProps['type'], ModalFunc>;

export default (config: ModalFuncProps) => {
  console.log('confirm', config);

  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    console.log('destory', args, unmountResult);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function mount({
    okText,
    cancelText,
    prefixCls: customizePrefixCls,
    ...props
  }: any) {
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */
    setTimeout(() => {
      ReactDOM.render(
        <Content {...props} okText={okText} cancelText={cancelText} />,
        div,
      );
    });
  }

  function close(...args: any[]) {
    currentConfig = {
      ...currentConfig,
      visible: false,
      onClose: () => {
        if (typeof config.onClose === 'function') {
          config.onClose();
        }
        destroy.apply(this, args);
      },
    };
    console.log('close', currentConfig);

    mount(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = { ...currentConfig, ...configUpdate };
    }
    mount(currentConfig);
  }

  mount(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
};

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '<Icon />',
    okCancel: false,
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '<Icon />',
    okCancel: false,
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '<Icon />',
    okCancel: false,
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '<Icon />',
    okCancel: false,
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    icon: '<Icon />',
    okCancel: true,
    ...props,
    type: 'confirm',
  };
}
