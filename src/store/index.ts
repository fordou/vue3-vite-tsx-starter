
import { createStore } from 'vuex';

import { ACL } from './modules/acl';
import { SETTINGS } from './modules/settings';
import { TAGS_BAR } from './modules/tags-bar';
import { USER } from './modules/user';
import { ROUTES } from './modules/routes';


export const STORE = createStore({
  mutations: {},
  actions: {},
  modules:{
    ACL,
    SETTINGS,
    ROUTES,
    TAGS_BAR,
    USER,
  },
});
