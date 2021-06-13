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
  | string
  | HTMLElement
  | (() => HTMLElement)
  | undefined;

export const getParent = (getContainer: GetContainer) => {
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

// const attachToParent = (force = false) => {
//   if (force || (container && !container.parentNode)) {
//     const parent = getParent('getContainer');
//     if (parent) {
//       parent.appendChild(container);
//       return true;
//     }

//     return false;
//   }

//   return true;
// };

// export const getContainer = () => {
//   if (!canUseDOM) {
//     return null;
//   }
//   if (!container) {
//     container = document.createElement('div');
//     attachToParent(true);
//   }
//   // setWrapperClassName();
//   return container;
// };

// const setWrapperClassName = () => {
//   const { wrapperClassName } = {};
//   if (
//     container &&
//     wrapperClassName &&
//     wrapperClassName !== container.className
//   ) {
//     container.className = wrapperClassName;
//   }
// };

// const removeCurrentContainer = () => {
//   // Portal will remove from `parentNode`.
//   // Let's handle this again to avoid refactor issue.
//   container?.parentNode?.removeChild(container);
// };

// console.log('Content', container);
