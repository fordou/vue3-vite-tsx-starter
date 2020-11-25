import { defineComponent, onMounted, ref } from 'vue';
import { interval } from '/@/utils/timer';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SafeAny } from '/@/utils/type';
import { Col, Row } from 'ant-design-vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const jumpTime = ref(5);
    const oops = ref('抱歉!');
    const headline = ref('您没有操作角色...');
    const info = ref('当前帐号没有操作角色,请联系管理员。');
    const btn = ref('返回首页');
    const timer = ref(0);
    const store = useStore();
    const delOthersVisitedRoutes = (t: SafeAny) => store.dispatch(
      'TAGS_BAR/delOthersVisitedRoutes', t);

    onMounted(() => {
      timer.value = interval(1000, async () => {
        if (jumpTime.value > 0) {
          jumpTime.value--;
        } else {
          await Promise.all([
            router.push({ path: '/' }),
            delOthersVisitedRoutes({ path: '/' }),
          ]);
          clearInterval(timer.value);
        }
      });
    });

    return{ oops, headline, info, btn ,jumpTime}
  },

  render() {
    const { oops, headline, info, btn ,jumpTime} = this
    return (
      <div class="error-container">
        <div class="error-content">
          <Row>
            <Col lg={12} md={12} sm={24} xl={12} xs={24}>
              <div class="pic-error">
                <img class="pic-error-parent"
                     src="/assets/error_images/403.png"/>
                <img
                  class="pic-error-child left"
                  src="/assets/error_images/cloud.png"
                />
              </div>
            </Col>

            <Col lg={12} md={12} sm={24} xl={12} xs={24}>
              <div class="bullshit">
                <div class="bullshit-oops">{oops}</div>
                <div class="bullshit-headline">{headline}</div>
                <div class="bullshit-info">{info}</div>
                <a class="bullshit-return-home" href="#/index">
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
