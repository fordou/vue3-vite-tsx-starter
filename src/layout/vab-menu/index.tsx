import { defineComponent } from '/@/utils/define-component';
import { ComponentPropsOptions } from '@vue/runtime-core';
import { ConstantRoute } from '/@/utils/routes';
import { MenuItem } from './components/MenuItem';
import { Submenu } from './components/Submenu';

interface VabMenuProps {
  item: ConstantRoute,
}

const VabMenuPropsConfig: ComponentPropsOptions<VabMenuProps> = {
  item: {
    type: Object,
    required: true,
    default: null,
  },
};

function handleChildren(children: ConstantRoute[] = []) {
  return children === null ?
    [] :
    children.filter((item) => item.hidden !== true);
}

function renderMenu(menuRoute: ConstantRoute) {


  const showChildren = handleChildren(menuRoute.children);

  if (showChildren.length === 0) {
    return <MenuItem item={menuRoute} key={menuRoute.path}
                     routeChildren={menuRoute}>
      {renderMapChildren(menuRoute.children)}
    </MenuItem>;
  } else if (showChildren.length === 1 && menuRoute.alwaysShow !== true) {
    return <MenuItem item={menuRoute}
                     routeChildren={showChildren[0]}
                     key={menuRoute.path}/>;
  } else {
    return <Submenu item={menuRoute}>
      {renderMapChildren(menuRoute.children)}
    </Submenu>;
  }

}

function renderMapChildren(children?: ConstantRoute[]) {
  return children?.map(route => (<VabMenu
    key={route.path}
    item={route}
  />));
}

export const VabMenu = defineComponent({
  props: VabMenuPropsConfig,
  setup(props: Partial<VabMenuProps>) {
    return () => (props.item)
      ? renderMenu(props.item)
      : <div />
  }
});
