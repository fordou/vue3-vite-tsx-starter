import { useStore } from 'vuex';
import { ComponentOptions, defineComponent } from 'vue';

export const Home: ComponentOptions = defineComponent({
  name: 'App',
  setup() {
    const { state } = useStore();
    return () => (
      <>
        <h1>{() => 'Home'}</h1>
        <h1>{state.title}</h1>
      </>
    );
  },
});

export default Home;
