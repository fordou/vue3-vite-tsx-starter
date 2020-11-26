import { createRouter, createWebHashHistory } from 'vue-router';
import { JuLayout } from '/@/layout/index.tsx';
import { ConstantRoute } from '/@/utils/routes';

export const asyncRoutes: ConstantRoute[] = [
  {
    path: '/',
    component: JuLayout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-4-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('/@/views/index/index.tsx'),
        meta: {
          title: '首页',
          icon: 'home-4-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/vab',
    component: JuLayout,
    redirect: '/vab/table',
    alwaysShow: true,
    meta: {
      title: '组件',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('/@/views/vab/table/index.tsx'),
        meta: {
          title: '表格',
          icon: 'table-2',
        },
      },
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('/@/views/vab/icon/index.tsx'),
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
      },
    ],
  },
  {
    path: '/test',
    component: JuLayout,
    redirect: '/test/test',
    meta: {
      title: '动态路由测试',
      icon: 'test-tube-line',
    },
    children: [
      {
        path: 'test',
        name: 'Test',
        component: () => import('/@/views/test/index.tsx'),
        meta: {
          title: '动态路由测试',
          icon: 'test-tube-line',
        },
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: JuLayout,
    redirect: '/error/403',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('/@/views/403.tsx'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('/@/views/404.tsx'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
  {
    path: '/*',
    redirect: '/404',
    hidden: true,
  },
];
export const constantRoutes: ConstantRoute[] = [
  {
    path: '/login',
    component: () => import('/@/views/login'),
    hidden: true,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  // @ts-ignore
  routes: [...asyncRoutes, ...constantRoutes],
});
