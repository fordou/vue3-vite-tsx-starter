import { SafeAny } from '/@/utils/type';

export const isValid = (value: SafeAny): boolean => {
  return value !== undefined && value !== null && value !== '';
};
