const globalPrefixCls = 'x';

export const getPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${globalPrefixCls}-${suffixCls}` : globalPrefixCls;
};
