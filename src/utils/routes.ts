import { router } from '/@/router';
import { CONFIG } from '/@/config';
import { isExternal } from '/@/utils/validate';
import { hasRole } from '/@/utils/has-role';
import { RouteRecordRaw } from 'vue-router';
import { SafeAny } from '/@/utils/type';
import path from 'path';

const { rolesControl } = CONFIG;

export type ConstantRoute =
  Partial<RouteRecordRaw>
  & { hidden?: boolean, alwaysShow?: boolean, component?: SafeAny, children?: ConstantRoute[], fullPath?: SafeAny }

/**
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function convertRouter(constantRoutes: ConstantRoute[]): ConstantRoute[] {
  return constantRoutes.map((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        const path = 'layouts';
        route.component = (r: SafeAny) => import(`/@/${path}`).then(
          t => r(t.default),
        );
      } else {
        let path = 'views/' + route.component;
        if (
          new RegExp('^/views/.*$').test(route.component) ||
          new RegExp('^views/.*$').test(route.component)
        ) {
          path = route.component;
        } else if (new RegExp('^/.*$').test(route.component)) {
          path = 'views' + route.component;
        } else if (new RegExp('^@views/.*$').test(route.component)) {
          path = route.component.slice(1);
        } else {
          path = 'views/' + route.component;
        }
        route.component = (resolve: SafeAny) => import(`@/${path}`).then(
          t => resolve(t.default),
        );
      }
    }
    if (route.children && route.children.length) { // @ts-ignore
      route.children = convertRouter(route.children);
    }

    if (route.children && route.children.length === 0) delete route.children;

    return route;
  });
}

/**
 * @author DOU
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes(routes: any[], baseUrl = '/') {
  return routes
    .filter((route) => {
      if (route.meta && route.meta.roles)
        return !rolesControl || hasRole(route.meta.roles);
      else return true;
    })
    .map((route) => {
      if (route.path !== '*' && !isExternal(route.path))
        route.path = path.resolve(baseUrl, route.path);
      route.fullPath = route.path;
      if (route.children)
        route.children = filterRoutes(route.children, route.fullPath);
      return route;
    });
}

/**
 * 根据当前页面firstMenu
 * @returns {string}
 */
export function handleFirstMenu() {
  // @ts-ignore
  const firstMenu = router.currentRoute.matched[0].path;
  if (firstMenu === '') return '/';
  return firstMenu;
}
