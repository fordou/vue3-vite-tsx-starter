import { SafeAny } from '/@/utils/type';
import { NetConfig, SettingConfig, ThemeConfig } from '/@/config/default';

/**
 * @description 导出自定义配置
 **/
export const config: CustomConfig = {
  layout: 'vertical',
  donation: true,
  templateFolder: 'project',
  baseURL:'/api',
  // loginInterception:false
};

export interface CustomConfig extends Partial<NetConfig & SettingConfig & ThemeConfig> {
  [key: string]: SafeAny;
}
