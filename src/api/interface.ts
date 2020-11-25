import { SafeAny } from '/@/utils/type';

export interface BaseResult extends SafeAny{
  [key: string]: SafeAny
}
