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

export type GetContainer =
  | (() => HTMLElement | HTMLElement | string)
  | undefined;

export const getParent = (getContainer: any) => {
  if (!canUseDOM) {
    return null;
  }
  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelectorAll(getContainer)[0];
    }
    if (typeof getContainer === 'function') {
      return getContainer();
    }
    if (
      typeof getContainer === 'object' &&
      getContainer instanceof window.HTMLElement
    ) {
      return getContainer;
    }
  }
  return document.body;
};
