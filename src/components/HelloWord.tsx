import { RendererElement } from '@vue/runtime-core';
import { FC, useState } from '/@/react-to-vue';

export interface HelloWordProps {
  msg: string;
}

const [count] = useState<number>(0);

export const HelloWord: FC<HelloWordProps> = (props): RendererElement => {
  return (
    <div>
      <h1>{props.msg}</h1>
      <button class="btn" onClick={() => count.value++}>
        count is: {count.value}
      </button>
    </div>
  );
};
