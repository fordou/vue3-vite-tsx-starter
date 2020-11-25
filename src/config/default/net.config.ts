/**
 * @description 导出默认网路配置
 **/
export const network: NetConfig = {
  baseURL: '/',
  contentType: 'application/json;charset=UTF-8',
  messageDuration: 3000,
  requestTimeout: 10000,
  successCode: [200, 0],
};

export interface NetConfig {
  /** 后端 API 路径配置 */
  baseURL: string

  /** 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8 */
  contentType: string;
  /** 消息框消失时间 */
  messageDuration: number;
  /** 最长请求时间 */
  requestTimeout: number;
  /** 操作正常code，支持String、Array、int多种类型 */
  successCode: number | number[];
}
