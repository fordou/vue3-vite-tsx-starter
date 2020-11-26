import { defineComponent } from '/@/utils/define-component';
import { useStore } from 'vuex';
import { VabIcon } from '../vab-icon';

export const VabLogo = defineComponent({
  setup() {
    const store = useStore();
    const settings = store.state.SETTINGS;

    return () => (
      <div class="vab-logo flex items-center justify-center text-white overflow-ellipsis whitespace-no-wrap overflow-hidden">
        <VabIcon className="text-2xl" icon={settings.logo}/>
        <span class="anticon"/>
        <span class="text-base pl-2">{settings.title}</span>
      </div>
    );
  },
});
