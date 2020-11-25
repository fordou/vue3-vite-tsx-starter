import { SafeAny } from '/@/utils/type';
import { Fragment, isVNode } from '@vue/runtime-core';
import { isValid } from '/@/utils/is-valid';
import { isEmptyElement } from '/@/utils/is-empty-element';

export const flattenChildren = (
  children: SafeAny[] | SafeAny = [],
  filterEmpty = true,
): SafeAny[] => {
  const temp = Array.isArray(children) ? children : [children];
  const res: SafeAny[] = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty));
    } else if (child && child.type === Fragment) {
      res.push(...flattenChildren(child.children, filterEmpty));
    } else if (child && isVNode(child)) {
      if (filterEmpty && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty) {
        res.push(child);
      }
    } else if (isValid(child)) {
      res.push(child);
    }
  });
  return res;
};
