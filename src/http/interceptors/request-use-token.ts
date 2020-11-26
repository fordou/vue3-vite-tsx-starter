import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { STORE } from '/@/store';
import { SafeAny } from '/@/utils/type';
import { CONFIG } from '/@/config';

const { debounce, tokenName } = CONFIG;

/**
 * @author DOU
 * @description axios请求拦截器
 */
export function requestUseToken(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = STORE.getters['USER/accessToken'];
      const CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8';

      if (token) {
        config.headers[tokenName] = token;
      }

      if (config.data && config.headers['Content-Type'] === CONTENT_TYPE) {
        config.data = JSON.stringify(config.data);
      }

      if (debounce.some((item) => config.url?.includes(item))) {
        //todo 这里写加载动画
      }
      return config;
    },
    (error: SafeAny) => {
      return Promise.reject(error);
    },
  );
}
