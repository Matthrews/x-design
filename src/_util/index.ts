import ReactDOM from 'react-dom';

const globalPrefixCls = 'x';

export const getPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${globalPrefixCls}-${suffixCls}` : globalPrefixCls;
};

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const isReact16 = canUseDOM && ReactDOM.createPortal !== undefined;
