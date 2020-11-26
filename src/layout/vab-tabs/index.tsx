import { defineComponent } from '/@/utils/define-component';
import { reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ConstantRoute } from '/@/utils/routes';
import { SafeAny } from '/@/utils/type';
import _ from 'lodash';
import { Dropdown, Menu, Tabs } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';

type Tag = ConstantRoute & { [key: string]: any }

export const VabTabs = defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const tagBar = store.state.TAGS_BAR;
    const routes = store.state.ROUTES;

    const data = reactive<{
      affixTabs: any[]
      tabActive: string | number | undefined
      created: any
    }>({
      affixTabs: [],
      tabActive: undefined,
      created: false,
    });

    async function addTabs(tag: Tag) {
      if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
        let matched = [tag.name];
        if (tag.matched) {
          matched = tag.matched.map(({ name }: SafeAny) => name);
        }

        const _tag = _.cloneDeep({ ...tag, matched });
        await addVisitedRoute(_tag);
        data.tabActive = tag.fullPath;
      }
    }

    const addVisitedRoute = (tag: Tag) => store.dispatch(
      'TAGS_BAR/addVisitedRoute', tag);
    const delVisitedRoute = (tag: Tag) => store.dispatch(
      'TAGS_BAR/delVisitedRoute', tag);
    const delOthersVisitedRoutes = (tag: Tag) => store.dispatch(
      'TAGS_BAR/delOthersVisitedRoutes', tag);
    const delLeftVisitedRoutes = (tag: Tag) => store.dispatch(
      'TAGS_BAR/delLeftVisitedRoutes', tag);
    const delRightVisitedRoutes = (tag: Tag) => store.dispatch(
      'TAGS_BAR/delRightVisitedRoutes', tag);
    const delAllVisitedRoutes = () => store.dispatch(
      'TAGS_BAR/delAllVisitedRoutes');

    function initAffixTabs(routes: Tag[] = []) {
      (routes || []).forEach((route: Tag) => {
        if (route.meta && route.meta.affix) {
          addTabs(route);
        }
        if (route.children) {
          initAffixTabs(route.children);
        }
      });
    }

    function isActive(route: ConstantRoute) {
      return route.path === route.path;
    }

    function isAffix(tag: Tag) {
      return tag.meta && tag.meta.affix;
    }

    function handleTabClick(path: string) {
      const _route = tagBar.visitedRoutes
        .find((item: Tag) => item.path === path);

      if (route.fullPath !== _route.fullPath) {
        router.push(_route);
      }
    }

    async function handleTabRemove(fullPath: string) {
      const view = tagBar.visitedRoutes.find((item: Tag) => {
        return fullPath === item.fullPath;
      });
      await delVisitedRoute(view);
      if (isActive(view)) toLastTag();
    }

    async function handleClick({ key }: { key: string }) {
      switch (key) {
        case 'closeOthersTabs':
          return closeOthersTabs();
        case 'closeLeftTabs':
          return closeLeftTabs();
        case 'closeRightTabs':
          return closeRightTabs();
        case 'closeAllTabs':
          return closeAllTabs();
      }
    }

    const closeOthersTabs = () => delOthersVisitedRoutes(toThisTag());
    const closeLeftTabs = () => delLeftVisitedRoutes(toThisTag());
    const closeRightTabs = () => delRightVisitedRoutes(toThisTag());
    const closeAllTabs = async () => {
      await delAllVisitedRoutes();
      if (tagBar.affixTabs.some((tag: Tag) => tag.path === toThisTag().path))
        return;
      toLastTag();
    };

    function toLastTag() {
      const latestView = tagBar.visitedRoutes.slice(-1)[0];
      if (latestView) router.push(latestView);
      else router.push('/');
    }

    function toThisTag() {
      const view = tagBar.visitedRoutes.find(
        (item: Tag) => item.fullPath === route.fullPath,
      );
      if (route.path !== view.path) router.push(view);
      return view;
    }

    initAffixTabs(routes.routes);
    watch(route, route => addTabs(route as any));
    addTabs(route as any)

    return () => {
      return (
        <div class="vab-tabs">
          <div class="vab-tabs-left-panel">
            <Tabs
              onTabClick={handleTabClick}
              onEdit={(t) => handleTabRemove(t + '')}
              activeKey={data.tabActive}
              hideAdd
              type="editable-card"
            >{
              tagBar.visitedRoutes?.map((item: Tag) => (
                <Tabs.TabPane
                  key={item.fullPath}
                  closable={!isAffix(item)}
                  tab={item.meta?.title}
                />
              ))
            }
            </Tabs>
          </div>
          <div class="vab-tabs-right-panel">
            <Dropdown overlay={
              <>
                <Menu onClick={handleClick}>
                  <Menu.Item key="closeOthersTabs">
                    <a>关闭其他</a>
                  </Menu.Item>
                  <Menu.Item key="closeLeftTabs">
                    <a>关闭左侧</a>
                  </Menu.Item>
                  <Menu.Item key="closeRightTabs">
                    <a>关闭右侧</a>
                  </Menu.Item>
                  <Menu.Item key="closeAllTabs">
                    <a>关闭全部</a>
                  </Menu.Item>
                </Menu>
              </>
            }>
              <a-button style="margin-left: 8px">
                更多
                <DownOutlined/>
              </a-button>
            </Dropdown>
          </div>
        </div>
      );
    };
  },
});
