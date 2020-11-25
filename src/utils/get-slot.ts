import { flattenChildren } from '/@/utils/flatten-children';
import { ComponentPublicInstance, Fragment, isVNode } from '@vue/runtime-core';
import { SafeAny } from '/@/utils/type';

export const getSlot = (
  self: ComponentPublicInstance,
  name = 'default',
  options = {},
): SafeAny[] => {
  const $slots: SafeAny = self.$slots;
  if (isVNode(self)) {
    const children: SafeAny = self.children;
    if (self.type === Fragment) {
      return name === 'default' ? flattenChildren(self.children) : [];
    } else if (children && children[name]) {
      return flattenChildren(children[name](options));
    } else {
      return [];
    }
  } else {
    const res = $slots[name] && $slots[name](options);
    return flattenChildren(res);
  }
};
