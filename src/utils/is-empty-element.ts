import { Fragment } from '@vue/runtime-core';
import { SafeAny } from '/@/utils/type';

export function isEmptyElement(c: SafeAny): boolean {
  return (
    c.type === Comment ||
    (c.type === Fragment && c.children.length === 0) ||
    (c.type === Text && c.children.trim() === '')
  );
}
