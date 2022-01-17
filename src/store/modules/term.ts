import { ACTIONS, MUTATIONS } from '@/resources';
import { RootState, TermState, Term } from '@/interfaces';
import { MutationTree, ActionTree, Module, GetterTree } from 'vuex';

const state: TermState = {
  terms: [],
  lastUsedId: 0
};

const getters: GetterTree<TermState, RootState> = {
  allTerms: (state: TermState) => state.terms
};

const actions: ActionTree<TermState, RootState> = {
  [ACTIONS.CREATE_NEW_TERM]: ({ commit }, term: string) => {
    commit(MUTATIONS.ADD_TERM, { term, count: 0, overUnder: 0 });
  },
  [ACTIONS.DELETE_TERM]: ({ commit }, id) => {
    commit(MUTATIONS.DELETE_TERM, id);
  },
  [ACTIONS.INCREMENT]: ({ commit, state }, id) => {
    const term = { ...state.terms.find(t => t.id === id) } as Term;
    term.count++;
    commit(MUTATIONS.UPDATE_TERM, term);
  },
  [ACTIONS.DECREMENT]: ({ commit, state }, id) => {
    const term = { ...state.terms.find(t => t.id === id) } as Term;
    term.count--;
    commit(MUTATIONS.UPDATE_TERM, term);
  },
  [ACTIONS.SET_OVER_UNDER]: ({ commit, state }, { id, overUnder }: { id: number; overUnder: number }) => {
    commit(MUTATIONS.UPDATE_TERM, {
      ...state.terms.find(t => t.id === id),
      overUnder
    } as Term);
  }
};

const mutations: MutationTree<TermState> = {
  [MUTATIONS.ADD_TERM]: (state: TermState, term: Term) => {
    state.terms = [...state.terms, { ...term, id: state.lastUsedId + 1 }];
    state.lastUsedId += 1;
  },
  [MUTATIONS.DELETE_TERM]: (state: TermState, id: number) => {
    const index = state.terms.findIndex(t => t.id === id);
    state.terms.splice(index, 1);
  },
  [MUTATIONS.UPDATE_TERM]: (state: TermState, term: Term) => {
    const index = state.terms.findIndex(t => t.id === term.id);
    state.terms[index] = term;
  }
};

export const term: Module<TermState, RootState> = {
  state,
  getters,
  actions,
  mutations
};
