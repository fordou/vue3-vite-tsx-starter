import { CONFIG } from '/@/config';
import { DownOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';
import { defineComponent } from '/@/utils/define-component';
import { useRoute, useRouter } from 'vue-router';
import { Avatar, Dropdown, Menu } from 'ant-design-vue';

const { recordRoute } = CONFIG;

export const VabAvatar = defineComponent({
  setup() {
    const store = useStore();
    const user = store.state.USER;
    const route = useRoute();
    const router = useRouter();
    const logout = async () => {
      await store.dispatch('USER/logout');
      if (recordRoute) {
        const fullPath = route.fullPath;
        return router.push(`/login?redirect=${fullPath}`);
      } else {
        return router.push('/login');
      }
    };

    return () => (
      <div class="vab-avatar cursor-pointer">
        <Dropdown trigger={['click']} overlay={(
          <Menu>
            <Menu.Item>
              <div onClick={logout}>退出登录</div>
            </Menu.Item>
          </Menu>
        )}>
      <span class="ant-dropdown-link">
        <Avatar size="small" src={user.avatar}/>
        <span class="px-2">{user.username}</span>
        <DownOutlined/>
        </span>
        </Dropdown>
      </div>
    );
  },
});
