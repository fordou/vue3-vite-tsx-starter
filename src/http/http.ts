import axios from 'axios';
import { CONFIG } from '/@/config';
import { requestUseToken, responseUseHandleError } from '/@/http/interceptors';

const { baseURL, contentType, requestTimeout } = CONFIG;

/**
 * @author DOU
 * @description axios初始化
 */
const axiosInstance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: { 'Content-Type': contentType },
});

// 加上统一 TOKEN
requestUseToken(axiosInstance);

// 统一拦截错误
responseUseHandleError(axiosInstance)

export const http = axiosInstance;
export const post = axiosInstance.post.bind(axiosInstance);
export const get = axiosInstance.get.bind(axiosInstance);
export const remove = axiosInstance.delete.bind(axiosInstance);
export const head = axiosInstance.head.bind(axiosInstance);
export const options = axiosInstance.options.bind(axiosInstance);
export const put = axiosInstance.put.bind(axiosInstance);
export const patch = axiosInstance.patch.bind(axiosInstance);

(window as any).http = http
