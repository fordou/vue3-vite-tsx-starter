import { defineComponent } from '/@/utils/define-component';
import { RouterView, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { watch } from 'vue';
import { Layout } from 'ant-design-vue';

export const VabContent = defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const { device } = store.state.SETTINGS;

    watch(route, () => {
      if ('mobile' === device) {
        store.dispatch('SETTINGS/foldSideBar');
      }
    }, { immediate: true });

    return function() {
      return (
        <Layout.Content class="vab-content">
          <RouterView/>
        </Layout.Content>
      );
    };
  },
});
