/**
 * @description 导出默认主题配置
 */
import { SafeAny } from '/@/utils/type';

export const theme: ThemeConfig = {
  showTagsBar:true,
  header: null,

  layout: 'horizontal',

  themeName: 'default',

  fixedHeader: true,

  showProgressBar: true,

  showTabsBar: true,

  showLanguage: true,

  showRefresh: true,

  showSearch: true,

  showTheme: true,

  showNotice: true,

  showFullScreen: true,
};

export interface ThemeConfig {
  header: SafeAny;
  showTagsBar: boolean;
  /** 布局种类 horizontal vertical gallery comprehensive common */
  layout: string;
  /** 主题名称 default ocean green glory white */
  themeName: string;
  /** 是否固定头部 */
  fixedHeader: boolean;
  /** 是否显示顶部进度条 */
  showProgressBar: boolean;
  /** 是否显示多标签页 */
  showTabsBar: boolean;
  /** 是否显示语言选择组件 */
  showLanguage: boolean;
  /** 是否显示刷新组件 */
  showRefresh: boolean;
  /** 是否显示搜索组件 */
  showSearch: boolean;
  /** 是否显示主题组件 */
  showTheme: boolean;
  /** 是否显示通知组件 */
  showNotice: boolean;
  /** 是否显示全屏组件 */
  showFullScreen: boolean;
}
