import { SafeAny } from '/@/utils/type';

/**
 * @description 导出默认通用配置
 */
export const setting: SettingConfig = {

  title: 'VUE3 STARTER',

  titleSeparator: ' - ',

  titleReverse: false,

  abbreviation: 'vab-pro',

  devPort: '9999',

  version: process.env.VUE_APP_VERSION as string,

  copyright: 'DOU douxianfeng@yunqishang.net',

  keepAliveMaxNum: 99,

  routerMode: 'hash',

  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],

  loadingText: '正在加载中...',

  tokenName: 'accessToken',

  tokenTableName: 'accessToken',

  storage: 'localStorage',

  recordRoute: true,

  logo: 'vuejs-fill',

  errorLog: ['development', 'production'],

  loginInterception: true,

  loginRSA: false,

  authentication: 'intelligence',

  rolesControl: true,

  uniqueOpened: false,

  defaultOpeneds: ['/vab'],

  debounce: ['doEdit'],

  providePlugin: {},

  build7z: false,

  templateFolder: 'project',

  donation: false,

  openFirstMenu: true,
};

export interface SettingConfig {

  /** 标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题） */
  title: string;

  /** 标题分隔符 */
  titleSeparator: string;

  /** 标题是否反转 如果为false:"page - title"，如果为ture:"title - page" */
  titleReverse: boolean;

  /** 简写 */
  abbreviation: string;

  /** 开发环境端口号 */
  devPort: string;

  /** 版本号 */
  version: string;

  /** pro版本copyright可随意修改 */
  copyright: string;

  /** 缓存路由的最大数量 */
  keepAliveMaxNum: number;

  /** 路由模式，可选值为 history 或 hash */
  routerMode: string;

  /** 不经过token校验的路由 */
  routesWhiteList: string[];

  /** 加载时显示文字 */
  loadingText: string;

  /** token名称 */
  tokenName: string;

  /** token在localStorage、sessionStorage、cookie存储的key的名称 */
  tokenTableName: string;

  /** token存储位置localStorage sessionStorage cookie */
  storage: string;

  /** token失效回退到登录页时是否记录本次的路由 */
  recordRoute: boolean;

  /** 是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon */
  logo: string;

  /** 在哪些环境下显示高亮错误 */
  errorLog: string[];

  /** 是否开启登录拦截 */
  loginInterception: boolean;

  /** 是否开启登录RSA加密 */
  loginRSA: boolean;

  /** intelligence（前端导出路由）和all（后端导出路由）两种方式 */
  authentication: string;

  /** 是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段） */
  rolesControl: boolean;

  /** vertical gallery comprehensive common布局时是否只保持一个子菜单的展开 */
  uniqueOpened: boolean;

  /** vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个 */
  defaultOpeneds: string[];

  /** 需要加loading层的请求，防止重复提交 */
  debounce: string[];

  /** 需要自动注入并加载的模块 */
  providePlugin: SafeAny;

  /** npm run build时是否自动生成7z压缩包 */
  build7z: boolean;

  /** 代码生成机生成在view下的文件夹名称 */
  templateFolder: string;

  /** 是否显示终端donation打印 */
  donation: boolean;

  /** 画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单 */
  openFirstMenu: boolean;
}
