import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toArray } from '/@/utils/to-array';
import { SafeAny } from '/@/utils/type';
import { message } from 'ant-design-vue';
import { store } from '/@/store';
import { router } from '/@/router';
import { CONFIG } from '/@/config';

const { successCode } = CONFIG;
let loadingInstance: { close: Function };

/**
 * @author DOU
 * @description 处理code异常
 * @param {*} code
 * @param data
 */
const handleCode = (code: number, data: SafeAny) => {
  switch (code) {
    case 401:
      message.error(data || '登录失效');
      store.dispatch('USER/resetAll').catch(() => {
        // todo
      });
      break;
    case 403:
      router.push({ path: '/401' }).catch(() => {
        // todo
      });
      break;
    default:
      message.error(data || `后端接口${code}异常`);
      break;
  }
};

/**
 * @author DOU
 * @description axios响应拦截器
 */
export function responseUseHandleError(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      if (loadingInstance) {
        loadingInstance.close();
      }

      const { status, data, config } = response;
      const successCodes = toArray(successCode);
      // 是否操作正常
      if (successCodes.includes(status)) {
        return data;
      } else {
        handleCode(status, data);
        return Promise.reject(
          'vue-admin-beautiful请求异常拦截:' +
          JSON.stringify({ url: config.url, status, data }) ||
          'Error',
        );
      }
    },
    (error: AxiosError) => {
      if (loadingInstance) loadingInstance.close();

      if (error.response) {
        const { response, message: errorMessage } = error;
        const { status, data } = response;
        handleCode(status, data.message || errorMessage);
        return Promise.reject(error);
      } else {
        let { message: errorMessage } = error;
        if (errorMessage === 'Network Error') {
          errorMessage = '后端接口连接异常';
        }
        if (errorMessage.includes('timeout')) {
          errorMessage = '后端接口请求超时';
        }
        if (errorMessage.includes('Request failed with status code')) {
          const code = errorMessage.substr(errorMessage.length - 3) || '';
          errorMessage = '后端接口' + code + '异常';
        }
        message.error(errorMessage || `后端接口未知异常`);
        return Promise.reject(error);
      }
    },
  );
}
