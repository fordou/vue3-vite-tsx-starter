import { useStore } from 'vuex';
import { defineComponent, reactive, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Form, Input } from 'ant-design-vue';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { asyncCatch } from '/@/utils/async-catch';

interface FormGroup {
  username: string;
  password: string;
}

export default defineComponent({
  methods: {
    getFormGroup() {
      const { form, handleSubmit, isLoading } = this;
      return (
        <Form model={form} onFinish={handleSubmit} layout={'vertical'}>
          <Form.Item>
            <Input onChange={t => form.username = t.target.value}
                   class="rounded-3xl"
                   value={form.username}
                   size={'large'}
                   prefix={() => (<UserOutlined style="color: #aaa"/>)}/>
          </Form.Item>
          <Form.Item>
            <Input onChange={t => form.password = t.target.value}
                   class="rounded-3xl"
                   value={form.password}
                   size={'large'}
                   prefix={() => (<LockOutlined style="color: #aaa"/>)}/>
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}
                    loading={isLoading}
                    class="rounded-3xl"
                    size={'large'}
                    block
                    disabled={form.username === '' || form.password === ''}>
              登录
            </Button>
          </Form.Item>
        </Form>);
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isLoading = ref<boolean>(false);
    const redirect: Ref<string> = ref('');

    const form = reactive<FormGroup>({
      username: 'admin',
      password: '123456',
    });

    const login = (v: FormGroup) => store.dispatch('USER/login', v);
    const { logo, title } = store.state.SETTINGS;

    function handleRoute() {
      return redirect.value === '/404' || redirect.value === '/403'
        ? '/'
        : redirect.value;
    }

    async function handleSubmit() {
      isLoading.value = true;
      const [, err] = await asyncCatch(login(form));
      isLoading.value = false;
      if (err) {
        return;
      }
      const url = handleRoute();
      await router.push(url);
    }

    watch(route, (newRoute) => {
      redirect.value = (route.query?.redirect) as string ?? '/';
    });

    return {
      logo,
      title,
      form,
      isLoading,
      handleSubmit,
    };
  },

  render() {
    const { title, getFormGroup } = this;
    const formGroup = getFormGroup();
    return (
      <>
        <div class="login-container flex flex-row-reverse items-center px-10">
          <div class="login-container-form p-10">
            <div class="login-container-hello">HELLO WORLD!</div>
            <div class="login-container-title">欢迎来到 {title}</div>
            {formGroup}
          </div>

          <div class="login-container-footer fixed bottom-0 p-3">
            基于vue + ant-design-vue 开发
          </div>
        </div>
      </>);
  },
})
;

