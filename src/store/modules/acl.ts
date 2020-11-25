import { Module } from 'vuex';
import { SafeAny } from '/@/utils/type';

export type Roles = SafeAny[];
export type Abilities = SafeAny[];

export interface AclState {
  admin: boolean;
  role: Roles;
  ability: Abilities;
}

const state: AclState = {
  admin: false,
  role: [],
  ability: [],
};

export const ACL: Module<AclState, any> = {
  namespaced: true,
  state: () => state,
  getters: {
    admin: (state: AclState): boolean => state.admin,
    role: (state: AclState): Roles => state.role,
    ability: (state: AclState): Abilities => state.ability,
  },
  mutations: {
    setFull(state: AclState, admin: boolean): void {
      state.admin = admin;
    },
    setRole(state: AclState, role: Roles): void {
      state.role = role;
    },
    setAbility(state: AclState, ability: Abilities): void {
      state.ability = ability;
    },
  },
  actions: {
    setFull({ commit }, admin: boolean): void {
      commit('setFull', admin);
    },
    setRole({ commit }, role: Roles): void {
      commit('setRole', role);
    },
    setAbility({ commit }, ability: Abilities): void {
      commit('setAbility', ability);
    },
  },
};
