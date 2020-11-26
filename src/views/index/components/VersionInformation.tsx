// @ts-ignore
import { dependencies, devDependencies } from '../../../../package.json';
import { Alert, Card } from 'ant-design-vue';
import { format } from 'date-fns';
import { defineComponent } from 'vue';

export const VersionInformation = defineComponent({
  render() {
    const message = `
    基于 
    vite ${devDependencies['vite']}
    vue ${dependencies['vue']}
    ant-design-vue ${dependencies['ant-design-vue']}
    `;
    const updateTime = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
    return (
      <>
        <Alert
          class="mb-4"
          message={message}
          type="success"
          show-icon
        />

        <Card title="系统信息" extra={
          <a href="#">部署时间{updateTime}</a>
        }>
          <h4 class="p-3 text-2xl">dependencies</h4>
          <div class="flex flex-wrap">
            {
              Object.keys(dependencies).map(key => (
                <div class="w-1/3 flex-shrink p-3">
                  <div
                    class="h-16 border flex items-center border-blue-200 p-3 rounded-xl">
                    <span class="mr-3 text-blue-400 font-bold">{key}:</span>
                    <span class="opacity-50">{dependencies[key]}</span>
                  </div>
                </div>
              ))
            }
          </div>
          <h4 class="p-3 text-2xl">devDependencies</h4>
          <div class="flex flex-wrap">
            {
              Object.keys(devDependencies).map(key => (
                <div class="w-1/3 flex-shrink p-3">
                  <div
                    class="h-16 border flex items-center border-blue-200 p-3 rounded-xl">
                    <span class="mr-3 text-blue-400 font-bold">{key}:</span>
                    <span class="opacity-50">{devDependencies[key]}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </Card>
      </>
    );
  },
});
