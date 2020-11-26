import { RendererElement } from '@vue/runtime-core';
import { useState } from '/@/utils/use-state';
import { FC } from '/@/utils/function-component';

export interface HelloWordProps {
  msg: string;
}

const [count, setCount] = useState(0);

export const HelloWord: FC<HelloWordProps> = (props): RendererElement => {
  return (
    <div>
      <h1>{props.msg}</h1>
      <button class="btn" onClick={() => setCount(count.value + 1)}>
        count is: {count.value}
      </button>
    </div>
  );
};
