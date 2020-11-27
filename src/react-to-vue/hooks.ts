import { isObject } from '@vue/shared';
import { reactive, Ref, ref } from 'vue';

type BasicStateAction<S> = ((s: S) => S) | S;
type Dispatch<A> = (t: A) => void;

export function useState<S extends undefined>(initialState: (() => S) | S): [Ref<S>, Dispatch<BasicStateAction<S>>]
export function useState<S extends null>(initialState: (() => S) | S): [Ref<S>, Dispatch<BasicStateAction<S>>]
export function useState<S extends boolean>(initialState: (() => S) | S): [Ref<S>, Dispatch<BasicStateAction<S>>]
export function useState<S extends string>(initialState: (() => S) | S): [Ref<S>, Dispatch<BasicStateAction<S>>]
export function useState<S extends number>(initialState: (() => S) | S): [Ref<S>, Dispatch<BasicStateAction<S>>]
export function useState<S extends object>(initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>]
export function useState<S>(initialState: (() => S) | S): [Ref<S> | S, Dispatch<BasicStateAction<S>>] {
  if (typeof initialState === 'function') {
    // @ts-ignore
    initialState = initialState();
  }

  if (isObject(initialState)) {
    const v: any = reactive({ data: initialState });
    const fn: any = (t: S) => v.data = t;
    return [v, fn];
  } else {
    const v: any = ref(initialState);
    const fn: any = (t: S) => v.value = t;
    return [v, fn];
  }
}

export const useRef = <T>(initialState: T) => ref<T>(initialState);
