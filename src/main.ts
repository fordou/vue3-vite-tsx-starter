import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { App } from './App';
import { router } from './router';
import { store } from './store';

import '/@/vab'

import 'ant-design-vue/dist/antd.css';
import './tailwind.css';
import '/@/styles/index.less';

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .mount('#app');
