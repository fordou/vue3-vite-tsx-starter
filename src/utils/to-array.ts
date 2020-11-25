import { SafeAny } from '/@/utils/type';

export const toArray = (t: SafeAny) => Array.isArray(t) ? [...t] : [t];
