import { reactive, Ref, ref } from 'vue';
import { isObject } from '@vue/shared';

export function useState<T>(p?: T): [Ref<T>, (p: T) => void] {
  if(isObject(p)){
    const v: any = reactive({ data: p });
    const fn = (t: T) => v.data = t;
    return [v, fn];
  }else {
    const v: any = ref(p);
    const fn = (t: T) => v.value = t;
    return [v, fn];
  }

}
