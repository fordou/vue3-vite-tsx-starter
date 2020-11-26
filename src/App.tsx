import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';

import zhCN from 'ant-design-vue/es/locale/zh_CN';

export const App = () => (
  <ConfigProvider locale={zhCN}><RouterView/></ConfigProvider>
);
