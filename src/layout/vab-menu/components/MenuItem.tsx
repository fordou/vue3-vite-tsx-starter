import { defineComponent } from '/@/utils/define-component';
import { useRoute, useRouter } from 'vue-router';
import { isExternal } from '/@/utils/validate';
import { ConstantRoute } from '/@/utils/routes';
import { VabIcon } from '../../vab-icon';
import { Menu } from 'ant-design-vue';

export const MenuItem = defineComponent({
  props: {
    item: {
      type: Object,
      default() {
        return null;
      },
    },
    routeChildren: {
      type: Object,
      default: () => null,
    },
  },

  setup(props: {
    item?: ConstantRoute;
    routeChildren?: ConstantRoute
  }) {

    const route = useRoute();
    const router = useRouter();

    function handleLink() {
      const routePath = props.routeChildren?.fullPath;
      const target = props.routeChildren?.meta?.target;
      if (target === '_blank') {
        if (isExternal(routePath)) window.open(routePath);
        else if (route.path !== routePath) window.open(routePath?.href);
      } else {
        if (isExternal(routePath)) window.location.href = routePath;
        else if (route.path !== routePath) router.push(routePath);
      }
    }

    return () => (
      <Menu.Item key={props.routeChildren?.path}>
        <div onClick={handleLink}>
          <div class="anticon">
            <VabIcon icon={props.routeChildren?.meta?.icon}/>
          </div>
          <span>{props.routeChildren?.meta?.title}</span>
        </div>
      </Menu.Item>
    );
  },
});
