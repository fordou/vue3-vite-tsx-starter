import { defineComponent } from 'vue';
import { Alert } from 'ant-design-vue';
import { interval } from '/@/utils/timer';
import { HelloWord } from '/@/components/HelloWord';
import { useRef } from '/@/react-to-vue';

const time = useRef(0);
let timer: number | null = null;

export default defineComponent({
  setup() {
    !timer && (timer = interval(1000, () => time.value++));

    return () => (
      <div>
        <Alert
          message={'测试动态路由：' + time.value}
        />
        <HelloWord msg="aaaaa"/>
      </div>
    );
  },
});
