import { defineComponent } from '/@/utils/define-component';
import {
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Layout, Menu } from 'ant-design-vue';
import { VabMenu } from './vab-menu';
import { VabContent } from './vab-content';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { VabAvatar } from './vab-avatar';
import { VabLogo } from './vab-logo';
import { VabTabs } from './vab-tabs';

export const JuLayout = defineComponent({
  setup() {
    const keys = reactive<{
      selectedKeys: string[]
      openKeys: string[]
    }>({
      selectedKeys: [],
      openKeys: [],
    });
    const store = useStore();
    const settings = store.state.SETTINGS;
    const { routes } = store.state.ROUTES;
    const route = useRoute();
    const width = ref<number>(0);

    watch(route, ({ path, matched }) => {
      matched[0].children.length > 1
        ? (keys.selectedKeys = [path])
        : (keys.selectedKeys = [matched[0].path]);
      keys.openKeys = [matched[0].path];
    }, { immediate: true });

    const toggleDevice = (t: string) => store.dispatch('SETTINGS/toggleDevice',
      t);
    const handleFoldSideBar = () => store.dispatch('SETTINGS/foldSideBar');
    const toggleCollapse = () => {
      store.dispatch('SETTINGS/toggleCollapse');
      console.log(settings.collapse);
    };

    function handleLayouts() {
      const _width = document.body.getBoundingClientRect().width;
      if (width.value !== _width) {
        const isMobile = _width - 1 < 992;
        toggleDevice(isMobile ? 'mobile' : 'desktop');
        width.value = _width;
      }
    }

    onBeforeMount(() => {
      window.addEventListener('resize', handleLayouts);
    });

    onBeforeUnmount(() => {
      window.addEventListener('resize', handleLayouts);
    });

    onMounted(handleLayouts);

    return () => {
      const sideClassName = {
        'vab-sider': true,
        'vab-mobile': settings.device === 'mobile',
        'vab-collapse': settings.collapse,
      };

      const layoutClassName = {
        'vab-layout': true,
        'vab-mobile-layout': 'mobile' === settings.device,
      };

      return (
        <Layout class="vab-layout-wrap">
          {(settings.device === 'mobile' && !settings.collapse) && <div
            class="vab-mask"
            onClick={handleFoldSideBar}
          />}

          <Layout.Sider
            collapsible
            class={sideClassName}
            width="250"
            collapsed={settings.collapse}
            onCollapse={toggleCollapse}
          >
            <VabLogo />

            <Menu
              class="vab-menu"
              theme="dark"
              mode="inline"
              selectedKeys={keys.selectedKeys}
              onSelectChange={v => keys.selectedKeys = v}
              openKeys={keys.openKeys}
              onOpenChange={v => keys.openKeys = v}
            >
              {routes.map((route: any) => (
                !route.hidden && <VabMenu key={route.path} item={route}/>
              ))}
            </Menu>
          </Layout.Sider>

          <Layout class={layoutClassName}>
            <Layout.Header class="vab-header border-b border-gray-200">
              <div class="flex">
                <div class="flex-grow">
                  {
                    settings.collapse
                      ? <MenuUnfoldOutlined
                        class="trigger"
                        onClick={toggleCollapse}
                      />
                      : <MenuFoldOutlined
                        class="trigger"
                        onClick={toggleCollapse}
                      />
                  }

                </div>
                <div class="flex-shrink">
                  <VabAvatar class="mr-5"/>
                </div>
              </div>
            </Layout.Header>
            <VabTabs class="py-3"/>
            <VabContent/>
          </Layout>
        </Layout>
      );
    };
  },
});
