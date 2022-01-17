import { ActionTree, GetterTree, MutationTree, Module } from 'vuex';
import { AuthState, RootState } from '@/interfaces';

const state: AuthState = {};
const getters: GetterTree<AuthState, RootState> = {};
const actions: ActionTree<AuthState, RootState> = {};
const mutations: MutationTree<AuthState> = {};

export const auth: Module<AuthState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
