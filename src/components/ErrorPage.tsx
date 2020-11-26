import { defineComponent, onMounted, ref } from 'vue';
import { interval } from '/@/utils/timer';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SafeAny } from '/@/utils/type';
import { Col, Row } from 'ant-design-vue';
import { ComponentPropsOptions } from '@vue/runtime-core';
import { getSlot } from '/@/utils/get-slot';

export interface ErrorPageProps {
  oops: string
  headline: string
  info: string
  btn: string
  jumpTime: number
}

const props: ComponentPropsOptions<ErrorPageProps> = {
  oops: {
    type: String,
    default: '抱歉!',
  },
  headline: {
    type: String,
    default: '页面错误!',
  },
  info: {
    type: String,
    default: '请检查您输入的网址是否正确，或点击下面的按钮返回首页。!',
  },
  btn: {
    type: String,
    default: '返回首页',
  },
  jumpTime: {
    type: Number,
    default: 5,
  },
};

export const ErrorPage = defineComponent({
  props,
  setup(props: Partial<ErrorPageProps>) {
    console.log(props);
    const router = useRouter();
    const path = useRoute().path;
    const jumpTime = ref<number>(props.jumpTime || 5);
    const timer = ref(0);
    const store = useStore();
    const delVisitedRoute = (t: SafeAny) => store.dispatch(
      'TAGS_BAR/delVisitedRoute', t);

    onMounted(() => {
      timer.value = interval(1000, async () => {
        if (jumpTime && jumpTime.value > 0) {
          jumpTime.value--;
        } else {
          await closeThisPage();
          clearInterval(timer.value);
        }
      });
    });

    function closeThisPage() {
      return Promise.all([
        router.push({ path: '/' }),
        delVisitedRoute({ path }),
      ]);
    }

    return { jumpTime, closeThisPage };
  },

  render(_: any, __: any, props: ErrorPageProps) {
    const { oops, headline, info, btn } = props;
    const { jumpTime, closeThisPage } = this;
    const slot = getSlot(this);
    return (
      <div class="error-container">
        <div class="error-content">
          <Row>
            <Col lg={12} md={12} sm={24} xl={12} xs={24}>
              {slot}
            </Col>

            <Col lg={12} md={12} sm={24} xl={12} xs={24}>
              <div class="bullshit">
                <div class="bullshit-oops">{oops}</div>
                <div class="bullshit-headline">{headline}</div>
                <div class="bullshit-info">{info}</div>
                <a class="bullshit-return-home" onClick={closeThisPage}>
                  {jumpTime}s&nbsp;{btn}
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  },
});
