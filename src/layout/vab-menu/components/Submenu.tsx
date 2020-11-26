import { Menu } from 'ant-design-vue';
import { ConstantRoute } from '/@/utils/routes';
import { getSlot } from '/@/utils/get-slot';
import { defineComponent } from '/@/utils/define-component';
import { VabIcon } from '../../vab-icon';

interface SubmenuProps {
  item: ConstantRoute
  routeChildren: ConstantRoute[],
}

export const Submenu = defineComponent({
  props: {
    item: {
      type: Object,
      request: true,
    },
    routeChildren:{
      type:Array,
    }
  },
  render(props: SubmenuProps) {
    const child = getSlot(this);
    return (
      <Menu.SubMenu key={props.item.fullPath} title={
        <>
          <div class="anticon">
            <VabIcon icon={props?.item?.meta?.icon}/>
          </div>
          <span>{props.item?.meta?.title}</span>
        </>
      }>
        {child}
      </Menu.SubMenu>
    );
  },

});

