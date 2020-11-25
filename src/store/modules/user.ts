/**
 * @author DOU
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import { getUserInfo, login, logout } from '/@/api/user';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '/@/utils/access-token';
import { CONFIG } from '/@/config';
import { message, notification } from 'ant-design-vue';
import { Module } from 'vuex';
import { SafeAny } from '/@/utils/type';
import { asyncCatch } from '/@/utils/async-catch';

const { title, tokenName } = CONFIG;

export interface UserState {
  accessToken: SafeAny
  username: string
  avatar: string
}

const state: UserState = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
};

export const USER: Module<UserState, any> = {
  namespaced: true,
  state,
  getters: {
    accessToken: (state) => state.accessToken,
    username: (state) => state.username,
    avatar: (state) => state.avatar,
  },
  mutations: {
    /**
     * @author DOU
     * @description 设置accessToken
     * @param {*} state
     * @param {*} accessToken
     */
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
      setAccessToken(accessToken);
    },
    /**
     * @author DOU
     * @description 设置用户名
     * @param {*} state
     * @param {*} username
     */
    setUsername(state, username) {
      state.username = username;
    },
    /**
     * @author DOU
     * @description 设置头像
     * @param {*} state
     * @param {*} avatar
     */
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
  },
  actions: {
    /**
     * @author DOU
     * @description 登录拦截放行时，设置虚拟角色
     * @param {*} { commit, dispatch }
     */
    setVirtualRoles({ commit, dispatch }) {
      dispatch('ACL/setFull', true, { root: true });
      commit('setAvatar',
        'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif');
      commit('setUsername', 'admin(未开启登录拦截)');
    },
    /**
     * @author DOU
     * @description 登录
     * @param {*} { commit }
     * @param {*} userInfo
     */
    async login({ commit }, userInfo) {
      const [data] = await asyncCatch(login(userInfo))

      if(!data){
        return
      }
      const accessToken = data[tokenName];
      if (accessToken) {
        commit('setAccessToken', accessToken);
        const hour = new Date().getHours();
        const thisTime =
          hour < 8
            ? '早上好'
            : hour <= 11
            ? '上午好'
            : hour <= 13
              ? '中午好'
              : hour < 18
                ? '下午好'
                : '晚上好';
        notification.open({
          message: `欢迎登录${title}`,
          description: `${thisTime}！`,
        });
      } else {
        message.error(`登录接口异常，未正确返回${tokenName}...`);
      }
    },
    /**
     * @author DOU
     * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
     * @param {*} { commit, dispatch, state }
     * @returns
     */
    async getUserInfo({ commit, dispatch }): Promise<void> {
      const [data] = await asyncCatch(getUserInfo())
      if (!data) {
        message.error(`验证失败，请重新登录...`);
        return;
      }
      let { username, avatar, roles, ability } = data;
      if (username && roles && Array.isArray(roles)) {
        dispatch('ACL/setRole', roles, { root: true });
        if (ability && ability.length > 0)
          dispatch('ACL/setAbility', ability, { root: true });
        commit('setUsername', username);
        commit('setAvatar', avatar);
      } else {
        message.error('用户信息接口异常');
      }
    },

    /**
     * @author DOU
     * @description 退出登录
     * @param {*} { dispatch }
     */
    async logout({ dispatch }) {
      await logout(state.accessToken);
      await dispatch('resetAll');
    },
    /**
     * @author DOU
     * @description 重置accessToken、roles、ability、router等
     * @param {*} { commit, dispatch }
     */
    async resetAll({ dispatch }) {
      await dispatch('setAccessToken', '');
      await dispatch('ACL/setFull', false, { root: true });
      await dispatch('ACL/setRole', [], { root: true });
      await dispatch('ACL/setAbility', [], { root: true });
      removeAccessToken();
    },
    /**
     * @author DOU
     * @description 设置token
     */
    setAccessToken({ commit }, accessToken) {
      commit('setAccessToken', accessToken);
    },
  },
};
