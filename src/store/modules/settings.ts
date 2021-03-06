/**
 * @author DOU
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */
import { CONFIG as defaultSettings } from '/@/config';
import { isJson } from '/@/utils/validate';
import { SafeAny } from '/@/utils/type';
import { Module } from 'vuex';

const {
  logo,
  title,
  layout,
  header,
  themeName,
  showLanguage,
  showProgressBar,
  showRefresh,
  showSearch,
  showTheme,
  showTagsBar,
  showNotice,
  showFullScreen,
} = defaultSettings;

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value && isJson(value)) {
    return JSON.parse(value);
  } else {
    return false;
  }
};

const theme = getLocalStorage('vue-admin-beautiful-pro-theme');
const { collapse } = getLocalStorage('vue-admin-beautiful-pro-collapse');

export interface SettingsState {
  logo: string,
  title: string,
  collapse: boolean,
  themeName: string
  layout: string
  header: SafeAny
  device: string
  showLanguage: boolean,
  showProgressBar: boolean,
  showRefresh: boolean,
  showSearch: boolean,
  showTheme: boolean,
  showTagsBar: boolean,
  showNotice: boolean,
  showFullScreen: boolean,
}

const state: SettingsState = {
  logo,
  title,
  collapse,
  themeName: theme.themeName || themeName,
  layout: theme.layout || layout,
  header: theme.header || header,
  device: 'desktop',
  showLanguage,
  showProgressBar,
  showRefresh,
  showSearch,
  showTheme,
  showTagsBar,
  showNotice,
  showFullScreen,
};
export const SETTINGS: Module<SettingsState, any> = {
  namespaced: true,
  state,
  getters: {
    collapse: (state) => state.collapse,
    device: (state) => state.device,
    header: (state) => state.header,
    layout: (state) => state.layout,
    logo: (state) => state.logo,
    title: (state) => state.title,
    showLanguage: (state) => state.showLanguage,
    showProgressBar: (state) => state.showProgressBar,
    showRefresh: (state) => state.showRefresh,
    showSearch: (state) => state.showSearch,
    showTheme: (state) => state.showTheme,
    showTagsBar: (state) => state.showTagsBar,
    showNotice: (state) => state.showNotice,
    showFullScreen: (state) => state.showFullScreen,
    themeName: (state) => state.themeName,
  },
  mutations: {
    toggleCollapse(state, value:boolean ) {
      console.log('asdfasdf')
      state.collapse = value ?? !state.collapse;
      localStorage.setItem(
        'vue-admin-beautiful-pro-collapse',
        `{"collapse":${state.collapse}}`,
      );
    },
    toggleDevice(state, device) {
      state.device = device;
    },
    changeHeader(state, header) {
      state.header = header;
    },
    changeLayout(state, layout) {
      state.layout = layout;
    },
    handleShowLanguage(state, showLanguage) {
      state.showLanguage = showLanguage;
    },
    handleShowProgressBar(state, showProgressBar) {
      state.showProgressBar = showProgressBar;
    },
    handleShowRefresh(state, showRefresh) {
      state.showRefresh = showRefresh;
    },
    handleShowSearch(state, showSearch) {
      state.showSearch = showSearch;
    },
    handleShowTheme(state, showTheme) {
      state.showTheme = showTheme;
    },
    handleShowTagsBar(state, showTagsBar) {
      state.showTagsBar = showTagsBar;
    },
    handleShowNotice(state, showNotice) {
      state.showNotice = showNotice;
    },
    handleShowFullScreen(state, showFullScreen) {
      state.showFullScreen = showFullScreen;
    },
    openSideBar(state) {
      state.collapse = false;
    },
    foldSideBar(state) {
      state.collapse = true;
    },
  },
  actions: {
    toggleCollapse({ commit }) {
      commit('toggleCollapse');
    },
    toggleDevice({ commit }, device) {
      commit('toggleDevice', device);
    },
    changeHeader({ commit }, header) {
      commit('changeHeader', header);
    },
    changeLayout({ commit }, layout) {
      commit('changeLayout', layout);
    },
    handleShowLanguage: ({ commit }, showLanguage) => {
      commit('handleShowLanguage', showLanguage);
    },
    handleShowProgressBar: ({ commit }, showProgressBar) => {
      commit('handleShowProgressBar', showProgressBar);
    },
    handleShowRefresh: ({ commit }, showRefresh) => {
      commit('handleShowRefresh', showRefresh);
    },
    handleShowSearch: ({ commit }, showSearch) => {
      commit('handleShowSearch', showSearch);
    },
    handleShowTheme: ({ commit }, showTheme) => {
      commit('handleShowTheme', showTheme);
    },
    handleShowTagsBar({ commit }, showTagsBar) {
      commit('handleShowTagsBar', showTagsBar);
    },
    handleShowNotice: ({ commit }, showNotice) => {
      commit('handleShowNotice', showNotice);
    },
    handleShowFullScreen: ({ commit }, showFullScreen) => {
      commit('handleShowFullScreen', showFullScreen);
    },
    openSideBar({ commit }) {
      commit('openSideBar');
    },
    foldSideBar({ commit }) {
      commit('foldSideBar');
    },
  },
};
