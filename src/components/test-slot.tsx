import { defineComponent } from 'vue';
import { getSlot } from '../utils/get-slot';

export const TestSlot = defineComponent({
  setup() {
    return { test: 1 };
  },
  render(t: { test: number }) {
    console.log(t.test);
    const slot = getSlot(this);
    console.log(slot);
    return <div>{slot}</div>;
  },
});
