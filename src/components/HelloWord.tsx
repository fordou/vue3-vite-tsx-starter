import { ref } from 'vue';
import { RendererElement } from '@vue/runtime-core';

export interface HelloWordProps {
  msg: string;
}

const count = ref(0);

export const HelloWord = (props: HelloWordProps): RendererElement => {
  const countPlus = () => count.value++;
  return (
    <div>
      <h1>{props.msg}</h1>
      <button class="btn" onClick={() => countPlus()}>
        count is: {count.value}
      </button>
    </div>
  );
};
