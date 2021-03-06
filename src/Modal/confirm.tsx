import { getPrefixCls } from '@/_util';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Content from './Content';
import Modal, { ModalFuncProps, destroyFns } from './index';

let defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

type ConfigUpdate =
  | ModalFuncProps
  | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};

export type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps['type']>,
  ModalFunc
>;

export default function confirm(config: ModalFuncProps) {
  console.log('confirm', config);

  const div = document.createElement('div');
  document.body.appendChild(div);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let currentConfig = { ...config, close, visible: true } as any;

  function destroy(...args: any[]) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    console.log('destory', args, unmountResult);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    const triggerCancel = args.some((param) => param && param.triggerCancel);
    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }

  function render({
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
      // because Modal.config  set rootPrefixCls, which is different from other components
      const rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      const prefixCls = customizePrefixCls || `${rootPrefixCls}-modal`;

      console.log('render', props);

      ReactDOM.render(
        <Content
          {...props}
          prefixCls={prefixCls}
          rootPrefixCls={rootPrefixCls}
          okText={okText}
          cancelText={cancelText}
        />,
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

    render(currentConfig);
  }

  function update(configUpdate: ConfigUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate,
      };
    }
    render(currentConfig);
  }

  render(currentConfig);

  destroyFns.push(close);

  return {
    destroy: close,
    update,
  };
}

export function withWarn(props: ModalFuncProps): ModalFuncProps {
  return {
    // icon: <ExclamationCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'warning',
  };
}

export function withInfo(props: ModalFuncProps): ModalFuncProps {
  return {
    // icon: <InfoCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'info',
  };
}

export function withSuccess(props: ModalFuncProps): ModalFuncProps {
  return {
    // icon: <CheckCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'success',
  };
}

export function withError(props: ModalFuncProps): ModalFuncProps {
  return {
    // icon: <CloseCircleOutlined />,
    okCancel: false,
    ...props,
    type: 'error',
  };
}

export function withConfirm(props: ModalFuncProps): ModalFuncProps {
  return {
    // icon: <ExclamationCircleOutlined />,
    okCancel: true,
    ...props,
    type: 'confirm',
  };
}

export function modalGlobalConfig({
  rootPrefixCls,
}: {
  rootPrefixCls: string;
}) {
  defaultRootPrefixCls = rootPrefixCls;
}
