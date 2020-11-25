import { asyncRoutes, constantRoutes } from '/@/router';
import { getRouterList } from '/@/api/router';
import { convertRouter, filterRoutes } from '/@/utils/routes';
import { Module } from 'vuex';
import { SafeAny } from '/@/utils/type';

export interface RoutesState {
  routes: SafeAny[],
  partialRoutes: SafeAny[]
}

const state: RoutesState = { routes: [], partialRoutes: [] };

export const ROUTES: Module<RoutesState, any> = {
  namespaced: true,
  state,
  getters: {
    routes: (state) => state.routes,
    partialRoutes: (state) => state.partialRoutes,
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = routes;
    },
    setPartialRoutes(state, routes) {
      state.partialRoutes = routes;
    },
  },
  actions: {
    /**
     * @author DOU
     * @description intelligence模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setRoutes({ commit }) {
      const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes]);
      commit('setRoutes', finallyRoutes);
      return [...asyncRoutes];
    },
    /**
     * @author DOU
     * @description all模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setAllRoutes({ commit }) {
      let { data } = await getRouterList();
      if (data[data.length - 1].path !== '*')
        data.push({ path: '*', redirect: '/404', hidden: true });
      const asyncRoutes = convertRouter(data);
      const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes]);
      commit('setRoutes', finallyRoutes);
      return [...asyncRoutes];
    },
    /**
     * @author DOU
     * @description 画廊布局、综合布局设置路由
     * @param {*} { commit }
     * @param accessedRoutes 画廊布局、综合布局设置路由
     */
    setPartialRoutes({ commit }, accessedRoutes) {
      commit('setPartialRoutes', accessedRoutes);
    },
  },
};
