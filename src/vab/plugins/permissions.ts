/**
 * @author DOU
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import { router } from '/@/router';
import { store } from '/@/store';
import { getPageTitle } from '/@/utils/page-title';
import { CONFIG } from '/@/config';
import { RouteRecordRaw } from 'vue-router';

const { authentication, loginInterception, recordRoute, routesWhiteList } = CONFIG;

router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters['USER/accessToken'];

  if (!loginInterception) {
    hasToken = true;
  }

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const hasRoles =
        store.getters['ACL/admin'] ||
        store.getters['ACL/role']?.length > 0 ||
        store.getters['ACL/ability']?.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          if (loginInterception) {
            await store.dispatch('USER/getUserInfo');
          } else {
            //loginInterception为false（关闭登录拦截时）时，创建虚拟角色
            await store.dispatch('USER/setVirtualRoles');
          }

          let accessRoutes: RouteRecordRaw[] = [];
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('ROUTES/setRoutes');
          } else if (authentication === 'all') {
            accessRoutes = await store.dispatch('ROUTES/setAllRoutes');
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item);
          });

          next({ ...to, replace: true });
        } catch {
          await store.dispatch('USER/resetAll');
          if (recordRoute)
            next({
              path: '/login',
              query: { redirect: to.path },
              replace: true,
            });
          else {
            next({ path: '/login', replace: true });
          }
        }
      }
    }
  } else {
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute)
        next({ path: '/login', query: { redirect: to.path }, replace: true });
      else next({ path: '/login', replace: true });
    }
  }
});

router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title);
});
