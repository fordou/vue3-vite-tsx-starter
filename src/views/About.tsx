import { ComponentOptions, ref } from 'vue';
import { HelloWord } from '/@/components/HelloWord';
import { TestSlot } from '/@/components/test-slot';
import Logo from '/@/assets/logo.png';

export const About: ComponentOptions = {
  setup() {
    const msg = ref('111');
    return () => (
      <>
        <h1>{() => 'About'}</h1>
        <img class="block mx-auto" src={Logo} />
        <HelloWord msg={msg.value} />
        <TestSlot>aasdfasdfasdfasdfasd</TestSlot>
      </>
    );
  },
};

export default About;
